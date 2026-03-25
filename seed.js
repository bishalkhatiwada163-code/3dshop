// ================================================
// DATABASE SEED DATA
// ================================================
// Run this file to populate your database with sample motorcycles
// Command: node seed.js

const mongoose = require('mongoose');
const Motorcycle = require('./MotorcycleModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/moto-showroom';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Motorcycle.deleteMany({});
    console.log('✓ Cleared existing motorcycles');

    const motorcycles = [
      {
        name: "Ducati Panigale V4",
        brand: "Ducati",
        price: 15999,
        category: "sport",
        description: "The most powerful and technologically advanced Ducati superbike ever built. Features carbon fiber bodywork and advanced electronics.",
        image: "/images/ducati-panigale.jpg",
        modelUrl: "/models/ducati.glb",
        specifications: {
          engineSize: "1103cc",
          power: "215 HP",
          torque: "124 Nm",
          weight: "195 kg",
          fuelCapacity: "15L",
          maxSpeed: "300 km/h"
        },
        inStock: true,
        rating: 5
      },
      {
        name: "Harley-Davidson Street 750",
        brand: "Harley-Davidson",
        price: 7495,
        category: "cruiser",
        description: "Classic American cruiser with urban attitude. Perfect for city riding and weekend cruises.",
        image: "/images/harley-street.jpg",
        modelUrl: "/models/harley.glb",
        specifications: {
          engineSize: "750cc",
          power: "54 HP",
          torque: "59 Nm",
          weight: "221 kg",
          fuelCapacity: "13.1L",
          maxSpeed: "180 km/h"
        },
        inStock: true,
        rating: 4
      },
      {
        name: "BMW R 1250 GS",
        brand: "BMW",
        price: 17499,
        category: "adventure",
        description: "The ultimate adventure motorcycle. Built for long distances and off-road capabilities.",
        image: "/images/bmw-gs.jpg",
        modelUrl: "/models/bmw.glb",
        specifications: {
          engineSize: "1254cc",
          power: "136 HP",
          torque: "143 Nm",
          weight: "258 kg",
          fuelCapacity: "20L",
          maxSpeed: "200 km/h"
        },
        inStock: true,
        rating: 5
      },
      {
        name: "Kawasaki Ninja H2",
        brand: "Kawasaki",
        price: 24300,
        category: "sport",
        description: "A supercharged hyperbike with unmatched acceleration and cutting-edge technology.",
        image: "/images/kawasaki-ninja.jpg",
        modelUrl: "/models/kawasaki.glb",
        specifications: {
          engineSize: "998cc",
          power: "300 HP",
          torque: "165 Nm",
          weight: "238 kg",
          fuelCapacity: "17L",
          maxSpeed: "300+ km/h"
        },
        inStock: true,
        rating: 5
      },
      {
        name: "Honda CB500F",
        brand: "Honda",
        price: 6199,
        category: "sport",
        description: "A middleweight sports bike offering excellent balance of power, handling, and reliability.",
        image: "/images/honda-cb500f.jpg",
        modelUrl: "/models/honda.glb",
        specifications: {
          engineSize: "471cc",
          power: "67 HP",
          torque: "61 Nm",
          weight: "189 kg",
          fuelCapacity: "15L",
          maxSpeed: "210 km/h"
        },
        inStock: true,
        rating: 4
      },
      {
        name: "Yamaha MT-07",
        brand: "Yamaha",
        price: 7399,
        category: "cruiser",
        description: "A versatile middle-weight motorcycle combining style, performance, and accessibility.",
        image: "/images/yamaha-mt07.jpg",
        modelUrl: "/models/yamaha.glb",
        specifications: {
          engineSize: "689cc",
          power: "75 HP",
          torque: "68 Nm",
          weight: "182 kg",
          fuelCapacity: "14L",
          maxSpeed: "220 km/h"
        },
        inStock: true,
        rating: 4
      },
      {
        name: "KTM 500 EXC-F",
        brand: "KTM",
        price: 6895,
        category: "offroad",
        description: "A powerful off-road bike designed for serious trail riding and adventure.",
        image: "/images/ktm-500.jpg",
        modelUrl: "/models/ktm.glb",
        specifications: {
          engineSize: "510cc",
          power: "63 HP",
          torque: "56 Nm",
          weight: "198 kg",
          fuelCapacity: "12L",
          maxSpeed: "190 km/h"
        },
        inStock: true,
        rating: 5
      },
      {
        name: "Royal Enfield Classic 350",
        brand: "Royal Enfield",
        price: 4199,
        category: "cruiser",
        description: "A retro-styled cruiser offering timeless design with modern features and affordability.",
        image: "/images/enfield-classic.jpg",
        modelUrl: "/models/enfield.glb",
        specifications: {
          engineSize: "349cc",
          power: "20 HP",
          torque: "28 Nm",
          weight: "202 kg",
          fuelCapacity: "13L",
          maxSpeed: "140 km/h"
        },
        inStock: true,
        rating: 4
      },
      {
        name: "Suzuki GSX-S1000",
        brand: "Suzuki",
        price: 9499,
        category: "sport",
        description: "A powerful naked bike combining aggressive styling with comfortable daily riding.",
        image: "/images/suzuki-gsx.jpg",
        modelUrl: "/models/suzuki.glb",
        specifications: {
          engineSize: "999cc",
          power: "150 HP",
          torque: "107 Nm",
          weight: "203 kg",
          fuelCapacity: "19L",
          maxSpeed: "250 km/h"
        },
        inStock: true,
        rating: 4
      },
      {
        name: "Triumph Tiger 1200",
        brand: "Triumph",
        price: 15900,
        category: "touring",
        description: "A premium adventure tourer designed for world-spanning journeys and extreme conditions.",
        image: "/images/triumph-tiger.jpg",
        modelUrl: "/models/triumph.glb",
        specifications: {
          engineSize: "1160cc",
          power: "141 HP",
          torque: "130 Nm",
          weight: "259 kg",
          fuelCapacity: "20L",
          maxSpeed: "220 km/h"
        },
        inStock: false,
        rating: 5
      }
    ];

    const inserted = await Motorcycle.insertMany(motorcycles);
    console.log(`✓ Inserted ${inserted.length} motorcycles`);

    // Display statistics
    const stats = await Motorcycle.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
          avgPrice: [{ $group: { _id: null, avg: { $avg: "$price" } } }],
          byCategory: [{ $group: { _id: "$category", count: { $sum: 1 } } }]
        }
      }
    ]);

    console.log('\n📊 Statistics:');
    console.log(`Total Motorcycles: ${stats[0].total[0]?.count}`);
    console.log(`Average Price: $${stats[0].avgPrice[0]?.avg.toFixed(2)}`);
    console.log('\nBy Category:');
    stats[0].byCategory.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count}`);
    });

    await mongoose.connection.close();
    console.log('\n✓ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
