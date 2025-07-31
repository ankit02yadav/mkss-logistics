#!/usr/bin/env node

/**
 * MKSS Foundation - Logistics Platform Setup Script
 * Automated setup and environment check for the MKSS Logistics Platform
 */

import { existsSync, copyFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes for better console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  console.log('\n' + '='.repeat(60));
  log(`🏢 ${message}`, 'cyan');
  console.log('='.repeat(60));
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

async function checkNodeVersion() {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 18) {
    logError(`Node.js version 18 or higher is required. Current: ${nodeVersion}`);
    logInfo('Please update Node.js from: https://nodejs.org/');
    return false;
  }
  
  logSuccess(`Node.js version: ${nodeVersion}`);
  return true;
}

async function checkMongoDB() {
  try {
    await execAsync('mongod --version');
    logSuccess('MongoDB is installed');
    return true;
  } catch (error) {
    logWarning('MongoDB not found locally');
    logInfo('You can either:');
    logInfo('1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
    logInfo('2. Use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
    logInfo('3. Update .env file with your MongoDB connection string');
    return false;
  }
}

function setupEnvironment() {
  const envPath = join(__dirname, '.env');
  const envExamplePath = join(__dirname, '.env.example');
  
  if (!existsSync(envPath)) {
    if (existsSync(envExamplePath)) {
      copyFileSync(envExamplePath, envPath);
      logSuccess('.env file created from template');
    } else {
      // Create a basic .env file
      const envContent = `# MKSS Logistics Platform - Development Environment
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mkss-logistics
JWT_SECRET=mkss-logistics-super-secret-jwt-key-for-development-only
CLIENT_URL=http://localhost:5173
`;
      writeFileSync(envPath, envContent);
      logSuccess('.env file created with default values');
    }
  } else {
    logSuccess('.env file already exists');
  }
}

function createDirectories() {
  const directories = ['logs', 'uploads'];
  
  directories.forEach(dir => {
    const dirPath = join(__dirname, dir);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
      logSuccess(`Created ${dir} directory`);
    }
  });
}

function displayStartupInstructions() {
  logHeader('🚀 MKSS Logistics Platform - Ready to Launch!');
  
  log('\n📋 Available Commands:', 'bright');
  log('  npm run mkss:start    - 🚀 Start both frontend and backend', 'cyan');
  log('  npm run mkss:build    - 📦 Build for production', 'cyan');
  log('  npm run mkss:health   - 🏥 Check server health', 'cyan');
  log('  npm run mkss:clean    - 🧹 Clean and reinstall dependencies', 'cyan');
  
  log('\n🌐 Application URLs:', 'bright');
  log('  Frontend:    http://localhost:5173', 'green');
  log('  Backend:     http://localhost:5000', 'green');
  log('  API Health:  http://localhost:5000/api/health', 'green');
  
  log('\n👥 User Roles:', 'bright');
  log('  🏭 MSME      - Create delivery requests, track shipments', 'magenta');
  log('  🚛 Driver    - Manage deliveries, optimize routes', 'magenta');
  log('  🏪 Warehouse - Manage inventory, schedule deliveries', 'magenta');
  
  log('\n🎯 Quick Start:', 'bright');
  log('  1. Make sure MongoDB is running', 'yellow');
  log('  2. Run: npm run mkss:start', 'yellow');
  log('  3. Open: http://localhost:5173', 'yellow');
  log('  4. Register users and start testing!', 'yellow');
  
  log('\n💡 Tips:', 'bright');
  log('  • Use different browsers/incognito for different user roles', 'blue');
  log('  • Check browser console for any errors', 'blue');
  log('  • MongoDB data persists between restarts', 'blue');
  
  console.log('\n' + '='.repeat(60));
  log('🏢 MKSS Foundation - Ethical Logistics for Delhi\'s Industrial Hubs', 'cyan');
  console.log('='.repeat(60) + '\n');
}

async function main() {
  try {
    logHeader('MKSS Logistics Platform Setup');
    
    log('Setting up your ethical logistics platform...', 'bright');
    
    // Check prerequisites
    log('\n🔍 Checking Prerequisites...', 'bright');
    const nodeOk = await checkNodeVersion();
    if (!nodeOk) {
      process.exit(1);
    }
    
    await checkMongoDB();
    
    // Setup environment
    log('\n⚙️  Setting up Environment...', 'bright');
    setupEnvironment();
    createDirectories();
    
    // Check if dependencies are installed
    if (!existsSync(join(__dirname, 'node_modules'))) {
      logWarning('Dependencies not installed. Run: npm install');
    } else {
      logSuccess('Dependencies are installed');
    }
    
    // Display instructions
    displayStartupInstructions();
    
  } catch (error) {
    logError(`Setup failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  log('\n\n👋 Setup interrupted. Run again when ready!', 'yellow');
  process.exit(0);
});

// Run setup
main();