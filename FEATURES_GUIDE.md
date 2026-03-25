# 📋 COMPLETE PROJECT STRUCTURE

```
moto-bike/
│
├── 📄 server.js                    # Express server entry point
├── 📄 package.json                 # Node.js dependencies
├── 📄 seed.js                      # Database population script
├── 📄 .env                         # Environment variables
├── 📄 .gitignore                   # Git ignore rules
│
├── 📁 public/                      # Frontend files (served statically)
│   ├── 📄 index.html               # Homepage
│   ├── 📄 products.html            # Product listing & filtering
│   ├── 📄 admin.html               # Admin dashboard
│   ├── 📄 style.css                # Master stylesheet (production-ready)
│   ├── 📄 app.js                   # Core app logic (utilities, cart, theme)
│   ├── 📄 three-viewer.js          # THREE.js 3D viewer implementation
│   ├── 📄 products.js              # Products page functionality
│   ├── 📄 admin.js                 # Admin panel functionality
│   ├── 📁 models/                  # 3D GLB motorcycle models
│   │   └── 🎨 [motorcycle-models].glb
│   └── 📁 images/                  # Product images
│       └── 📷 [motorcycle-images].jpg
│
├── 📁 models/                      # MongoDB Mongoose schemas
│   ├── 📄 MotorcycleModel.js            # Motorcycle data model
│   └── 📄 CartModel.js                  # Shopping cart model
│
├── 📁 controllers/                 # Business logic
│   ├── 📄 motorcycleController.js  # Motorcycle CRUD operations
│   └── 📄 cartController.js        # Cart operations
│
├── 📁 routes/                      # API route definitions
│   ├── 📄 motorcycles.js           # Motorcycle endpoints
│   └── 📄 cart.js                  # Cart endpoints
│
├── 📖 README.md                    # Main documentation
├── 🚀 QUICK_START.md              # Fast setup guide
├── 🔌 API_DOCUMENTATION.md        # Complete API reference
├── 🌍 DEPLOYMENT_GUIDE.md         # Production deployment
└── 📋 PROJECT_STRUCTURE.txt       # This file
```

---

## File Descriptions

### Backend Files

#### `server.js` (60 lines)
- Express app initialization
- MongoDB connection
- Middleware setup (CORS, body-parser)
- Route registration
- Error handling

#### `package.json`
- Dependencies: Express, Mongoose, CORS, Dotenv, Multer
- Dev dependencies: Nodemon
- Start & dev scripts

#### `seed.js` (150 lines)
- Sample motorcycle data (10 bikes)
- Database population logic
- Statistics display
- Connection cleanup

#### `.env`
- `MONGO_URI`: Database connection string
- `PORT`: Server port
- `NODE_ENV`: Environment flag

### MongoDB Models

#### `MotorcycleModel.js` (50 lines)
Schema fields:
- Basic: name, brand, price, category
- Media: image, modelUrl
- Details: description, specifications
- Status: inStock, rating, createdAt

#### `CartModel.js` (40 lines)
Schema fields:
- sessionId (session tracking)
- items array (with productId, quantity)
- Auto-delete after 7 days (TTL)

### Controllers

#### `controllers/motorcycleController.js` (110 lines)
Functions:
- `getAllMotorcycles()` - with filters & sorting
- `getMotorcycleById()` - single bike details
- `createMotorcycle()` - add new (admin)
- `updateMotorcycle()` - edit existing (admin)
- `deleteMotorcycle()` - remove bike (admin)
- `getStats()` - dashboard statistics

#### `controllers/cartController.js` (90 lines)
Functions:
- `getCart()` - retrieve cart
- `addToCart()` - add item
- `removeFromCart()` - delete item
- `updateCartItem()` - change quantity
- `clearCart()` - empty cart

### Routes

#### `routes/motorcycles.js` (15 lines)
- GET / - all motorcycles
- GET /stats - statistics
- GET /:id - single bike
- POST / - create (admin)
- PUT /:id - update (admin)
- DELETE /:id - delete (admin)

#### `cart.js` (12 lines)
- GET / - get cart
- POST / - add to cart
- PUT /:productId - update quantity
- DELETE /:productId - remove item
- DELETE / - clear cart

### Frontend Files

#### `public/index.html` (130 lines)
Sections:
- Navigation bar (sticky)
- Hero section with 3D viewer
- Featured motorcycles grid
- Category cards (clickable)
- Features section
- Contact form
- Footer

#### `public/products.html` (80 lines)
Sections:
- Filter sidebar (search, category, price)
- Products grid (dynamic)
- Cart integration
- Sorting options

#### `public/admin.html` (120 lines)
Sections:
- Dashboard with stats
- Motorcycles table
- Add/edit form
- Analytics section
- Admin navigation

#### `public/style.css` (900+ lines)
- CSS variables (colors, transitions)
- Global styles & layout
- Component styles:
  - Navigation & cart
  - Hero & sections
  - Product cards
  - Forms & inputs
  - Admin panel
  - Responsive breakpoints (1024px, 768px, 480px)
- Animations (slideIn, spin, fadeIn)

