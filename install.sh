#!/bin/bash

set -e  # Exit on any error

echo "Installing root modules with verbose output..."
NPM_CONFIG_PRODUCTION=true npm install --legacy-peer-deps --verbose

echo "Installing client modules with verbose output..."
NPM_CONFIG_PRODUCTION=true npm install --legacy-peer-deps --verbose --prefix client

echo "Modules installation and cache cleanup completed!"
