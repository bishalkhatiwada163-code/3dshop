# 🏍️ MotoShowroom - Premium 3D Motorcycle E-Commerce Platform

A modern, production-ready 3D motorcycle e-commerce web application built with MERN stack (MongoDB, Express, React-like vanilla, Node.js) and THREE.js.

## 🌟 Features

### Frontend
- **Modern UI** with glassmorphism design inspired by Tesla and Apple
- **3D Motorcycle Viewer** using THREE.js with OrbitControls
- **Responsive Design** - Mobile, Tablet, Desktop optimized
- **Dark/Light Mode Toggle**
- **Smooth Animations & Transitions**
- **Shopping Cart** with real-time updates
- **Product Filtering** (category, price, search)
- **Product Sorting** (newest, price, rating)
- **Toast Notifications**
- **Loading Spinners**

### Backend API
- **RESTful API** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** enabled for frontend integration
- **Database Schemas** for Motorcycles and Cart

### Admin Panel
- **Dashboard** with statistics
- **Manage Motorcycles** (CRUD operations)
- **Analytics** and Category breakdown
- **Stock Management**
- **Product Specifications**

### 3D Viewer
- **GLTFLoader** for .glb model loading
- **OrbitControls** for interactive navigation
- **Auto-rotation** with manual control
- **Professional Lighting** setup
- **Responsive Canvas** sizing
- **Default Procedural Model** for fallback

## 📋 Project Structure

```
moto-bike/
├── public/
│   ├── index.html           # Homepage
│   ├── products.html        # Product listing page
│   ├── admin.html          # Admin dashboard
│   ├── style.css           # Main stylesheet (production-ready)
│   ├── app.js              # Core application logic
│   ├── three-viewer.js     # THREE.js viewer setup
│   ├── products.js         # Products page logic
│   └── admin.js            # Admin panel logic
│
├── models/
│   ├── MotorcycleModel.js       # Mongoose schema
│   └── CartModel.js             # Cart schema
│
├── controllers/
│   ├── motorcycleController.js
│   └── cartController.js
│
├── routes/
│   ├── motorcycles.js
│   └── cart.js
│
├── server.js               # Express server
├── package.json            # Dependencies
├── .env                    # Environment variables
└── README.md              # Documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure MongoDB

Edit `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/moto-showroom
PORT=5000
NODE_ENV=development
```

**Using MongoDB Atlas (Cloud):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/moto-showroom
```

### Step 3: Add Sample Data (Optional)

Run this in Node.js console or create a seed script:

```javascript
const mongoose = require('mongoose');
const Motorcycle = require('./models/Motorcycle');

const bikes = [
  {
    name: "Ducati Panigale V4",
    brand: "Ducati",
    price: 15999,
    category: "sport",
    description: "880 HP superbike with cutting-edge technology",
    specifications: {
      engineSize: "1103cc",
      power: "215 HP",
      torque: "124 Nm",
      weight: "195 kg",
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
    description: "Classic American cruiser with urban attitude",
    specifications: {
      engineSize: "750cc",
      power: "54 HP",
      torque: "59 Nm",
      weight: "221 kg",
      maxSpeed: "180 km/h"
    },
    inStock: true,
    rating: 4
  }
];

Motorcycle.insertMany(bikes);
```

### Step 4: Start the Server

```bash
# Development with auto-reload
npm install -g nodemon
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

### Step 5: Access the Application

- **Homepage**: http://localhost:5000
- **Shop**: http://localhost:5000/products.html
- **Admin Panel**: http://localhost:5000/admin.html

## 📡 API Endpoints

### Motorcycles
```
GET    /api/motorcycles              # Get all (with filters)
GET    /api/motorcycles/:id          # Get single
GET    /api/motorcycles/stats        # Get statistics
POST   /api/motorcycles              # Add new
PUT    /api/motorcycles/:id          # Update
DELETE /api/motorcycles/:id          # Delete
```

### Query Parameters
```
/api/motorcycles?search=ducati
/api/motorcycles?category=sport
/api/motorcycles?minPrice=1000&maxPrice=20000
/api/motorcycles?sortBy=price-asc
```

### Cart
```
GET    /api/cart?sessionId=...       # Get cart
POST   /api/cart                     # Add to cart
PUT    /api/cart/:productId          # Update quantity
DELETE /api/cart/:productId          # Remove item
DELETE /api/cart                     # Clear cart
```

## 🎨 UI/UX Features

### Color Scheme
- Primary: `#0066ff` (Blue)
- Secondary: `#00d4ff` (Cyan)
- Accent: `#ff0066` (Magenta)
- Dark BG: `#0a0e27`
- Light Text: `#e0e0e0`

