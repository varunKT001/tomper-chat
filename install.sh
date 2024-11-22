#!/bin/bash

set -e  # Exit on any error

echo "Installing pnpm using npm..."
npm install -g pnpm

echo "Installing root modules with verbose output..."
pnpm install

echo "Installing client modules with verbose output..."
pnpm --dir client install

echo "Modules installation and cache cleanup completed!"
