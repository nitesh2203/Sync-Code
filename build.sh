#!/bin/bash

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install

# Build the client
npm run build:render
cd ..

echo "Build completed successfully!"
