// ================================================
// MAIN APP LOGIC
// ================================================

// Support environment variables for API URL
// For Vercel deployment, set REACT_APP_API_URL environment variable
const API_BASE = (() => {
  if (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__.REACT_APP_API_URL) {
    return window.__ENV__.REACT_APP_API_URL;
  }

  // Guard against plain browser runtime where `process` is not defined.
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  return 'http://localhost:5000/api';
})();

const SESSION_ID = 'session_' + Date.now();

const FEATURED_FALLBACK = [
  { name: 'Ducati Panigale V4', brand: 'Ducati', category: 'sport', price: 15999 },
  { name: 'BMW R 1250 GS', brand: 'BMW', category: 'adventure', price: 17499 },
  { name: 'Yamaha MT-07', brand: 'Yamaha', category: 'cruiser', price: 7399 },
  { name: 'Triumph Tiger 1200', brand: 'Triumph', category: 'touring', price: 15900 }
];

const INSIGHT_DATA = [
  { value: '87%', label: 'Bikes in Stock This Week', note: 'Updated across premium and mid-range categories.' },
  { value: '2.4s', label: 'Average Product Load Time', note: 'Fast browsing for mobile and desktop riders.' },
  { value: '94%', label: 'Orders Delivered On Time', note: 'Reliable dispatch and tracked delivery support.' },
  { value: '4.8/5', label: 'Rider Satisfaction Score', note: 'Based on verified post-purchase feedback.' }
];

const REVIEW_DATA = [
  {
    name: 'Aarav K.',
    stars: '★★★★★',
    text: 'The 3D preview helped me compare posture and style before buying. Delivery was smooth and exactly on time.',
    bike: 'Purchased: Ducati Panigale V4'
  },
  {
    name: 'Meera S.',
    stars: '★★★★★',
    text: 'Filtering by category and price was super clear. I finalized my touring bike in one evening.',
    bike: 'Purchased: Triumph Tiger 1200'
  },
  {
    name: 'Rohan D.',
    stars: '★★★★☆',
    text: 'Great showroom UI and fast support response. I would like more color options, but overall excellent.',
    bike: 'Purchased: Yamaha MT-07'
  }
];

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Show loading spinner
function showLoader(show = true) {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    if (show) spinner.classList.add('show');
    else spinner.classList.remove('show');
  }
}

// Toast notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// API calls
async function apiCall(endpoint, method = 'GET', data = null) {
  try {
    showLoader(true);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'API Error');
    }

    showLoader(false);
    return result;
  } catch (error) {
    showLoader(false);
    showToast(error.message, 'error');
    throw error;
  }
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// ================================================
// CART MANAGEMENT
// ================================================

class CartManager {
  constructor() {
    this.items = [];
    this.loadCart();
  }

