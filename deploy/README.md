# AstroGenie Deployment

This directory contains all the necessary files and scripts to deploy the AstroGenie application in various environments.

## Deployment Options

AstroGenie supports multiple deployment options:

1. **Local Windows Deployment**: Simple deployment for Windows machines
2. **Docker Deployment**: Containerized deployment using Docker and Docker Compose
3. **Google Cloud Platform**: Deployment to Google Cloud Platform (Cloud Run or App Engine)

## Directory Structure

```
deploy/
├── gcp/                    # Google Cloud Platform deployment
│   ├── config/             # GCP configuration files
│   ├── docs/               # GCP deployment documentation
│   ├── scripts/            # GCP deployment scripts
│   └── templates/          # GCP template files
├── logs/                   # Log files directory
├── ssl/                    # SSL certificates directory
├── .dockerignore           # Docker ignore file
├── Dockerfile              # Docker image definition
├── README.md               # This file
├── deploy.bat              # Windows deployment script
├── deploy.sh               # Linux/macOS deployment script
├── docker-compose.prod.yml # Production Docker Compose configuration
├── docker-compose.yml      # Development Docker Compose configuration
├── generate-ssl-cert.bat   # Windows SSL certificate generation script
├── generate-ssl-cert.sh    # Linux/macOS SSL certificate generation script
├── healthcheck.bat         # Windows health check script
├── healthcheck.sh          # Linux/macOS health check script
├── nginx-ssl.conf          # Nginx SSL configuration
├── nginx.conf              # Nginx configuration
└── windows-deploy.bat      # Windows-specific deployment script (no Docker)
```

## Local Windows Deployment

For deploying on Windows machines without Docker:

```bash
deploy\windows-deploy.bat
```

This script will:
1. Set the required environment variables
2. Install dependencies
3. Build the application
4. Serve the application using a local web server

## Docker Deployment

For deploying using Docker:

### Development

```bash
# On Windows
deploy\deploy.bat dev

# On Linux/macOS
chmod +x deploy/deploy.sh
./deploy/deploy.sh dev
```

### Production

```bash
# On Windows
deploy\deploy.bat prod

# On Linux/macOS
chmod +x deploy/deploy.sh
./deploy/deploy.sh prod
```

## Google Cloud Platform Deployment

For deploying to Google Cloud Platform:

### Cloud Run

```bash
# On Windows
deploy\gcp\scripts\deploy-gcp.bat --type cloud-run --project YOUR_PROJECT_ID --region us-central1

# On Linux/macOS
chmod +x deploy/gcp/scripts/deploy-gcp.sh
./deploy/gcp/scripts/deploy-gcp.sh --type cloud-run --project YOUR_PROJECT_ID --region us-central1
```

### App Engine

```bash
# On Windows
deploy\gcp\scripts\deploy-gcp.bat --type app-engine --project YOUR_PROJECT_ID

# On Linux/macOS
chmod +x deploy/gcp/scripts/deploy-gcp.sh
./deploy/gcp/scripts/deploy-gcp.sh --type app-engine --project YOUR_PROJECT_ID
```

For more detailed information about Google Cloud Platform deployment, see [GCP Deployment Documentation](gcp/docs/README.md).

## SSL Configuration

To generate self-signed SSL certificates:

```bash
# On Windows
deploy\generate-ssl-cert.bat

# On Linux/macOS
chmod +x deploy/generate-ssl-cert.sh
./deploy/generate-ssl-cert.sh
```

## Health Checks

To check the health of your deployment:

```bash
# On Windows
deploy\healthcheck.bat

# On Linux/macOS
chmod +x deploy/healthcheck.sh
./deploy/healthcheck.sh
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that `NODE_OPTIONS=--openssl-legacy-provider` is set
   - Ensure all dependencies are correctly installed
   - Verify that the `copy-icon-fonts.js` script is working correctly

2. **Docker Issues**:
   - Ensure Docker and Docker Compose are installed
   - Check that Docker service is running
   - Verify that ports 80/443 are not in use by other services

3. **SSL Issues**:
   - Ensure certificates are generated correctly
   - Check that certificate paths in nginx-ssl.conf are correct
   - Verify that the certificates are trusted by your browser

### Getting Help

If you encounter issues not covered here, please contact the AstroGenie development team for assistance.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [OpenSSL](https://www.openssl.org/) (for SSL certificate generation)

## Configuration

### Environment Variables

You can configure environment variables by uncommenting and modifying the `environment` section in the `docker-compose.yml` file.

### Nginx Configuration

The Nginx configuration is defined in `deploy/nginx.conf`. You can modify this file to adjust server settings, add SSL, etc.

## Accessing the Application

Once deployed, the application will be available at:

- http://localhost (if running locally with HTTP)
- https://localhost (if running locally with HTTPS)
- http://your-server-ip (if running on a remote server with HTTP)
- https://your-server-ip (if running on a remote server with HTTPS)

## Troubleshooting

If you encounter any issues:

1. Check the Docker container logs:
   ```bash
   docker-compose -f deploy/docker-compose.yml logs
   ```

2. Ensure all ports are available (port 80 and 443 are not being used by another service).

3. Verify that Docker and Docker Compose are installed correctly.

4. Make sure the build process completes successfully before attempting to run the container.

5. For SSL issues, check that your certificates are valid and properly configured. 