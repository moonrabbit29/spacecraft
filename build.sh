#!/bin/bash

# Stop on error
set -e

echo "Starting SvelteKit build and deploy..."

# 1. Install dependencies
echo "Installing dependencies..."
npm install

# 2. Build SvelteKit app
echo "Building the project..."
npm run build

# 3. Start app

echo "🔄 Restarting app with pm2..."
pm2 delete spaceraft || true
pm2 start build/index.js --name spaceraft

echo "✅ Done!"
