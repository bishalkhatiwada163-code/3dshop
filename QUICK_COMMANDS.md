# ⚡ Quick Terminal Commands Reference

Copy-paste ready commands for responsive deployment setup and Vercel deployment.

---

## 🔧 Step 1: Local Setup (3 minutes)

### Install Dependencies
```bash
npm install
```

### Test Locally
```bash
npm start
```
Then open: http://localhost:5000

### Verify All Pages Work
- Homepage: http://localhost:5000/
- Products: http://localhost:5000/products.html
- Admin: http://localhost:5000/admin.html

**Press Ctrl+C to stop**

---

## 📱 Step 2: Test Mobile Responsiveness

### Using Desktop Browser DevTools
1. Press **F12** to open DevTools
2. Click **Toggle device toolbar** (Ctrl+Shift+M)
3. Test these screen sizes:
   - 375px (iPhone SE)
   - 480px (Mobile)
   - 600px (Tablet)
   - 768px (iPad)
   - 1024px (Desktop)

### What to Check
- ✅ No horizontal scrolling
- ✅ Text readable without zoom
- ✅ Buttons clickable (44px+ size)
- ✅ 3D viewer visible
- ✅ Navigation responsive
- ✅ Forms full-width and properly aligned

---

## 🚀 Step 3: Deploy to Vercel

### Install Vercel CLI (One Time Only)
```bash
npm install -g vercel
```

### Login to Vercel (One Time Only)
```bash
vercel login
```
Creates account at https://vercel.com (free tier available)

### Option A: Windows Users (Fastest - Recommended)
```bash
.\deploy-vercel.bat
```

### Option B: macOS/Linux Users (Fastest - Recommended)
```bash
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

### Option C: Manual Deployment (Detailed Control)
```bash
# Interactive setup
vercel

# Then for production
vercel --prod
```

---

## 📊 Step 4: Configure Environment Variables

### In Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Click **Settings** → **Environment Variables**
4. Add these variables:

#### Variable 1: MongoDB Connection
```
Name: MONGO_URI
Value: mongodb+srv://username:password@cluster.mongodb.net/moto-showroom
Environments: All
```

#### Variable 2: Node Environment
```
Name: NODE_ENV
Value: production
Environments: All
```

#### Variable 3: Port
```
Name: PORT
Value: 3000
Environments: All
```

#### Variable 4: Backend URL (if separate backend)
```
Name: REACT_APP_API_URL
Value: https://your-backend.railway.app/api
Environments: All
```

### After Adding Variables
```bash
# Redeploy with new environment variables
vercel --prod
```

---

## 🌐 Step 5: Setup MongoDB Atlas (If Using Cloud Database)

### Create Free MongoDB Database
1. Visit: https://www.mongodb.com/cloud/atlas
2. Create account (free tier)
3. Create cluster (M0 - free)
4. Wait for cluster to deploy (~3 minutes)

### Get Connection String
1. Click **Connect** button
2. Choose **Drivers** (not shell)
3. Copy connection string
4. Replace `<password>` with your database user password
5. Replace `<database>` with `moto-showroom`

### Final Connection String Format
```
mongodb+srv://username:yourpassword@cluster-name.mongodb.net/moto-showroom?retryWrites=true&w=majority
```

### Add to Vercel
Copy the connection string and paste in Vercel dashboard:
- Variable name: `MONGO_URI`
- Value: [your connection string]

---

## ✅ Step 6: Verify Deployment

### Check Deployment Status
```bash
# View deployment logs
vercel logs

# View all deployments
vercel list
```

### Test Production URL
Open your browser to: `https://your-project-name.vercel.app`

### Check for Errors
1. Open your site
2. Press **F12** for DevTools
3. Click **Console** tab
4. Look for any red error messages

---

## 🐛 Troubleshooting Commands

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Kill Process on Port 5000 (if stuck)

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

### View Vercel Environment Variables
```bash
vercel env ls
```

### Pull Environment Variables Locally
```bash
vercel env pull
```

### View Real-Time Logs
```bash
vercel logs --tail
```

---

## 📈 After Deployment

### Monitor Performance
```bash
# Open Vercel Analytics dashboard
# https://vercel.com/dashboard → project → Analytics
```

### Update Custom Domain (Optional)
```bash
# Configure custom domain in Vercel dashboard
# https://vercel.com/dashboard → project → Settings → Domains
```

### Continuous Deployment
- Any push to Git automatically deploys
- Configure in Vercel dashboard

---

## 🎯 Complete Flow (Copy-Paste Order)

```bash
# 1. Install dependencies
npm install

# 2. Start local server
npm start
# Test at http://localhost:5000
# Press Ctrl+C when done testing

# 3. Install Vercel CLI (one time)
npm install -g vercel

# 4. Login to Vercel (one time)
vercel login

# 5. Deploy to Vercel (Windows)
.\deploy-vercel.bat

# OR Deploy to Vercel (macOS/Linux)
chmod +x deploy-vercel.sh
./deploy-vercel.sh

# 6. View deployment status
vercel logs
```

---

## 💡 Pro Tips

### Tip 1: Test Responsive Design Locally
No need to deploy - test locally in DevTools:
- F12 → Ctrl+Shift+M → Select device width
- Much faster than deploying each time

### Tip 2: Multiple Deployments
You can deploy multiple preview versions:
```bash
vercel --prod    # Production (main URL)
vercel           # Preview (temporary URL)
```

### Tip 3: Skip Build Step (Since Frontend is Static)
Your app is already built - Vercel just serves files:
- No building code needed
- Just upload and deploy

### Tip 4: Environment Variables in Local Dev
Create `.env` file (already exists):
```
MONGO_URI=your_local_mongodb_url
PORT=5000
NODE_ENV=development
```

### Tip 5: Check Logs in Real Time
```bash
vercel logs --tail
```
Shows live logs as requests come in

---

## 🚨 Common Errors & Quick Fixes

| Error | Command to Fix |
|-------|-----------------|
| Port 5000 in use | See "Kill Process" section above |
| Modules not found | `npm install` |
| Broken dependencies | `npm cache clean --force && npm install` |
| Vercel auth failed | `vercel logout && vercel login` |
| Need deployment logs | `vercel logs --tail` |

---

## 📋 Expected Timeframes

| Task | Time |
|------|------|
| `npm install` | 1-2 min |
| Local testing | 2-3 min |
| Mobile testing (DevTools) | 3-5 min |
| Deploy to Vercel | 2-3 min |
| Set environment variables | 1 min |
| Verify production site | 1-2 min |
| **TOTAL** | **~15 minutes** |

---

## ✨ You're Done!

Your responsive, production-ready motorcycle e-commerce is now live! 🎉

**Site URL**: https://your-project-name.vercel.app

**What's included**:
- ✅ Responsive design (mobile → desktop)
- ✅ 3D motorcycle viewer
- ✅ Product filtering & sorting
- ✅ Shopping cart
- ✅ Admin dashboard
- ✅ Dark/light mode
- ✅ Production deployment
- ✅ MongoDB integration

**Next steps**:
1. Share your site URL with friends
2. Monitor analytics in Vercel dashboard
3. Collect user feedback
4. Plan feature enhancements

Enjoy! 🏍️
