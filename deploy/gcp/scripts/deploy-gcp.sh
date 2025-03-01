#!/bin/bash
# Script to deploy AstroGenie to Google Cloud Platform
# This script supports deployment to Cloud Run or App Engine

set -e

# Default values
DEPLOYMENT_TYPE="cloud-run"
PROJECT_ID=""
REGION="us-central1"
IMAGE_NAME="astrogenie"
SERVICE_NAME="astrogenie"

# Display help message
function show_help {
  echo "Usage: $0 [options]"
  echo ""
  echo "Options:"
  echo "  -t, --type        Deployment type: cloud-run or app-engine (default: cloud-run)"
  echo "  -p, --project     Google Cloud project ID (required)"
  echo "  -r, --region      Google Cloud region (default: us-central1)"
  echo "  -i, --image       Docker image name (default: astrogenie)"
  echo "  -s, --service     Service name (default: astrogenie)"
  echo "  -h, --help        Show this help message"
  echo ""
  echo "Example:"
  echo "  $0 --type cloud-run --project my-gcp-project --region us-central1"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    -t|--type)
      DEPLOYMENT_TYPE="$2"
      shift
      shift
      ;;
    -p|--project)
      PROJECT_ID="$2"
      shift
      shift
      ;;
    -r|--region)
      REGION="$2"
      shift
      shift
      ;;
    -i|--image)
      IMAGE_NAME="$2"
      shift
      shift
      ;;
    -s|--service)
      SERVICE_NAME="$2"
      shift
      shift
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Check required parameters
if [ -z "$PROJECT_ID" ]; then
  echo "Error: Google Cloud project ID is required"
  show_help
  exit 1
fi

# Validate deployment type
if [ "$DEPLOYMENT_TYPE" != "cloud-run" ] && [ "$DEPLOYMENT_TYPE" != "app-engine" ]; then
  echo "Error: Invalid deployment type. Must be 'cloud-run' or 'app-engine'"
  show_help
  exit 1
fi

# Set the Google Cloud project
echo "Setting Google Cloud project to: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"

# Build the application
echo "Building the application..."
cd ../../..
NODE_OPTIONS=--openssl-legacy-provider DISABLE_ESLINT_PLUGIN=true npm run build:web

# Deploy based on the selected type
if [ "$DEPLOYMENT_TYPE" == "cloud-run" ]; then
  echo "Deploying to Cloud Run..."
  
  # Build and push the Docker image
  IMAGE_URL="gcr.io/$PROJECT_ID/$IMAGE_NAME:$(date +%Y%m%d-%H%M%S)"
  echo "Building Docker image: $IMAGE_URL"
  docker build -t "$IMAGE_URL" -f deploy/Dockerfile .
  
  echo "Pushing Docker image to Google Container Registry..."
  docker push "$IMAGE_URL"
  
  echo "Deploying to Cloud Run..."
  gcloud run deploy "$SERVICE_NAME" \
    --image="$IMAGE_URL" \
    --platform=managed \
    --region="$REGION" \
    --allow-unauthenticated \
    --memory=1Gi \
    --cpu=1 \
    --port=80 \
    --set-env-vars=NODE_ENV=production
  
  echo "Deployment to Cloud Run completed successfully!"
  echo "Your application is available at: $(gcloud run services describe "$SERVICE_NAME" --region="$REGION" --format='value(status.url)')"

elif [ "$DEPLOYMENT_TYPE" == "app-engine" ]; then
  echo "Deploying to App Engine..."
  
  # Copy the app.yaml file to the root directory
  cp deploy/gcp/config/app.yaml app.yaml
  
  # Deploy to App Engine
  gcloud app deploy --quiet
  
  # Clean up
  rm app.yaml
  
  echo "Deployment to App Engine completed successfully!"
  echo "Your application is available at: https://$PROJECT_ID.appspot.com"
fi

echo "Deployment process completed!" 