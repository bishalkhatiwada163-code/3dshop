# 🚀 Vercel Deployment Guide

## Quick Vercel Setup

> **Recommended:** Deploy frontend to Vercel, backend to Heroku or Railway.  
> **OR** Deploy full-stack to Vercel using API Routes.

---

## Option 1: Frontend Only to Vercel (Recommended for Beginners)

### Step 1: Prepare Frontend

The `public/` folder contains your entire frontend. Vercel will serve it as static files.

```bash
# Make sure you have static files only
ls public/
# Should show: index.html products.html admin.html style.css *.js
```

### Step 2: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 3: Login to Vercel

```bash
vercel login
```

Follow prompts to:
- Create Vercel account or login
- Authorize Vercel CLI
- Connect to GitHub (optional)

### Step 4: Deploy Frontend

```bash
# From project root
cd public
vercel --prod
```

**Follow prompts:**
- Project name: `moto-showroom`
- Directory: `.` (current)
- Build settings: Skip (static files only)
- Override existing deployment: Yes

**Result:**
```
✓ Production: https://moto-showroom.vercel.app
```

### Step 5: Update API URL

In `public/app.js`, update:

```javascript
// Change this:
const API_BASE = 'http://localhost:5000/api';

// To your backend URL:
const API_BASE = 'https://your-backend-url.com/api';
// OR for production with environment variable:
const API_BASE = process.env.REACT_APP_API_URL || 'https://moto-showroom-api.herokuapp.com/api';
```

### Step 6: Deploy Backend Separately

Deploy Node.js backend to:
- **Heroku** (easiest)
- **Railway** (modern alternative)
- **Render.com** (free tier)

See DEPLOYMENT_GUIDE.md for backend setup.

---

## Option 2: Full-Stack to Vercel (Using API Routes)

### Step 1: Create API Routes Structure

Create `api/` directory for Vercel Functions:

```
api/
├── motorcycles.js
├── cart.js
└── models/
    ├── MotorcycleModel.js
    └── CartModel.js
```

### Step 2: Convert Express Routes to Vercel Functions

Create `api/motorcycles.js`:

```javascript
// api/motorcycles.js
import mongoose from 'mongoose';

const motorcycleSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  // ... other fields
});

const Motorcycle = mongoose.model('Motorcycle', motorcycleSchema);

export default async function handler(req, res) {
  await mongoose.connect(process.env.MONGO_URI);

  if (req.method === 'GET') {
    const { id, search, category } = req.query;
    
    if (id) {
      const bike = await Motorcycle.findById(id);
      return res.json(bike);
    }
    
    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    
    const bikes = await Motorcycle.find(query);
    return res.json(bikes);
  }
  
  if (req.method === 'POST') {
    const bike = new Motorcycle(req.body);
    await bike.save();
    return res.status(201).json(bike);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
```

### Step 3: Update vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm install",
  "outputDirectory": "public",
  "env": {
    "MONGO_URI": "@mongodb_uri"
  },
  "functions": {
    "api/*.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

### Step 4: Deploy

```bash
vercel --prod
```

Your API will be at: `https://moto-showroom.vercel.app/api/motorcycles`

---

## Option 3: Frontend on Vercel + Backend on Vercel Functions

### Create NextJS API Routes (Easier)

Convert to Next.js:

```bash
npx create-next-app@latest moto-showroom --typescript
cd moto-showroom
```

Move `public/` files to `app/` and create API routes in `app/api/`

---

## Environment Variables Setup

### In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add:

```
MONGO_URI: mongodb+srv://user:pass@cluster.mongodb.net/moto-showroom
API_URL: https://moto-showroom-api.herokuapp.com
NODE_ENV: production
```

### In your code:

```javascript
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

## Custom Domain Setup

### 1. Buy Domain

- Vercel Domains
- Namecheap
- GoDaddy

### 2. Connect to Vercel

1. Go to Vercel Dashboard
2. Project → Settings → Domains
3. Add your domain
4. Update nameservers

### 3. Verify

```bash
# Check DNS propagation
nslookup yourdomain.com
```

---

## Performance Optimization

### Enable Caching

In `vercel.json`:

```json
"headers": [
  {
    "source": "/static/:path*",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  }
]
```

### Compress Assets

```bash
# Install compression
npm install compression

# In server.js
const compression = require('compression');
app.use(compression());
```

### Minify Frontend

```bash
npm install -g terser
terser public/app.js -o public/app.min.js
```

---

## Monitoring & Logs

### View Logs

```bash
# Stream logs from Vercel
vercel logs
```

### Setup Error Monitoring

Use Sentry:

```bash
npm install @sentry/node
```

In `server.js`:

```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

---

## Database Connection (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster

1. Go to mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Create database user
5. Get connection string

### 2. Add to Vercel

In Vercel Dashboard Environment Variables:

```
MONGO_URI: mongodb+srv://username:password@cluster.mongodb.net/moto-showroom?retryWrites=true&w=majority
```

### 3. Whitelist IP

- Go to MongoDB Atlas
- Network Access
- Add `0.0.0.0/0` (allows Vercel IPs)

---

## Troubleshooting

### Build Fails

```bash
# Check build locally
npm run build

# Check logs
vercel logs
```

### API Routes Not Working

- Ensure `api/` folder exists
- Check function names
- Verify environment variables

### Images Not Loading

- Ensure image paths are correct
- Use absolute paths: `/images/bike.jpg`
- Check file exists in `public/images/`

### 3D Viewer Not Loading

- Verify CDN links in HTML
- Check `.glb` file paths
- Test in DevTools Network tab

---

## Cost Estimate

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel Frontend | 100GB/month | $0 |
| Vercel Functions | 100GB/month | $0 |
| MongoDB Atlas | 512MB | $0 |
| Custom Domain | - | $12/year |
| Vercel Pro (optional) | - | $20/month |

**Total: $1-2/month**

---

## Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] MongoDB Atlas cluster created
- [ ] Frontend deployed to Vercel
- [ ] API endpoints updated with production URL
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled (automatic)
- [ ] Logs monitored
- [ ] Performance optimized

---

## Quick Command Reference

```bash
# Login to Vercel
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Update environment variables
vercel env pull

# List deployments
vercel ls
```

---

**Next: Follow Option 1 or 2 above for your specific use case!**