#### `public/app.js` (280 lines)
Core utilities:
- `showLoader()` - loading spinner
- `showToast()` - notifications
- `apiCall()` - API wrapper
- `formatCurrency()` - money formatting

Classes:
- `CartManager` - cart operations
- `ThemeManager` - dark/light mode

Functions:
- UI setup (sidebar, navigation, contact form)
- Admin menu routing

#### `public/three-viewer.js` (200 lines)
Features:
- Scene & camera setup
- Lighting (ambient + directional + point)
- Controls (OrbitControls)
- Model loading (GLTFLoader)
- Animation loop
- Responsive resizing
- Default procedural motorcycle

#### `public/products.js` (100 lines)
Features:
- Filter management
- Product loading & display
- Grid rendering
- Event listeners
- URL parameter parsing

#### `public/admin.js` (250 lines)
Features:
- Motorcycle table display
- Form populate/submit
- Edit/delete operations
- Statistics update
- Category breakdown
- Form validation

---

## Key Technologies

### Backend
- **Express.js** v4.18 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** v7.5 - ODM
- **CORS** - Cross-origin support
- **Dotenv** - Environment config
- **Multer** - File uploads (optional)

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **Vanilla JavaScript** - Logic
- **THREE.js** r128 - 3D rendering
- **GLTFLoader** - Model loading
- **OrbitControls** - 3D interaction

### DevOps
- **Node.js** - Runtime
- **npm** - Package manager
- **Nodemon** - Development auto-reload
- **Git** - Version control

---

## Code Statistics

| File | Lines | Purpose |
|------|-------|---------|
| server.js | 60 | Core backend |
| controllers/ | 200 | Business logic |
| routes/ | 27 | API endpoints |
| models/ | 90 | Data schemas |
| public/style.css | 900+ | Styling |
| public/app.js | 280 | App utilities |
| public/*.js | 550 | Frontend logic |
| **Total** | **~2,500+** | Full stack |

---

## Database Schema Visualization

```
Motorcycle
├── _id: ObjectId
├── name: String
├── brand: String
├── price: Number
├── category: String (enum)
├── description: String
├── image: String
├── modelUrl: String
├── specifications: Object
│   ├── engineSize: String
│   ├── power: String
│   ├── torque: String
│   ├── weight: String
│   ├── fuelCapacity: String
│   └── maxSpeed: String
├── inStock: Boolean
├── rating: Number
└── createdAt: Date

Cart
├── _id: ObjectId
├── sessionId: String
├── items: Array
│   └── Object
│       ├── productId: ObjectId (ref: Motorcycle)
│       ├── quantity: Number
│       └── addedAt: Date
└── createdAt: Date (TTL: 7 days)
```

---

## API Endpoint Summary

### Motorcycles (6 endpoints)
```
GET    /api/motorcycles
POST   /api/motorcycles
GET    /api/motorcycles/:id
PUT    /api/motorcycles/:id
DELETE /api/motorcycles/:id
GET    /api/motorcycles/stats
```

### Cart (5 endpoints)
```
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:productId
DELETE /api/cart/:productId
DELETE /api/cart
```

**Total: 11 API endpoints**

---

## Pages & Routes

### Public Pages
- `/` - Homepage with hero section
- `/products.html` - Product listing with filters
- `/admin.html` - Admin dashboard

### API Routes
- `/api/motorcycles...` - 6 endpoints
- `/api/cart...` - 5 endpoints
- `/api/health` - Server health check

---

## Feature Checklist

### Core Features ✓
- [x] 3D Motorcycle Viewer
- [x] Product Listing & Filtering
- [x] Shopping Cart System
- [x] Admin Dashboard
- [x] Dark/Light Mode
- [x] Responsive Design
- [x] Toast Notifications
- [x] Loading Spinners

### Database Features ✓
- [x] MongoDB Integration
- [x] Mongoose Schemas
- [x] Data Validation
- [x] TTL Indexes
- [x] Aggregation Pipelines

### API Features ✓
- [x] RESTful Endpoints
- [x] Query Filtering
- [x] Search Function
- [x] Sorting Options
- [x] Error Handling
- [x] CORS Support

### UI/UX Features ✓
- [x] Glassmorphism Design
- [x] Smooth Animations
- [x] Gradient Buttons
- [x] Product Cards
- [x] Form Validation
- [x] Mobile Responsive
- [x] Category Navigation
- [x] Price Range Filter

### 3D Viewer Features ✓
- [x] Model Loading (GLB)
- [x] Auto Rotation
- [x] Mouse Controls
- [x] Zoom Controls
- [x] Pan Controls
- [x] Professional Lighting
- [x] Responsive Canvas
- [x] Fallback Model

---

## Next Steps to Enhance

1. **Add Payment Gateway** (Stripe, PayPal)
2. **User Authentication** (JWT)
3. **Wishlist Feature**
4. **Product Reviews**
5. **Email Notifications**
6. **Image Upload** (AWS S3)
7. **Advanced Analytics**
8. **Inventory Management**
9. **Order Tracking**
10. **Mobile App** (React Native)

---

**Project created: March 2026**
**Total Development Time: Production-Ready**
