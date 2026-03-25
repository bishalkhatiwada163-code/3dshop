const mongoose = require('mongoose');

const motorcycleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  modelUrl: {
    type: String,
    required: false,
    default: '/models/default-bike.glb'
  },
  image: {
    type: String,
    required: false,
    default: '/images/default-bike.jpg'
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  specifications: {
    engineSize: String,
    power: String,
    torque: String,
    weight: String,
    fuelCapacity: String,
    maxSpeed: String
  },
  category: {
    type: String,
    enum: ['sport', 'cruiser', 'touring', 'offroad', 'adventure'],
    default: 'sport'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Motorcycle', motorcycleSchema);
