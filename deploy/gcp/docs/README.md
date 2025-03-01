# AstroGenie Google Cloud Platform Deployment

This directory contains all the necessary files and scripts to deploy the AstroGenie application to Google Cloud Platform (GCP).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Directory Structure](#directory-structure)
- [Deployment Options](#deployment-options)
  - [Cloud Run](#cloud-run)
  - [App Engine](#app-engine)
- [Continuous Integration/Continuous Deployment](#continuous-integrationcontinuous-deployment)
- [Monitoring and Logging](#monitoring-and-logging)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying to Google Cloud Platform, ensure you have the following:

1. **Google Cloud Account**: Create an account at [cloud.google.com](https://cloud.google.com)
2. **Google Cloud SDK**: Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install)
3. **Docker** (for Cloud Run): Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
4. **Node.js and npm**: Required for building the application
5. **Project Setup**:
   - Create a GCP project
   - Enable the required APIs:
     - Cloud Run API
     - App Engine API
     - Container Registry API
     - Cloud Build API

## Directory Structure

```
deploy/gcp/
├── config/                 # Configuration files
│   ├── app.yaml            # App Engine configuration
│   ├── cloudbuild.yaml     # Cloud Build configuration
│   └── nginx-gcp.conf      # Nginx configuration for GCP
├── docs/                   # Documentation
│   └── README.md           # This file
├── scripts/                # Deployment scripts
│   ├── deploy-gcp.bat      # Windows deployment script
│   └── deploy-gcp.sh       # Linux/macOS deployment script
└── templates/              # Template files
    └── Dockerfile.cloudrun # Dockerfile optimized for Cloud Run
```

## Deployment Options

AstroGenie can be deployed to GCP using either Cloud Run or App Engine.

### Cloud Run

Cloud Run is a fully managed platform that automatically scales stateless containers. It's ideal for containerized applications that need to scale quickly.

#### Deployment Steps

1. **Authenticate with Google Cloud**:
   ```bash
   gcloud auth login
   ```

2. **Run the deployment script**:
   
   On Windows:
   ```bash
   deploy\gcp\scripts\deploy-gcp.bat --type cloud-run --project YOUR_PROJECT_ID --region us-central1
   ```
   
   On Linux/macOS:
   ```bash
   chmod +x deploy/gcp/scripts/deploy-gcp.sh
   ./deploy/gcp/scripts/deploy-gcp.sh --type cloud-run --project YOUR_PROJECT_ID --region us-central1
   ```

3. **Access your application**:
   After deployment, the script will output the URL where your application is accessible.

### App Engine

App Engine is a fully managed, serverless platform for developing and hosting web applications. It's simpler to deploy but offers less customization than Cloud Run.

#### Deployment Steps

1. **Authenticate with Google Cloud**:
   ```bash
   gcloud auth login
   ```

2. **Run the deployment script**:
   
   On Windows:
   ```bash
   deploy\gcp\scripts\deploy-gcp.bat --type app-engine --project YOUR_PROJECT_ID
   ```
   
   On Linux/macOS:
   ```bash
   chmod +x deploy/gcp/scripts/deploy-gcp.sh
   ./deploy/gcp/scripts/deploy-gcp.sh --type app-engine --project YOUR_PROJECT_ID
   ```

3. **Access your application**:
   After deployment, your application will be available at `https://YOUR_PROJECT_ID.appspot.com`

## Continuous Integration/Continuous Deployment

For automated CI/CD, you can use Cloud Build with the provided `cloudbuild.yaml` configuration.

1. **Connect your repository to Cloud Build**:
   - Go to Cloud Build in the GCP Console
   - Connect your repository (GitHub, Bitbucket, or Cloud Source Repositories)

2. **Create a trigger**:
   - Create a new trigger that uses the `deploy/gcp/config/cloudbuild.yaml` file
   - Configure it to trigger on push to your main branch or on tag creation

## Monitoring and Logging

- **Cloud Run Monitoring**:
  - Access metrics in the Cloud Run console
  - Set up alerts for high CPU usage, memory usage, or error rates

- **App Engine Monitoring**:
  - Access metrics in the App Engine console
  - View application logs in Cloud Logging

- **Logging**:
  - All logs are automatically sent to Cloud Logging
  - Access logs through the GCP Console or using the gcloud CLI:
    ```bash
    gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=astrogenie"
    ```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that `NODE_OPTIONS=--openssl-legacy-provider` is set
   - Ensure all dependencies are correctly installed
   - Verify that the `copy-icon-fonts.js` script is working correctly

2. **Deployment Failures**:
   - Verify that the required APIs are enabled
   - Check that you have the necessary permissions
   - Ensure Docker is running (for Cloud Run)

3. **Runtime Errors**:
   - Check the application logs in Cloud Logging
   - Verify that environment variables are correctly set
   - Test the application locally before deployment

### Getting Help

If you encounter issues not covered here, please:

1. Check the [Google Cloud documentation](https://cloud.google.com/docs)
2. Review the error messages in the deployment logs
3. Contact the AstroGenie development team for assistance 