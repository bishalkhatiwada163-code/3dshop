# 📖 COMPLETE FILE REFERENCE

## Quick Navigation

**Starting?** → [QUICK_START.md](QUICK_START.md) (5 minutes)  
**Lost?** → [GETTING_STARTED.md](GETTING_STARTED.md) (Navigation guide)  
**Building?** → [API_DOCUMENTATION.md](API_DOCUMENTATION.md) (API reference)  
**Deploying?** → [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) (Production)

---

## 📋 All Files Explained

### Root Directory Files

| File | Purpose | Edit? | Size |
|------|---------|-------|------|
| `server.js` | Express application entry point | ❌ Minor tweaks | ~60 lines |
| `package.json` | NPM dependencies & scripts | ✅ Add packages here | ~25 lines |
| `.env` | Database URL, port, config | ✅ **MUST EDIT** | ~3 lines |
| `.gitignore` | Git ignore rules | ❌ Use as-is | ~15 lines |
| `seed.js` | Populate database with samples | ✅ Edit bike data | ~150 lines |
| `verify-setup.js` | Verify project setup | ❌ Run to check | ~200 lines |

### Backend directories

#### `models/` - Database Schemas

| File | Purpose | Fields |
|------|---------|--------|
| `MotorcycleModel.js` | Motorcycle data model | name, brand, price, category, specs, images, ratings |
| `CartModel.js` | Shopping cart model | sessionId, items array, TTL expiry |

**Edit:** Add/remove fields as needed  
**Size:** ~90 lines total

#### `controllers/` - Business Logic

| File | Purpose | Functions |
|------|---------|-----------|
| `motorcycleController.js` | Motorcycle CRUD + filtering | getAll, getById, create, update, delete, getStats |
| `cartController.js` | Cart operations | get, add, remove, update, clear |

**Edit:** Add business logic here  
**Size:** ~200 lines total

#### `routes/` - API Endpoints

| File | Purpose | Endpoints |
|------|---------|-----------|
| `motorcycles.js` | Motorcycle endpoints | GET / POST / PUT / DELETE motorcycles |
| `cart.js` | Cart endpoints | GET / POST / PUT / DELETE cart items |

**Edit:** Add new routes here  
**Size:** ~27 lines total

### Frontend Directory (`public/`)

#### HTML Files

| File | Purpose | Sections | Edit? |
|------|---------|----------|-------|
| `index.html` | Homepage | Hero, featured, categories, features, contact | ✅ Yes |
| `products.html` | Shop page | Filters, product grid, cart | ✅ Yes  |
| `admin.html` | Admin dashboard | Stats, CRUD, analytics | ✅ Minor |

**Size:** ~330 lines total

#### Stylesheets

| File | Purpose | Lines | Edit? |
|------|---------|-------|-------|
| `style.css` | Master stylesheet | 900+ | ✅ **Colors!** |

**CSS Variables (edit these):**
- Lines 9-24: Color scheme
- Lines 25-27: Transitions & spacing
- Edit `--primary-color`, `--secondary-color`, etc.

#### JavaScript Files

| File | Purpose | Functions | Edit? |
|------|---------|-----------|-------|
| `app.js` | Core app logic | API calls, cart, theme, utilities | ✅ Add features |
| `three-viewer.js` | 3D viewer setup | Scene, camera, lighting, controls | ❌ Advanced only |
| `products.js` | Shop page logic | Filtering, sorting, display | ✅ Customize filters |
| `admin.js` | Admin panel logic | Form handling, CRUD, stats | ✅ Add fields |

**Size:** ~800 lines total

### Documentation Files

| File | Purpose | Read Time | When to Read |
|------|---------|-----------|--------------|
| `README.md` | Complete reference | 15 min | When starting |
| `QUICK_START.md` | Fast setup guide | 5 min | **First!** |
| `GETTING_STARTED.md` | Navigation guide | 10 min | If lost |
| `API_DOCUMENTATION.md` | API reference | 15 min | When coding |
| `DEPLOYMENT_GUIDE.md` | Production deployment | 20 min | When going live |
| `FEATURES_GUIDE.md` | Deep technical dive | 20 min | Understanding code |
| `PROJECT_STRUCTURE.txt` | File organization | 5 min | Project layout |
| `PROJECT_COMPLETION_SUMMARY.md` | What was built | 10 min | Overview |
| `FILE_REFERENCE.md` | This file | 5 min | Navigation |

---

## 🎯 Quick Edit Guide

