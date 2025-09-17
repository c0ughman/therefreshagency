#!/bin/bash

echo "🧹 Cleaning Next.js development environment..."

# Kill any running Next.js processes
echo "Stopping any running Next.js processes..."
pkill -f "next dev" 2>/dev/null || true

# Clear Next.js cache
echo "Clearing .next cache..."
rm -rf .next

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Start development server
echo "Starting development server..."
npm run dev