### Components
- **Glassmorphism Cards** - Frosted glass effect
- **Gradient Buttons** - Modern gradient backgrounds
- **Smooth Transitions** - 300ms cubic-bezier timing
- **Responsive Grid** - Auto-fit, mobile-first
- **Toast Notifications** - Success, error, warning, info
- **Loading Spinner** - Animated during API calls

## 🔧 Configuration

### Customize Brand Colors

Edit `public/style.css` (Lines 9-24):
```css
:root {
  --primary-color: #0066ff;
  --secondary-color: #00d4ff;
  --accent-color: #ff0066;
  /* ... more variables ... */
}
```

### Add Custom 3D Models

Place `.glb` files in `public/models/` and reference in admin panel:
```
Model URL: /models/my-bike.glb
```

### Customize Motorcycle Categories

Edit `MotorcycleModel.js`:
```javascript
category: {
  type: String,
  enum: ['sport', 'cruiser', 'touring', 'offroad', 'adventure'],
  default: 'sport'
}
```

## 🔐 Security Considerations

For production deployment:

1. **Add Authentication** to admin endpoints:
```javascript
const isAdmin = (req, res, next) => {
  // Add JWT verification
  next();
};

router.post('/', isAdmin, createMotorcycle);
```

2. **Validate Input** using express-validator
3. **Rate Limiting** using express-rate-limit
4. **HTTPS** enabled
5. **Environment Variables** for sensitive data
6. **CORS** configured properly:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

## 📦 Deployment

### Deploy to Heroku

```bash
$ heroku login
$ heroku create your-app-name
$ git push heroku main
```

### Deploy to Vercel (Frontend)

```bash
$ npm install -g vercel
$ vercel
```

### Deploy to AWS / Google Cloud
- Use with MongoDB Atlas
- Configure environment variables
- Set up CI/CD pipeline

## 🛠️ Development

### Add a New Feature

1. **Update Model** (if needed)
```javascript
// MotorcycleModel.js
// Add new field to schema
```

2. **Update Controller**
```javascript
// controllers/motorcycleController.js
// Add new logic
```

3. **Update Route**
```javascript
// routes/motorcycles.js
// Add new endpoint
```

4. **Update Frontend**
```javascript
// public/app.js or specific page
// Add UI and API calls
```

### Code Quality

```bash
# Install linter
npm install eslint --save-dev

# Configuration
npx eslint --init

# Run linter
npx eslint .
```

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Verify network access (for Atlas)

**CORS Error**
- Frontend and backend must run on different ports
- Check `cors()` configuration in server.js

**3D Model Not Loading**
- Verify .glb file exists in `/public/models/`
- Check browser console for errors
- Use valid GLB format

**Cart Not Persisting**
- Browser storage uses session ID
- Check localStorage in DevTools
- Verify cart API is running

## 📚 Libraries & Dependencies

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Cors** - Cross-origin requests
- **Dotenv** - Environment variables
- **Multer** - File uploads (optional)

### Frontend
- **THREE.js** - 3D rendering
- **GLTFLoader** - Model loading
- **OrbitControls** - 3D camera control
- **Vanilla JavaScript** - No framework dependencies

## 📄 License

MIT License - Feel free to use for personal and commercial projects

## 👨‍💻 Support

For issues or questions:
- Check troubleshooting section
- Review API documentation
- Check browser console errors
- Verify all dependencies are installed

---

**Built with ❤️ for motorcycle enthusiasts worldwide**

