# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy entire codebase to /app
COPY . .

# Install root dependencies (server)
RUN npm install

# Move to client directory, install dependencies, and build
WORKDIR /app/client
RUN npm install --legacy-peer-deps
RUN npm run build

# Move back to root directory
WORKDIR /app

# Move to server directory and expose the port
EXPOSE 5000

# Start the server
CMD ["node", "server/server.js"]
