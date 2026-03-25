const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/moto-showroom';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✓ MongoDB Connected'))
  .catch(err => console.log('Database Error:', err));

// Routes
const motorcycleRoutes = require('./motorcycles');
const cartRoutes = require('./cart');

app.use('/api/motorcycles', motorcycleRoutes);
app.use('/api/cart', cartRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server Running' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
