# ✅ Deployment & Responsiveness Checklist

Complete this checklist before deploying to Vercel.

---

## Phase 1: Local Setup & Testing

### Prerequisites
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (optional but recommended)
- [ ] Text editor/IDE open to project folder

### Dependencies Installation
- [ ] Run: `npm install`
- [ ] Check: `node_modules` folder created
- [ ] Check: `package-lock.json` created
- [ ] No error messages in terminal

### Environment Configuration
- [ ] `.env` file exists in root directory
- [ ] `MONGO_URI` is set (local: `mongodb://localhost:27017/moto-showroom` or Atlas)
- [ ] `PORT` is set to `5000`
- [ ] `NODE_ENV` is set to `development`

### Database Setup
- [ ] MongoDB running locally (or MongoDB Atlas account created)
- [ ] Database connection successful (check server.js console)
- [ ] Run: `node seed.js` (optional - populates sample data)
- [ ] MongoDB contains `motorcycles` collection with 10+ documents
- [ ] MongoDB contains `carts` collection (may be empty)

### Local Server Test
- [ ] Run: `npm start`
- [ ] Server starts without errors
- [ ] Console shows: "Server running on http://localhost:5000"
- [ ] Console shows: "MongoDB connected successfully" (or attempted)

### Frontend Testing - Desktop (≥1024px)
- [ ] Open: http://localhost:5000
- [ ] Homepage displays full layout (hero + featured grid)
- [ ] 3D motorcycle viewer loads in hero section
- [ ] Featured products show in 3-column grid
- [ ] Categories display as horizontal cards
- [ ] Features section shows glassmorphism cards
- [ ] Navigation menu is fully visible
- [ ] Footer displays properly

### Frontend Testing - Tablet (768-1024px)
- [ ] DevTools: Toggle device toolbar
- [ ] Set width: 900px
- [ ] Hero section stacks properly
- [ ] Featured products in 2-column grid
- [ ] Navigation still accessible
- [ ] 3D viewer resizes appropriately
- [ ] All text readable without zoom

### Frontend Testing - Mobile (480-768px)
- [ ] DevTools: Set width 600px
- [ ] Hero section: Full width, single column
- [ ] Featured products: Single column grid
- [ ] Navigation: Menu collapses (hamburger menu)
- [ ] 3D viewer: Visible, reduced height (~250px)
- [ ] Buttons: Minimum 44x44 pixels (testable with DevTools)
- [ ] Text: Readable without horizontal scroll
- [ ] Forms: Full width, properly aligned

### Frontend Testing - Small Mobile (<480px)
- [ ] DevTools: Set width 375px
- [ ] All content fits without horizontal scroll
- [ ] Touch targets (buttons): 44px+ height/width
- [ ] Navigation: Hamburger menu opens correctly
- [ ] Images: Properly scaled, not stretched
- [ ] Forms: Single column, full-width inputs
- [ ] Admin table: Card-based layout (if viewing /admin.html)

### Pages Testing

#### Homepage (http://localhost:5000/)
- [ ] Hero section renders
- [ ] 3D viewer loads (may take 5-10 seconds)
- [ ] Featured products display
- [ ] Categories section works
- [ ] Features with icons display
- [ ] Dark/light mode toggle works
- [ ] Local storage saves theme preference

#### Products Page (http://localhost:5000/products.html)
- [ ] Page loads
- [ ] Product list displays
- [ ] Filter sidebar works
- [ ] Filters apply: search, category, price range
- [ ] Sorting works: price ascending/descending
- [ ] Product grid updates on filter change
- [ ] Grid is responsive (3 columns → 2 → 1)
- [ ] Add to cart buttons work
- [ ] Cart displays updated count

#### Admin Page (http://localhost:5000/admin.html)
- [ ] Page loads
- [ ] Admin dashboard displays
- [ ] Stats cards show data
- [ ] Motorcycle table loads with items
- [ ] Edit button opens form
- [ ] Delete button works (confirm dialog)
- [ ] Add motorcycle form works
- [ ] Analytics section displays
- [ ] Mobile view: Table converts to cards

### Functionality Testing
- [ ] Add product to cart from any page
- [ ] View cart from header
- [ ] Update cart quantity
- [ ] Remove item from cart
- [ ] Clear cart
- [ ] Cart persists on page reload (check localStorage)
- [ ] Filter products by category
- [ ] Filter products by price range
- [ ] Search by product name
- [ ] Sort by price (low to high, high to low)
- [ ] 3D viewer controls work:
  - [ ] Orbit/rotate (mouse drag)
  - [ ] Zoom (mouse wheel)
  - [ ] Pan (middle mouse button)

