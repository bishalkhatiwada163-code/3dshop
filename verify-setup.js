#!/usr/bin/env node

/**
 * 🏍️ MotoShowroom - Verification Script
 * 
 * This script verifies that your MotoShowroom project is properly set up
 * and ready to run.
 * 
 * Run: node verify-setup.js
 */

const fs = require('fs');
const path = require('path');

// ============================================
// COLORS FOR TERMINAL OUTPUT
// ============================================

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) { log(`✓ ${message}`, 'green'); }
function error(message) { log(`✕ ${message}`, 'red'); }
function warning(message) { log(`⚠ ${message}`, 'yellow'); }
function info(message) { log(`ℹ ${message}`, 'cyan'); }

// ============================================
// VERIFICATION FUNCTIONS
// ============================================

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    success(`Found: ${description}`);
    return true;
  } else {
    error(`Missing: ${description} (${filePath})`);
    return false;
  }
}

function checkDirectory(dirPath, description) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    success(`Found: ${description} directory`);
    return true;
  } else {
    error(`Missing: ${description} directory (${dirPath})`);
    return false;
  }
}

function checkNodeModule(moduleName) {
  try {
    require(moduleName);
    success(`Installed: ${moduleName}`);
    return true;
  } catch (e) {
    error(`Missing: ${moduleName} (run: npm install)`);
    return false;
  }
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const sizeInBytes = stats.size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    return `${sizeInKB} KB`;
  } catch {
    return 'N/A';
  }
}

// ============================================
// MAIN VERIFICATION
// ============================================

console.clear();
log('\n🏍️ MotoShowroom - Project Verification\n', 'blue');
log('=' .repeat(50), 'blue');

let passed = 0, failed = 0, total = 0;

// 1. Check Backend Files
log('\n📦 Backend Files', 'cyan');
log('-'.repeat(50));

const backendFiles = [
  { path: 'server.js', desc: 'Express server' },
  { path: 'package.json', desc: 'Dependencies' },
  { path: '.env', desc: 'Environment config' },
  { path: '.gitignore', desc: 'Git ignore' },
  { path: 'seed.js', desc: 'Database seeder' }
];

backendFiles.forEach(file => {
  total++;
  if (checkFile(file.path, file.desc)) passed++;
  else failed++;
});

// 2. Check Core Files (flattened workspace structure)
log('\n📁 Core Files', 'cyan');
log('-'.repeat(50));

const coreFiles = [
  { path: 'server.js', desc: 'Express server' },
  { path: 'package.json', desc: 'Package configuration' },
  { path: 'vercel.json', desc: 'Vercel configuration' }
];

coreFiles.forEach(file => {
  total++;
  if (checkFile(file.path, file.desc)) passed++;
  else failed++;
});

// 3. Check Model Files
log('\n🗄️ Database Models', 'cyan');
log('-'.repeat(50));

const modelFiles = [
  { path: 'MotorcycleModel.js', desc: 'Motorcycle schema' },
  { path: 'CartModel.js', desc: 'Cart schema' }
];

modelFiles.forEach(file => {
  total++;
  if (checkFile(file.path, file.desc)) passed++;
  else failed++;
});

// 4. Check Controller Files
log('\n⚙️  Controllers', 'cyan');
log('-'.repeat(50));

const controllerFiles = [
  { path: 'motorcycleController.js', desc: 'Motorcycle controller' },
  { path: 'cartController.js', desc: 'Cart controller' }
];

controllerFiles.forEach(file => {
  total++;
  if (checkFile(file.path, file.desc)) passed++;
  else failed++;
});

// 5. Check Routes
log('\n🔌 API Routes', 'cyan');
log('-'.repeat(50));

const routeFiles = [
  { path: 'motorcycles.js', desc: 'Motorcycle routes' },
  { path: 'cart.js', desc: 'Cart routes' }
];

routeFiles.forEach(file => {
  total++;
  if (checkFile(file.path, file.desc)) passed++;
  else failed++;
});

// 6. Check Frontend Files
log('\n🎨 Frontend Files', 'cyan');
log('-'.repeat(50));

