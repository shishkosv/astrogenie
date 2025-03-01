# Use Node.js LTS as the base image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Set environment variable to fix OpenSSL issues with newer Node.js versions
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Run the icon font copy script
RUN node copy-icon-fonts.js

# Build the application for production
RUN npm run build:web

# Production stage
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Copy our custom nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"] 