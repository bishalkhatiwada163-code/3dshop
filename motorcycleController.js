const Motorcycle = require('./MotorcycleModel');

async function getAllMotorcycles(req, res) {
  try {
    const { search, category, minPrice, maxPrice, sortBy = 'newest' } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sort = { createdAt: -1 };
    if (sortBy === 'price-asc') sort = { price: 1 };
    if (sortBy === 'price-desc') sort = { price: -1 };
    if (sortBy === 'rating') sort = { rating: -1 };

    const motorcycles = await Motorcycle.find(query).sort(sort);
    return res.json(motorcycles);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch motorcycles' });
  }
}

async function getMotorcycleById(req, res) {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ error: 'Motorcycle not found' });
    }
    return res.json(motorcycle);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid motorcycle id' });
  }
}

async function createMotorcycle(req, res) {
  try {
    const motorcycle = await Motorcycle.create(req.body);
    return res.status(201).json(motorcycle);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to create motorcycle', details: error.message });
  }
}

async function updateMotorcycle(req, res) {
  try {
    const motorcycle = await Motorcycle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!motorcycle) {
      return res.status(404).json({ error: 'Motorcycle not found' });
    }

    return res.json(motorcycle);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to update motorcycle', details: error.message });
  }
}

async function deleteMotorcycle(req, res) {
  try {
    const motorcycle = await Motorcycle.findByIdAndDelete(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ error: 'Motorcycle not found' });
    }
    return res.json({ message: 'Motorcycle deleted successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid motorcycle id' });
  }
}

async function getStats(req, res) {
  try {
    const stats = await Motorcycle.aggregate([
      {
        $facet: {
          total: [{ $count: 'count' }],
          avgPrice: [{ $group: { _id: null, avg: { $avg: '$price' } } }],
          byCategory: [{ $group: { _id: '$category', count: { $sum: 1 } } }]
        }
      }
    ]);

    return res.json({
      totalMotorcycles: stats[0].total[0]?.count || 0,
      avgPrice: stats[0].avgPrice[0]?.avg || 0,
      byCategory: stats[0].byCategory || []
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}

module.exports = {
  getAllMotorcycles,
  getMotorcycleById,
  createMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
  getStats
};