### Performance Testing
- [ ] Homepage loads in <3 seconds
- [ ] Products page loads in <2 seconds
- [ ] Admin page loads in <2 seconds
- [ ] No JavaScript console errors (F12)
- [ ] No failed network requests (DevTools Network tab)
- [ ] 3D model loads (check DevTools Network for .glb file)

### Responsiveness Final Check
- [ ] Test on multiple screen sizes: 320px, 375px, 480px, 600px, 768px, 900px, 1024px, 1920px
- [ ] Verify no horizontal scrolling at any size
- [ ] Check layout breaks at intended breakpoints
- [ ] Verify media queries are working (@480px, @768px, @1024px)

---

## Phase 2: Vercel Setup

### Vercel Account & CLI
- [ ] Create free account at https://vercel.com
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Verify installation: `vercel --version`
- [ ] Login to Vercel: `vercel login`

### Deployment Script
- [ ] `deploy-vercel.sh` exists (macOS/Linux)
- [ ] `deploy-vercel.bat` exists (Windows)
- [ ] Make script executable (Linux/macOS): `chmod +x deploy-vercel.sh`
- [ ] Scripts don't require modification

### Configuration Files
- [ ] `vercel.json` exists with 25+ lines
- [ ] `.env.production` exists with variable templates
- [ ] `package.json` has `build` and `vercel-build` scripts
- [ ] `MONGO_URI` is NOT committed to git (check `.gitignore`)

---

## Phase 3: Vercel Deployment

### Initial Deployment
- [ ] Stop local server (Ctrl+C)
- [ ] **Windows**: Run `.\deploy-vercel.bat` in PowerShell
- [ ] **macOS/Linux**: Run `./deploy-vercel.sh` in terminal
- [ ] Follow interactive prompts
- [ ] Select "Create and deploy" (not import existing)
- [ ] Wait for deployment to complete (~2-3 minutes)
- [ ] Check deployment URL in Vercel dashboard

### Environment Variables in Vercel
1. [ ] Go to Vercel dashboard: https://vercel.com/dashboard
2. [ ] Select your project
3. [ ] Click "Settings" → "Environment Variables"
4. [ ] Add variable: `MONGO_URI`
   - [ ] Value: Your MongoDB Atlas connection string with password
   - [ ] Environments: All selected (Preview, Production, Development)
   - [ ] Save
5. [ ] Add variable: `NODE_ENV`
   - [ ] Value: `production`
   - [ ] Environments: Production only
6. [ ] Add variable: `REACT_APP_API_URL` (if backend is separate)
   - [ ] Value: Your backend API URL (e.g., `https://your-api.railway.app/api`)
   - [ ] Environments: Production only
7. [ ] Add variable: `PORT`
   - [ ] Value: `3000`
   - [ ] Environments: Production only
8. [ ] Save all variables
9. [ ] **Redeploy**: Run `vercel --prod` to apply variables

### Vercel Deployment Verification
- [ ] Deployment status shows "Ready" in Vercel dashboard
- [ ] No deployment errors
- [ ] Check deployment logs: `vercel logs`
- [ ] Visit deployment URL (e.g., `https://moto-showroom.vercel.app`)

---

## Phase 4: Production Testing

### Production Homepage
- [ ] Page loads at deployment URL
- [ ] Hero section renders
- [ ] 3D viewer loads (may take longer in production)
- [ ] Navigation works
- [ ] Dark/light mode toggle works
- [ ] Featured products display

### Production Responsiveness
- [ ] Mobile DevTools test at 375px width
- [ ] Tablet DevTools test at 768px width
- [ ] Desktop at full width
- [ ] No horizontal scrolling
- [ ] Layout matches local testing
- [ ] All images load and scale properly

### Production Functionality
- [ ] Products page loads
- [ ] Filters work
- [ ] Sorting works
- [ ] Add to cart works
- [ ] Cart displays correctly
- [ ] Admin page loads and displays data
- [ ] CRUD operations work (if backend set up)

