#!/usr/bin/env node

/**
 * MKSS Logistics Platform Startup Script
 * This script helps set up and start the development environment
 */

import { spawn } from 'child_process';
import { existsSync, copyFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 MKSS Logistics Platform Setup');
console.log('=====================================');

// Check if .env file exists
const envPath = join(__dirname, '.env');
const envExamplePath = join(__dirname, '.env.example');

if (!existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  if (existsSync(envExamplePath)) {
    copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created successfully');
    console.log('⚠️  Please update the .env file with your configuration');
  } else {
    console.log('❌ .env.example file not found');
  }
} else {
  console.log('✅ .env file already exists');
}

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.log('❌ Node.js version 18 or higher is required');
  console.log(`   Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js version: ${nodeVersion}`);

// Function to run command
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

// Main setup function
async function setup() {
  try {
    console.log('\n📦 Installing dependencies...');
    await runCommand('npm', ['install']);
    console.log('✅ Dependencies installed successfully');

    console.log('\n🔧 Starting development servers...');
    console.log('   Frontend: http://localhost:5173');
    console.log('   Backend:  http://localhost:5000');
    console.log('   API Health: http://localhost:5000/api/health');
    console.log('\n🛑 Press Ctrl+C to stop the servers\n');

    // Start both frontend and backend
    await runCommand('npm', ['run', 'dev:full']);

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down servers...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Shutting down servers...');
  process.exit(0);
});

// Start setup
setup();