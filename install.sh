#!/bin/bash

set -e  # Exit on any error

echo "Cleaning npm cache..."
npm cache clean --force

echo "Installing root modules with verbose output..."
npm install --legacy-peer-deps --verbose

echo "Switching to client directory..."
cd client

echo "Cleaning npm cache in client directory..."
npm cache clean --force

echo "Installing client modules with verbose output..."
npm install --legacy-peer-deps --verbose

echo "Modules installation and cache cleanup completed!"