const frontendFiles = [
  { path: 'index.html', desc: 'Homepage' },
  { path: 'products.html', desc: 'Products page' },
  { path: 'admin.html', desc: 'Admin panel' },
  { path: 'style.css', desc: 'Stylesheet' },
  { path: 'app.js', desc: 'App logic' },
  { path: 'three-viewer.js', desc: '3D viewer' },
  { path: 'products.js', desc: 'Products logic' },
  { path: 'admin.js', desc: 'Admin logic' }
];

frontendFiles.forEach(file => {
  total++;
  if (checkFile(file.path, file.desc)) passed++;
  else failed++;
});

// 7. Check Documentation
log('\n📚 Documentation', 'cyan');
log('-'.repeat(50));

const docFiles = [
  { path: 'README.md', desc: 'Main README' },
  { path: 'QUICK_START.md', desc: 'Quick start guide' },
  { path: 'API_DOCUMENTATION.md', desc: 'API docs' },
  { path: 'DEPLOYMENT_GUIDE.md', desc: 'Deployment guide' },
  { path: 'FEATURES_GUIDE.md', desc: 'Features guide' },
  { path: 'GETTING_STARTED.md', desc: 'Getting started' }
];

docFiles.forEach(file => {
  total++;
  if (checkFile(file.path, file.desc)) passed++;
  else failed++;
});

// 8. Check Node Modules
log('\n📦 Node Dependencies', 'cyan');
log('-'.repeat(50));

const dependencies = [
  'express',
  'mongoose',
  'cors',
  'dotenv'
];

let allDepsInstalled = true;
dependencies.forEach(dep => {
  total++;
  if (checkNodeModule(dep)) passed++;
  else {
    failed++;
    allDepsInstalled = false;
  }
});

// 9. File Statistics
log('\n📊 Project Statistics', 'cyan');
log('-'.repeat(50));

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  info(`Node Version: ${packageJson.engines?.node || 'Not specified'}`);
  info(`Project Name: ${packageJson.name}`);
  info(`Project Version: ${packageJson.version}`);
  info(`Entry Point: ${packageJson.main}`);
} catch (e) {
  warning('Could not read package.json');
}

// Frontend file sizes
log('\nFrontend File Sizes:', 'yellow');
const cssSize = getFileSize('style.css');
const appSize = getFileSize('app.js');
info(`  style.css: ${cssSize}`);
info(`  app.js: ${appSize}`);

// 10. Configuration Check
log('\n⚙️  Configuration', 'cyan');
log('-'.repeat(50));

if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  if (envContent.includes('MONGO_URI')) {
    success('MONGO_URI configured');
  } else {
    warning('MONGO_URI not found in .env');
  }
  if (envContent.includes('PORT')) {
    success('PORT configured');
  }
} else {
  error('.env file not found');
}

// 11. Ready to Run?
log('\n🚀 Ready to Run?', 'cyan');
log('-'.repeat(50));

if (allDepsInstalled) {
  success('All dependencies installed');
} else {
  warning('Run: npm install');
}

if (fs.existsSync('.env')) {
  success('.env file exists');
} else {
  warning('Create .env file (template provided)');
}

// ============================================
// FINAL SUMMARY
// ============================================

log('\n' + '='.repeat(50), 'blue');
log(`\n📋 VERIFICATION SUMMARY\n`);
log(`  Total Checks: ${total}`);
log(`  ${colors.green}✓ Passed: ${passed}${colors.reset}`);
log(`  ${colors.red}✕ Failed: ${failed}${colors.reset}`);

const percentage = ((passed / total) * 100).toFixed(1);
log(`  Score: ${percentage}%`);

if (failed === 0) {
  log('\n🎉 Project is ready to go!', 'green');
  log('\nNext steps:');
  info('1. Verify .env has correct MONGO_URI');
  info('2. Run: npm start');
  info('3. Open: http://localhost:5000');
  info('4. Check QUICK_START.md for detailed instructions');
} else {
  log('\n⚠️  Some files are missing', 'yellow');
  log('\nCheck the errors above and:');
  warning('1. Create missing files/directories');
  warning('2. Run: npm install (if dependencies missing)');
  warning('3. Review project structure in README.md');
}

log('\n' + '='.repeat(50) + '\n', 'blue');

// Exit with appropriate code
process.exit(failed === 0 ? 0 : 1);