### Production Performance
- [ ] Homepage loads in <4 seconds
- [ ] No console errors (F12)
- [ ] Network tab shows successful requests
- [ ] Check Lighthouse score:
  - [ ] Performance: >60
  - [ ] Accessibility: >90
  - [ ] Best Practices: >85
  - [ ] SEO: >90

### Custom Domain (Optional)
- [ ] Domain registered (GoDaddy, Namecheap, etc.)
- [ ] Domain DNS updated to Vercel
- [ ] Custom domain configured in Vercel settings
- [ ] HTTPS certificate installed (automatic)
- [ ] Site accessible at custom domain

---

## Phase 5: Backend Deployment (Optional)

Only complete if deploying backend separately from Vercel.

### Backend Platform Choice
- [ ] Selected platform: Heroku / Railway / Render / Other: ______
- [ ] Platform account created
- [ ] Review relevant deployment guide

### MongoDB Atlas Setup
- [ ] MongoDB Atlas account created: https://www.mongodb.com/cloud
- [ ] Cluster created (free tier)
- [ ] Database user created with strong password
- [ ] Network access configured (allow all IPs: 0.0.0.0/0)
- [ ] Connection string copied (contains username, password, cluster)
- [ ] Connection string added to backend `.env`

### Backend Deployment Steps (varies by platform)
- [ ] Code pushed to git repository (if required by platform)
- [ ] Environment variables configured on platform
- [ ] Build command set to: `npm install`
- [ ] Start command set to: `node server.js`
- [ ] Deployment successful
- [ ] Backend URL obtained (e.g., `https://moto-api.railway.app`)

### Frontend Backend URL Update
- [ ] Get backend API URL from deployment platform
- [ ] Update Vercel environment variable:
  - [ ] `REACT_APP_API_URL=https://your-backend-url/api`
- [ ] Redeploy Vercel: `vercel --prod`
- [ ] Verify frontend can connect to backend

---

## Phase 6: Final Verification

### Complete Feature Test
- [ ] Homepage: All sections display
- [ ] Products: Can view, filter, sort
- [ ] Admin: Can view, create, edit, delete motorcycles
- [ ] Cart: Can add, remove, update quantities
- [ ] 3D Viewer: Loads and is interactive
- [ ] Dark mode: Toggles and persists
- [ ] Responsive: Works at all breakpoints
- [ ] Performance: Fast loading times
- [ ] No errors: Console clean (DevTools F12)

### Production Readiness Checklist
- [ ] All content is correct (no Lorem Ipsum)
- [ ] Links are working
- [ ] Forms are functional
- [ ] API calls succeed
- [ ] Database connectivity confirmed
- [ ] Performance is acceptable
- [ ] Mobile layout is pixel-perfect
- [ ] Accessibility is good

### Documentation
- [ ] README.md updated with live URL
- [ ] Deployment instructions documented
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Troubleshooting guide available

---

## Issues & Troubleshooting

### Issue: "Cannot GET /"
**Solution**: 
- Verify `server.js` is running
- Check that `PUBLIC_DIR` points to `./public`
- Ensure `index.html` exists in public folder

### Issue: 3D Viewer Not Loading
**Solution**:
- Check DevTools Network tab for model file
- Verify model path in `three-viewer.js`
- Check console for CORS errors
- Try different model format (.glb preferred)

### Issue: Products/Cart Not Updating
**Solution**:
- Check API_BASE in `app.js`
- Verify MongoDB connection
- Check DevTools Network tab for API calls
- Review server console for errors

### Issue: Mobile Layout Broken
**Solution**:
- Check viewport meta tag in HTML
- Verify media queries in CSS
- Test with DevTools device emulation
- Review CSS at breakpoints: 480px, 768px, 1024px

### Issue: Vercel Deployment Failed
**Solution**:
- Run `vercel logs` to see detailed errors
- Verify Node.js version compatible
- Check environment variables are set
- Ensure all dependencies in package.json
- Verify `vercel.json` syntax is valid

---

## Sign-Off

Once all items are checked, your application is production-ready!

- [ ] All phases complete
- [ ] All tests passing
- [ ] Production site live and verified
- [ ] Team notified of launch

**Deployment Date**: _______________

**Production URL**: _______________

**Backend API URL**: _______________ (if separate)

---

**Next Steps:**
1. Monitor application performance using Vercel Analytics
2. Set up error logging (optional: Sentry)
3. Plan feature enhancements based on user feedback
4. Schedule regular security updates

Good luck! 🚀
