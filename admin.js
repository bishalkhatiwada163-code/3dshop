// ================================================
// ADMIN PANEL
// ================================================

let motorcycles = [];

// Load motorcycles
async function loadMotorcyclesAdmin() {
  try {
    motorcycles = await apiCall('/motorcycles');
    displayMotorcyclesTable();
    updateStats();
  } catch (error) {
    console.error('Failed to load motorcycles:', error);
  }
}

// Display motorcycles table
function displayMotorcyclesTable() {
  const tbody = document.getElementById('motorcyclesTableBody');
  if (!tbody) return;

  tbody.innerHTML = motorcycles.map(bike => `
    <tr>
      <td>${bike.name}</td>
      <td>${bike.brand}</td>
      <td>${formatCurrency(bike.price)}</td>
      <td>${bike.category}</td>
      <td>
        <span class="status-badge ${bike.inStock ? 'in-stock' : 'out-of-stock'}">
          ${bike.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </td>
      <td>
        <div class="action-btns">
          <button class="edit-btn" onclick="editMotorcycle('${bike._id}')">Edit</button>
          <button class="delete-btn" onclick="deleteMotorcycle('${bike._id}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Update statistics
async function updateStats() {
  try {
    const stats = await apiCall('/motorcycles/stats');
    
    const totalEl = document.getElementById('totalMotorcycles');
    const avgEl = document.getElementById('avgPrice');
    const inStockEl = document.getElementById('inStockCount');

    if (totalEl) totalEl.textContent = stats.totalMotorcycles || 0;
    if (avgEl) avgEl.textContent = formatCurrency(stats.avgPrice || 0);
    
    const inStock = motorcycles.filter(m => m.inStock).length;
    if (inStockEl) inStockEl.textContent = inStock;

    // Update category breakdown
    displayCategoryBreakdown(stats.byCategory);
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// Display category breakdown
function displayCategoryBreakdown(data) {
  const container = document.getElementById('categoryBreakdown');
  if (!container) return;

  container.innerHTML = data.map(item => `
    <div style="margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span>${item._id || 'N/A'}</span>
        <strong>${item.count}</strong>
      </div>
      <div style="width: 100%; height: 20px; background: var(--dark-bg-3); border-radius: 10px; overflow: hidden;">
        <div style="
          width: ${(item.count / Math.max(...data.map(d => d.count))) * 100}%;
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        "></div>
      </div>
    </div>
  `).join('');
}

// Setup form
function setupAdminForm() {
  const form = document.getElementById('motorcycleForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      brand: formData.get('brand'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      description: formData.get('description'),
      modelUrl: formData.get('modelUrl'),
      image: formData.get('image'),
      inStock: formData.get('inStock') === 'true',
      specifications: {
        engineSize: formData.get('engineSize'),
        power: formData.get('power'),
        torque: formData.get('torque'),
        weight: formData.get('weight'),
        maxSpeed: formData.get('maxSpeed')
      }
    };

    try {
      await apiCall('/motorcycles', 'POST', data);
      showToast('Motorcycle added successfully!', 'success');
      form.reset();
      loadMotorcyclesAdmin();
    } catch (error) {
      console.error('Failed to add motorcycle:', error);
    }
  });
}

// Edit motorcycle
async function editMotorcycle(id) {
  const bike = motorcycles.find(m => m._id === id);
  if (!bike) return;

  const form = document.getElementById('motorcycleForm');
  if (!form) return;

  // Populate form
  form.name.value = bike.name;
  form.brand.value = bike.brand;
  form.price.value = bike.price;
  form.category.value = bike.category;
  form.description.value = bike.description;
  form.modelUrl.value = bike.modelUrl;
  form.image.value = bike.image;
  form.inStock.value = bike.inStock ? 'true' : 'false';
  if (bike.specifications) {
    form.engineSize.value = bike.specifications.engineSize || '';
    form.power.value = bike.specifications.power || '';
    form.torque.value = bike.specifications.torque || '';
    form.weight.value = bike.specifications.weight || '';
    form.maxSpeed.value = bike.specifications.maxSpeed || '';
  }

  // Change button text
  const btn = form.querySelector('.submit-btn');
  btn.textContent = 'Update Motorcycle';

  // Update submit handler
  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  newForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(newForm);
    const data = {
      name: formData.get('name'),
      brand: formData.get('brand'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      description: formData.get('description'),
      modelUrl: formData.get('modelUrl'),
      image: formData.get('image'),
      inStock: formData.get('inStock') === 'true',
      specifications: {
        engineSize: formData.get('engineSize'),
        power: formData.get('power'),
        torque: formData.get('torque'),
        weight: formData.get('weight'),
        maxSpeed: formData.get('maxSpeed')
      }
    };

    try {
      await apiCall(`/motorcycles/${id}`, 'PUT', data);
      showToast('Motorcycle updated successfully!', 'success');
      newForm.reset();
      newForm.querySelector('.submit-btn').textContent = 'Add Motorcycle';
      loadMotorcyclesAdmin();
    } catch (error) {
      console.error('Failed to update motorcycle:', error);
    }
  });

  // Scroll to form
  newForm.scrollIntoView({ behavior: 'smooth' });
}

// Delete motorcycle
async function deleteMotorcycle(id) {
  if (!confirm('Are you sure you want to delete this motorcycle?')) return;

  try {
    await apiCall(`/motorcycles/${id}`, 'DELETE');
    showToast('Motorcycle deleted successfully!', 'success');
    loadMotorcyclesAdmin();
  } catch (error) {
    console.error('Failed to delete motorcycle:', error);
  }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
  loadMotorcyclesAdmin();
  setupAdminForm();
});