  async loadCart() {
    try {
      const cart = await apiCall(`/cart?sessionId=${SESSION_ID}`);
      this.items = cart.items || [];
      this.updateCartUI();
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  }

  async addItem(productId, quantity = 1) {
    try {
      const cart = await apiCall('/cart', 'POST', {
        sessionId: SESSION_ID,
        productId,
        quantity
      });
      this.items = cart.items || [];
      this.updateCartUI();
      showToast(`Added to cart!`, 'success');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  }

  async removeItem(productId) {
    try {
      const cart = await apiCall(
        `/cart/${productId}?sessionId=${SESSION_ID}`,
        'DELETE'
      );
      this.items = cart.items || [];
      this.updateCartUI();
      showToast('Removed from cart', 'success');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  }

  async updateQuantity(productId, quantity) {
    if (quantity < 1) {
      await this.removeItem(productId);
      return;
    }

    try {
      const cart = await apiCall(
        `/cart/${productId}?sessionId=${SESSION_ID}`,
        'PUT',
        { quantity }
      );
      this.items = cart.items || [];
      this.updateCartUI();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  }

  async clearCart() {
    try {
      await apiCall(`/cart?sessionId=${SESSION_ID}`, 'DELETE');
      this.items = [];
      this.updateCartUI();
      showToast('Cart cleared', 'success');
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }

  updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cartCount) {
      cartCount.textContent = this.items.length;
    }

    if (cartItems) {
      if (this.items.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--light-text-secondary);">Your cart is empty</p>';
      } else {
        cartItems.innerHTML = this.items.map(item => {
          const product = item.productId || item;
          const productName = product.name || 'Unknown Product';
          const productPrice = product.price || 0;
          const totalPrice = productPrice * item.quantity;

          return `
            <div class="cart-item">
              <div class="cart-item-info">
                <h4>${productName}</h4>
                <p class="cart-item-price">${formatCurrency(productPrice)}</p>
              </div>
              <div class="cart-item-quantity">
                <button onclick="cart.updateQuantity('${product._id}', ${item.quantity - 1})">−</button>
                <span>${item.quantity}</span>
                <button onclick="cart.updateQuantity('${product._id}', ${item.quantity + 1})">+</button>
              </div>
              <button class="cart-item-remove" onclick="cart.removeItem('${product._id}')">🗑</button>
            </div>
          `;
        }).join('');
      }
    }

    if (cartTotal) {
      const total = this.items.reduce((sum, item) => {
        const product = item.productId || item;
        return sum + (product.price || 0) * item.quantity;
      }, 0);
      cartTotal.textContent = formatCurrency(total);
    }
  }
}

// ================================================
// THEME TOGGLE
// ================================================

class ThemeManager {
  constructor() {
    this.isDark = !localStorage.getItem('light-mode');
    this.init();
  }

  init() {
    if (!this.isDark) {
      document.body.classList.add('light-mode');
    }

    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.remove('light-mode');
      localStorage.removeItem('light-mode');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('light-mode', 'true');
    }
  }
}

// ================================================
// CART SIDEBAR
// ================================================

function setupCartSidebar() {
  const cartBtn = document.getElementById('cartBtn');
  const cartSidebar = document.getElementById('cartSidebar');
  const closeBtn = document.getElementById('closeCart');
  const clearCartBtn = document.getElementById('clearCartBtn');

  if (cartBtn && cartSidebar) {
    cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
  }

  if (closeBtn && cartSidebar) {
    closeBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Clear your cart?')) {
        cart.clearCart();
      }
    });
  }
}

// ================================================
// CATEGORY NAVIGATION
// ================================================

function setupCategoryNavigation() {
  const cards = document.querySelectorAll('.category-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      window.location.href = `products.html?category=${category}`;
    });
  });
}

// ================================================
// CONTACT FORM
// ================================================

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! We will get back to you soon.', 'success');
      form.reset();
    });
  }
}

// ================================================
// HOME FEATURED PRODUCTS
// ================================================

async function loadFeaturedMotorcycles() {
  const featuredGrid = document.getElementById('featuredGrid');
  if (!featuredGrid) return;

  try {
    const motorcycles = await apiCall('/motorcycles?sortBy=rating');
    const featured = (motorcycles && motorcycles.length ? motorcycles : FEATURED_FALLBACK).slice(0, 4);

    if (!featured.length) {
      featuredGrid.innerHTML = '<p style="color: var(--light-text-secondary);">No featured motorcycles available right now.</p>';
      return;
    }

    featuredGrid.innerHTML = featured.map((bike, index) => `
      <article class="featured-card reveal-item" style="--reveal-delay:${index * 100}ms" onclick="window.location.href='products.html?category=${encodeURIComponent(bike.category || '')}'">
        <h3>${bike.name}</h3>
        <p>${bike.brand} • ${bike.category || 'motorcycle'}</p>
        <div class="featured-card-price">${formatCurrency(bike.price || 0)}</div>
        <button class="featured-card-btn" onclick="event.stopPropagation(); window.location.href='products.html?category=${encodeURIComponent(bike.category || '')}'">
          View in Shop
        </button>
      </article>
    `).join('');

    setupRevealAnimations();
  } catch (error) {
    console.error('Failed to load featured motorcycles:', error);

    featuredGrid.innerHTML = FEATURED_FALLBACK.map((bike, index) => `
      <article class="featured-card reveal-item" style="--reveal-delay:${index * 100}ms" onclick="window.location.href='products.html?category=${encodeURIComponent(bike.category || '')}'">
        <h3>${bike.name}</h3>
        <p>${bike.brand} • ${bike.category || 'motorcycle'}</p>
        <div class="featured-card-price">${formatCurrency(bike.price || 0)}</div>
        <button class="featured-card-btn" onclick="event.stopPropagation(); window.location.href='products.html?category=${encodeURIComponent(bike.category || '')}'">
          View in Shop
        </button>
      </article>
    `).join('');

    setupRevealAnimations();
  }
}

