// ================================================
// PRODUCTS PAGE
// ================================================

let currentFilters = {
  search: '',
  category: '',
  minPrice: 0,
  maxPrice: Infinity,
  sortBy: 'newest'
};

// Load products
async function loadProducts() {
  try {
    showLoader(true);
    const params = new URLSearchParams();
    if (currentFilters.search) params.append('search', currentFilters.search);
    if (currentFilters.category) params.append('category', currentFilters.category);
    if (currentFilters.minPrice > 0) params.append('minPrice', currentFilters.minPrice);
    if (currentFilters.maxPrice !== Infinity) params.append('maxPrice', currentFilters.maxPrice);
    params.append('sortBy', currentFilters.sortBy);

    const products = await apiCall(`/motorcycles?${params.toString()}`);
    displayProducts(products);
    showLoader(false);
  } catch (error) {
    console.error('Failed to load products:', error);
    showLoader(false);
  }
}

// Display products grid
function displayProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--light-text-secondary);">No motorcycles found</p>';
    return;
  }

  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-image">🏍️</div>
      <div class="product-body">
        <p class="product-brand">${product.brand}</p>
        <h3 class="product-name">${product.name}</h3>
        <span class="product-category">${product.category}</span>
        <p class="product-description">${product.description}</p>
        ${product.specifications ? `
          <div class="product-specs">
            ${product.specifications.power ? `<div>⚡ ${product.specifications.power}</div>` : ''}
            ${product.specifications.weight ? `<div>⚖️ ${product.specifications.weight}</div>` : ''}
          </div>
        ` : ''}
        <div class="product-footer">
          <div>
            <div class="product-price">${formatCurrency(product.price)}</div>
            <div class="product-in-stock ${product.inStock ? '' : 'product-out-of-stock'}">
              ${product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </div>
          </div>
          <button class="product-btn" onclick="cart.addItem('${product._id}', 1)" ${!product.inStock ? 'disabled' : ''}>
            ${product.inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Setup filters
function setupFilters() {
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const sortSelect = document.getElementById('sortSelect');
  const applyBtn = document.getElementById('applyFilters');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilters.search = e.target.value;
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      currentFilters.category = e.target.value;
    });

    // Check URL params
    const params = new URLSearchParams(window.location.search);
    if (params.has('category')) {
      const category = params.get('category');
      categorySelect.value = category;
      currentFilters.category = category;
    }
  }

  if (minPriceInput) {
    minPriceInput.addEventListener('input', (e) => {
      currentFilters.minPrice = e.target.value ? Number(e.target.value) : 0;
    });
  }

  if (maxPriceInput) {
    maxPriceInput.addEventListener('input', (e) => {
      currentFilters.maxPrice = e.target.value ? Number(e.target.value) : Infinity;
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilters.sortBy = e.target.value;
      loadProducts();
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', loadProducts);
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  setupFilters();
  loadProducts();
});
