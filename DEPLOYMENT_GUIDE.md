# 🌍 DEPLOYMENT GUIDE

## Prerequisites

- GitHub account (for version control)
- Credit card (for cloud hosting providers)
- Domain name (optional but recommended)

---

## Option 1: Deploy to Heroku (Recommended for Beginners)

### Prerequisites
- Heroku account (https://www.heroku.com)
- Git installed

### Step 1: Prepare Project

```bash
# Create .env for production
echo "MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/moto-showroom" >> .env.production
echo "NODE_ENV=production" >> .env.production
```

### Step 2: Create Heroku App

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-moto-showroom

# Add MongoDB Atlas connection
heroku config:set MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/moto-showroom
```

### Step 3: Deploy

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Deploy to Heroku
git push heroku main
```

### Step 4: Verify

```bash
heroku logs --tail
heroku open
```

---

## Option 2: Deploy to AWS (Scalable)

### Using EC2

1. **Create EC2 Instance**
   - Go to AWS Console
   - Launch EC2 instance (Ubuntu 20.04)
   - Configure security groups (ports 80, 443, 5000)
   - Create key pair

2. **Connect & Setup**

```bash
# SSH into instance
ssh -i "your-key.pem" ubuntu@your-instance-ip

# Install Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/your-repo.git
cd moto-bike

# Install dependencies
npm install

# Install MongoDB Atlas CLI
npm install -g mongodb-cli

# Create .env
nano .env
# Add:
# MONGO_URI=mongodb+srv://...
# PORT=5000
```

3. **Install PM2 (Process Manager)**

```bash
sudo npm install -g pm2

# Start application
pm2 start server.js --name "moto-showroom"

# Auto-start on reboot
pm2 startup
pm2 save
```

4. **Setup Nginx Reverse Proxy**

```bash
sudo apt-get install nginx

# Create config
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Restart Nginx
sudo systemctl restart nginx
```

5. **Add SSL Certificate (Let's Encrypt)**

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Option 3: Deploy to Google Cloud Platform

### Using Cloud Run

1. **Setup Google Cloud CLI**

```bash
curl https://sdk.cloud.google.com | bash
gcloud auth login
gcloud config set project your-project-id
```

2. **Create Dockerfile**

```dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

3. **Build & Deploy**

```bash
# Build image
gcloud builds submit --tag gcr.io/your-project-id/moto-showroom

# Deploy to Cloud Run
gcloud run deploy moto-showroom \
  --image gcr.io/your-project-id/moto-showroom \
  --platform managed \
  --region us-central1 \
  --set-env-vars MONGO_URI=mongodb+srv://...
```

---

## Option 4: Deploy Frontend to Vercel (Recommended)

### Step 1: Setup

```bash
npm install -g vercel
vercel login
```

### Step 2: Deploy

```bash
cd public
vercel
```

### Step 3: Configure

In `vercel.json`:
```json
{
  "buildCommand": "echo 'Frontend only'",
  "outputDirectory": ".",
  "env": {
    "REACT_APP_API_URL": "@api-url"
  }
}
```

Update `public/app.js`:
```javascript
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

## Option 5: Deploy to DigitalOcean (Budget-Friendly)

### Step 1: Create Droplet

1. Go to DigitalOcean Console
2. Create new Droplet (Ubuntu 20.04)
3. Select $5/month plan
4. Add SSH key

### Step 2: Setup

```bash
# Connect
ssh root@your-droplet-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup app
git clone https://github.com/your-repo.git
cd moto-bike
npm install
```

### Step 3: Use PM2

```bash
sudo npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

### Step 4: Setup Nginx

```bash
sudo apt-get install -y nginx
```

---

## Environment Variables for Production

Create `.env.production`:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/moto-showroom

# Server
PORT=5000
NODE_ENV=production

# Security
JWT_SECRET=your-super-secret-key-change-this

# CORS
FRONTEND_URL=https://yourdomain.com

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# AWS S3 (for images/models - optional)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket
```

---

## Domain Setup

### Register Domain
1. Go to GoDaddy, Namecheap, or Route53
2. Register your domain
3. Get nameservers

### Update DNS

For Heroku:
```
DNS Target: your-app.herokuapp.com
```

For AWS/DigitalOcean:
```
A Record: your.ip.address
CNAME Record: www -> your-domain.com
```

---

## Performance Optimization

### 1. Enable Compression

```javascript
// server.js
const compression = require('compression');
app.use(compression());
```

### 2. Minify Frontend

```bash
npm install -g terser
terser public/app.js -o public/app.min.js
```

### 3. Setup CDN

Use CloudFront (AWS) or Cloudflare:
1. Add your domain to Cloudflare
2. Update nameservers
3. Enable caching rules

### 4. Database Optimization

```javascript
// Add indexes
motorcycleSchema.index({ category: 1 });
motorcycleSchema.index({ price: 1 });
motorcycleSchema.index({ brand: 1 });
```

---

## Monitoring & Logging

### Cloud Logging

```bash
# View logs in Heroku
heroku logs --tail

# View logs in AWS CloudWatch
aws logs tail /aws/lambda/moto-showroom --follow
```

### Uptime Monitoring

Use services like:
- UptimeRobot (free)
- Pingdom
- New Relic

---

## Backup Strategy

### MongoDB Backup

```bash
# Create backup
mongodump --uri="mongodb+srv://..." --out ./backup

# Restore backup
mongorestore ./backup
```

### GitHub Backup

```bash
git push origin main
```

---

## SSL/HTTPS

### Let's Encrypt (Free)

```bash
sudo certbot certonly --standalone -d yourdomain.com
```

### AWS Certificate Manager

- Go to AWS Console
- Select Certificate Manager
- Request public certificate
- Verify domain
- Attach to load balancer

---

## Troubleshooting Deployment

### "Cannot connect to database"
- Verify MONGO_URI environment variable
- Check MongoDB Atlas IP whitelist
- Test connection string locally

### "Port already in use"
- Change PORT in .env
- Kill process: `lsof -i :5000`

### "Timeout errors"
- Increase timeout: `server.setTimeout(60000)`
- Check database performance
- Review application logs

### "Slow response time"
- Enable compression
- Add CDN
- Optimize database queries
- Use caching

---

## Monitoring Checklist

- [ ] SSL certificate installed
- [ ] Database backups enabled
- [ ] Error logging configured
- [ ] Uptime monitoring active
- [ ] Performance metrics tracked
- [ ] Security headers set
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Database indexes created
- [ ] Deploy automation setup

---

**Deployment Complete! 🎉**