### I want to...

**Change the brand name**  
Edit: `public/index.html` line ~38  
Change: `<div class="logo">⚡ MotoShowroom</div>`

**Change colors**  
Edit: `public/style.css` lines 9-24  
Change: `--primary-color`, `--secondary-color`, `--accent-color`

**Add a motorcycle**  
Option 1: Admin panel → `http://localhost:5000/admin.html`  
Option 2: Edit `seed.js` → Run `node seed.js`  
Option 3: Use API → POST to `/api/motorcycles`

**Add/remove product filters**  
Edit: `public/products.js` ~lines 25-40  
Edit: `public/products.html` ~lines 20-35

**Change navigation links**  
Edit: `public/index.html` lines ~22-28 and ~44-48

**Add admin features**  
Edit: `MotorcycleModel.js` → Add schema field  
Then: `controllers/motorcycleController.js` → Add logic  
Then: `public/admin.html` → Add form field  
Then: `public/admin.js` → Add form handling

**Change database fields**  
Edit: `MotorcycleModel.js` (schema)  
Then: `seed.js` (sample data)  
Then: Frontend HTML/JS as needed

---

## 📊 Project Statistics

### Files Created
- **Backend:** 7 files
- **Database:** 2 files  
- **Controllers:** 2 files
- **Routes:** 2 files
- **Frontend:** 3 HTML + 4 JS + 1 CSS
- **Documentation:** 8 files
- **Configuration:** 3 files
- **Total:** 33 files

### Lines of Code
- **Backend:** ~200 lines
- **Database:** ~90 lines
- **Frontend:** ~1,400 lines
- **Documentation:** ~3,000 lines
- **Total Code:** ~2,500 lines (excluding docs)

### API Endpoints
- **Motorcycles:** 6 endpoints
- **Cart:** 5 endpoints
- **Total:** 11 endpoints

### Database Collections
- **Motorcycles:** 1 collection
- **Cart:** 1 collection
- **Total:** 2 collections

---

## ✅ File Status

### Essential Files (Must Have)
- [x] `server.js` - Backend entry point
- [x] `package.json` - Dependencies
- [x] `.env` - Configuration
- [x] Database models - Schema definitions
- [x] Controllers - Business logic
- [x] Routes - API endpoints
- [x] Frontend HTML - Pages
- [x] `style.css` - Styling
- [x] JavaScript files - Frontend logic

### Documentation (Recommended)
- [x] `README.md` - Main guide
- [x] `QUICK_START.md` - Setup guide
- [x] `API_DOCUMENTATION.md` - API reference
- [x] `DEPLOYMENT_GUIDE.md` - Deployment

### Utilities (Helpful)
- [x] `seed.js` - Sample data
- [x] `verify-setup.js` - Verification script
- [x] `.gitignore` - Git configuration

---

## 🚀 First Time Setup Order

1. **Read:** `QUICK_START.md` (5 min)
2. **Install:** `npm install` (2 min)
3. **Configure:** Edit `.env` (2 min)
4. **Seed:** `node seed.js` (1 min)
5. **Run:** `npm start` (1 min)
6. **Test:** Open http://localhost:5000 (1 min)
7. **Verify:** `node verify-setup.js` (optional, 1 min)

**Total: ~13 minutes to running application** ✓

---

## 📚 Documentation Map

```
GETTING_STARTED.md (You are here - Navigation)
    ├─ QUICK_START.md (Fast setup)
    │   ├─ README.md (Complete reference)
    │   │   ├─ Installation steps
    │   │   ├─ Project structure
    │   │   ├─ Configuration
    │   │   └─ Development tips
    │   │
    │   └─ API_DOCUMENTATION.md (API reference)
    │       ├─ Motorcycles endpoints
    │       ├─ Cart endpoints
    │       ├─ Query parameters
    │       └─ Examples
    │
    ├─ FEATURES_GUIDE.md (Technical dive)
    │   ├─ File descriptions
    │   ├─ Code statistics
    │   ├─ Database schemas
    │   └─ Feature checklist
    │
    └─ DEPLOYMENT_GUIDE.md (Going live)
        ├─ Heroku deployment
        ├─ AWS setup
        ├─ Google Cloud
        ├─ DigitalOcean
        ├─ Domain setup
        └─ Monitoring
```

---

## 🔍 Finding What You Need

### By Task

**Setting up project:**  
→ QUICK_START.md

**Understanding structure:**  
→ FEATURES_GUIDE.md

