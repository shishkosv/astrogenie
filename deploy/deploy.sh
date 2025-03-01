#!/bin/bash

# Exit on error
set -e

# Move to the project root directory
cd "$(dirname "$0")/.."

# Display help message
if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
  echo "Usage: ./deploy/deploy.sh [options]"
  echo ""
  echo "Options:"
  echo "  -h, --help     Show this help message"
  echo "  -b, --build    Build the Docker image"
  echo "  -r, --run      Run the Docker container"
  echo "  -s, --stop     Stop the Docker container"
  echo "  -d, --deploy   Build and run the Docker container"
  echo ""
  exit 0
fi

# Build the Docker image
build_image() {
  echo "Building Docker image..."
  docker-compose -f deploy/docker-compose.yml build
  echo "Docker image built successfully!"
}

# Run the Docker container
run_container() {
  echo "Starting Docker container..."
  docker-compose -f deploy/docker-compose.yml up -d
  echo "Docker container started successfully!"
  echo "The application is now running at http://localhost"
}

# Stop the Docker container
stop_container() {
  echo "Stopping Docker container..."
  docker-compose -f deploy/docker-compose.yml down
  echo "Docker container stopped successfully!"
}

# Process command line arguments
if [ "$1" == "-b" ] || [ "$1" == "--build" ]; then
  build_image
elif [ "$1" == "-r" ] || [ "$1" == "--run" ]; then
  run_container
elif [ "$1" == "-s" ] || [ "$1" == "--stop" ]; then
  stop_container
elif [ "$1" == "-d" ] || [ "$1" == "--deploy" ] || [ -z "$1" ]; then
  build_image
  run_container
else
  echo "Unknown option: $1"
  echo "Use -h or --help to see available options"
  exit 1
fi 