function renderInsights() {
  const insightGrid = document.getElementById('insightGrid');
  if (!insightGrid) return;

  insightGrid.innerHTML = INSIGHT_DATA.map((item, index) => `
    <article class="insight-card reveal-item" style="--reveal-delay:${index * 90}ms">
      <p class="insight-value">${item.value}</p>
      <p class="insight-label">${item.label}</p>
      <p class="insight-note">${item.note}</p>
    </article>
  `).join('');
}

function renderReviews() {
  const reviewGrid = document.getElementById('reviewGrid');
  if (!reviewGrid) return;

  reviewGrid.innerHTML = REVIEW_DATA.map((item, index) => `
    <article class="review-card reveal-item" style="--reveal-delay:${index * 110}ms">
      <div class="review-head">
        <p class="review-name">${item.name}</p>
        <p class="review-stars">${item.stars}</p>
      </div>
      <p class="review-text">${item.text}</p>
      <p class="review-bike">${item.bike}</p>
    </article>
  `).join('');

  setupRevealAnimations();
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal-section, .reveal-item');
  if (!revealElements.length) return;

  if (typeof IntersectionObserver === 'undefined') {
    revealElements.forEach((element) => element.classList.add('reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((element, index) => {
    if (!element.style.getPropertyValue('--reveal-delay')) {
      element.style.setProperty('--reveal-delay', `${Math.min(index * 60, 360)}ms`);
    }
    observer.observe(element);
  });
}

function animateCounters() {
  const counters = document.querySelectorAll('.trust-value[data-target]');
  if (!counters.length) return;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const decimals = Number(counter.dataset.decimals || 0);
    const duration = 1200;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      if (decimals > 0) {
        counter.textContent = (value / 10).toFixed(decimals);
      } else {
        counter.textContent = Math.round(value).toString();
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  });
}

function setupRippleEffects() {
  const rippleTargets = document.querySelectorAll(
    '.cta-button, .featured-card-btn, .submit-btn, .product-btn, .apply-filters-btn, .checkout-btn, .clear-cart-btn, .theme-toggle, .cart-btn, .admin-menu-link, .logout-btn'
  );

  rippleTargets.forEach((target) => {
    target.classList.add('ripple-host');
    target.addEventListener('click', (event) => {
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ui-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    });
  });
}

function setupTiltEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.featured-card, .category-card, .feature-card, .trust-card, .product-card, .stat-card');
  cards.forEach((card) => {
    card.classList.add('tilt-card');

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 8;
      const ry = (px - 0.5) * 10;
      card.style.setProperty('--tilt-x', `${rx.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${ry.toFixed(2)}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

function setupHeroParallax() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  if (!hero || !heroContent) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    hero.style.setProperty('--hero-shift-x', `${(nx * 16).toFixed(2)}px`);
    hero.style.setProperty('--hero-shift-y', `${(ny * 12).toFixed(2)}px`);
    heroContent.style.setProperty('--hero-content-x', `${(nx * 8).toFixed(2)}px`);
    heroContent.style.setProperty('--hero-content-y', `${(ny * 6).toFixed(2)}px`);
  });

  hero.addEventListener('mouseleave', () => {
    hero.style.setProperty('--hero-shift-x', '0px');
    hero.style.setProperty('--hero-shift-y', '0px');
    heroContent.style.setProperty('--hero-content-x', '0px');
    heroContent.style.setProperty('--hero-content-y', '0px');
  });
}

// ================================================
// ADMIN MENU NAVIGATION
// ================================================

function setupAdminMenu() {
  const links = document.querySelectorAll('.admin-menu-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.href.includes('http')) return; // External links

      e.preventDefault();
      
      // Remove active class from all
      document.querySelectorAll('.admin-menu-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));

      // Add active to clicked
      link.classList.add('active');
      const sectionId = link.href.split('#')[1];
      const section = document.getElementById(sectionId);
      if (section) section.classList.add('active');
    });
  });
}

// ================================================
// INITIALIZATION
// ================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize managers
  window.cart = new CartManager();
  window.theme = new ThemeManager();

  // Setup UI
  setupCartSidebar();
  setupCategoryNavigation();
  setupContactForm();
  setupAdminMenu();
  setupRevealAnimations();
  animateCounters();
  setupRippleEffects();
  setupTiltEffects();
  setupHeroParallax();
  renderInsights();
  renderReviews();
  loadFeaturedMotorcycles();
});