**Coding features:**  
→ README.md + API_DOCUMENTATION.md

**Deploying online:**  
→ DEPLOYMENT_GUIDE.md

**Stuck/confused:**  
→ GETTING_STARTED.md (this file)

### By File Type

**Need to edit server?**  
→ See README.md "Backend" section

**Need to edit frontend?**  
→ See FEATURES_GUIDE.md "HTML Files" section

**Need API info?**  
→ See API_DOCUMENTATION.md

**Need to add fields?**  
→ See README.md "Customization"

### By Error

**Port already in use:**  
→ QUICK_START.md "Troubleshooting"

**MongoDB connection failed:**  
→ QUICK_START.md "MongoDB Setup"

**API returning 404:**  
→ API_DOCUMENTATION.md "Error Codes"

**Deployment failing:**  
→ DEPLOYMENT_GUIDE.md "Troubleshooting"

---

## 💡 Pro Tips

### Organization
- Keep .env in root (don't commit to git)
- Models define data structure
- Controllers contain business logic
- Routes connect HTTP requests to controllers
- Public folder served statically

### Performance
- CSS file is large but includes all breakpoints
- JavaScript files are modular and loadable separately
- Database indexes on commonly queried fields
- TTL index automatically cleans cart

### Maintenance
- Edit `.env` to change configuration
- Edit `models/` to change database schema
- Edit `controllers/` to change business logic
- Edit `public/` to change frontend
- Edit documentation files to update docs

### Scaling
- REST API easily integrates with mobile apps
- Database allows unlimited motorcycles
- Cart uses sessionId (no authentication needed)
- Can add authentication layer later
- Can add payment gateway without restructuring

---

## 📱 Responsive Breakpoints

CSS file includes breakpoints at:
- **Desktop:** 1024px and above  
- **Tablet:** 768px to 1024px
- **Mobile:** Below 768px
- **Small Mobile:** Below 480px

Edit in `style.css` media queries section.

---

## 🎨 Theme Colors

Located in `public/style.css` lines 9-24:

```css
--primary-color: #0066ff;        /* Blue */
--secondary-color: #00d4ff;      /* Cyan */
--accent-color: #ff0066;         /* Magenta */
--dark-bg: #0a0e27;              /* Dark background */
--light-text: #e0e0e0;           /* Light text */
--success-color: #10b981;        /* Green */
--error-color: #ef4444;          /* Red */
--warning-color: #f59e0b;        /* Orange */
```

Change these to match your brand.

---

## ✨ Special Features

### 3D Viewer
- Located in: `public/three-viewer.js`
- Libraries: THREE.js, GLTFLoader, OrbitControls
- Supports .glb model files
- Auto-rotates or user can control

### Dark Mode
- Toggle button in navbar
- Stored in localStorage
- CSS handles light/dark theme
- `body.light-mode` class applied

### Cart System
- SessionId-based (no login needed)
- Stored in MongoDB
- Real-time updates
- Auto-clears after 7 days

### Admin Panel
- Full CRUD operations
- Statistics dashboard
- Category breakdown
- Form validation

---

## 🔐 Security Notes

**For Development:**
- .env file stored locally
- No authentication required
- CORS allows all origins

**For Production:**
- Add JWT authentication
- Restrict CORS origins
- Validate all inputs
- Use HTTPS/SSL
- Setup rate limiting
- Regular backups
- Monitor logs

See DEPLOYMENT_GUIDE.md for details.

---

## 📞 Quick Help

**Can't find a command?**  
→ Check `package.json` scripts section

**Don't know an API endpoint?**  
→ Check API_DOCUMENTATION.md

**Confused about file organization?**  
→ Check FEATURES_GUIDE.md Project Structure

**App won't start?**  
→ Check QUICK_START.md Troubleshooting

**Don't know what feature to add?**  
→ Check FEATURES_GUIDE.md Feature Checklist

---

## 📄 File Change Summary

### Modified Files
- None (all new files created)

### New Directories
- `models/`
- `controllers/`
- `routes/`
- `public/`

### Old Files Status
- `project.html` → Archived (functionality moved to public/)
- `script.js` → Replaced with modular system
- `style.css` → Replaced with comprehensive style.css

---

**You have everything needed to build a world-class motorcycle e-commerce platform!**

**Next: Read [QUICK_START.md](QUICK_START.md) and start building! 🚀**

---

*Last Updated: March 2026*  
*Document Type: Navigation & Reference*  
*Version: 1.0*
