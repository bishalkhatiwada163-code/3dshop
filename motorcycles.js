const express = require('express');
const router = express.Router();
const {
  getAllMotorcycles,
  getMotorcycleById,
  createMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
  getStats
} = require('./motorcycleController');

// Public routes
router.get('/', getAllMotorcycles);
router.get('/stats', getStats);
router.get('/:id', getMotorcycleById);

// Admin routes (in production, add authentication middleware)
router.post('/', createMotorcycle);
router.put('/:id', updateMotorcycle);
router.delete('/:id', deleteMotorcycle);

module.exports = router;
