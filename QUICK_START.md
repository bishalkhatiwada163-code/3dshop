# 🚀 QUICK START GUIDE

## One-Minute Setup

### 1. Install Node Packages
```bash
npm install
```

### 2. Start MongoDB (if local)
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 3. Run Seed Script (Optional - populate sample data)
```bash
node seed.js
```

### 4. Start Server
```bash
npm start
```
Server runs on `http://localhost:5000`

### 5. Open in Browser
- **Home**: http://localhost:5000
- **Shop**: http://localhost:5000/products.html
- **Admin**: http://localhost:5000/admin.html

---

## Windows Installation (Step-by-Step)

### Install Node.js
1. Download from https://nodejs.org/
2. Run installer, click "Next" through all steps
3. Open PowerShell and verify: `node --version`

### Install MongoDB (Option 1: Local)
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. Start MongoDB: `net start MongoDB`

### Install MongoDB (Option 2: Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env`:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/moto-showroom
```

### Setup Project
```powershell
# Navigate to project folder
cd "path\to\moto bike\"

# Install dependencies
npm install

# Run seed data
node seed.js

# Start server
npm start
```

---

## macOS Installation

### Install Node.js
```bash
# Using Homebrew
brew install node

# Verify
node --version
```

### Install MongoDB (Option 1: Local)
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Setup Project
```bash
cd /path/to/moto\ bike
npm install
node seed.js
npm start
```

---

## Linux Installation (Ubuntu/Debian)

### Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install MongoDB
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Setup Project
```bash
cd /path/to/moto-bike
npm install
node seed.js
npm start
```

---

## Troubleshooting

### "Port 5000 already in use"
```bash
# Change port in .env
PORT=3000

# Or kill process using port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### "MongoDB connection refused"
- Make sure MongoDB is running
- Check MONGO_URI is correct
- For local: `mongodb://localhost:27017/moto-showroom`
- For Atlas: Verify username/password and IP whitelist

### "Cannot find module 'express'"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### "3D Models not loading"
- Models go in `public/models/` folder
- Only .glb format supported
- Check browser console for errors (F12)

---

## Development Mode (Auto-reload)

```bash
npm install -g nodemon
npm run dev
```

---

## Sample Data

After running `node seed.js`, the database will have:
- 10 sample motorcycles
- Multiple categories (sport, cruiser, touring, offroad, adventure)
- Price range from $4,199 to $24,300
- Full specifications for each bike

---

## Next Steps

1. **Add Your Brand Logo**
   - Replace "⚡ MotoShowroom" in navbar with your logo
   - Edit `public/index.html` line ~38

2. **Customize Colors**
   - Edit `public/style.css` (lines 9-24)
   - Change CSS variables to match your brand

3. **Add 3D Models**
   - Download from https://www.meshy.ai
   - Save to `public/models/`
   - Add motorcycle via admin panel

4. **Deploy Online**
   - See README.md for deployment options
   - Recommended: Heroku (backend) + Vercel (frontend)

---

**Ready? Start with `npm start`! 🚀**
