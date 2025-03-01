#!/bin/bash

# Exit on error
set -e

# Default values
CONTAINER_NAME="astrogenie-web"
HOST="localhost"
PORT="80"
TIMEOUT=5

# Display help message
if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
  echo "Usage: ./deploy/healthcheck.sh [options]"
  echo ""
  echo "Options:"
  echo "  -h, --help              Show this help message"
  echo "  -c, --container NAME    Specify container name (default: $CONTAINER_NAME)"
  echo "  -H, --host HOST         Specify host (default: $HOST)"
  echo "  -p, --port PORT         Specify port (default: $PORT)"
  echo "  -t, --timeout SECONDS   Specify timeout in seconds (default: $TIMEOUT)"
  echo ""
  exit 0
fi

# Process command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -c|--container)
      CONTAINER_NAME="$2"
      shift 2
      ;;
    -H|--host)
      HOST="$2"
      shift 2
      ;;
    -p|--port)
      PORT="$2"
      shift 2
      ;;
    -t|--timeout)
      TIMEOUT="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use -h or --help to see available options"
      exit 1
      ;;
  esac
done

# Check if container is running
echo "Checking if container $CONTAINER_NAME is running..."
if ! docker ps | grep -q $CONTAINER_NAME; then
  echo "Container $CONTAINER_NAME is not running!"
  exit 1
fi

# Check if container is healthy
echo "Checking container health..."
CONTAINER_STATUS=$(docker inspect --format='{{.State.Status}}' $CONTAINER_NAME)
if [ "$CONTAINER_STATUS" != "running" ]; then
  echo "Container $CONTAINER_NAME is not healthy! Status: $CONTAINER_STATUS"
  exit 1
fi

# Check if application is responding
echo "Checking if application is responding at http://$HOST:$PORT..."
if ! curl -s --head --request GET --connect-timeout $TIMEOUT http://$HOST:$PORT | grep -q "200 OK\|301 Moved Permanently"; then
  echo "Application is not responding!"
  exit 1
fi

echo "Health check passed! Container $CONTAINER_NAME is running and application is responding."
exit 0 