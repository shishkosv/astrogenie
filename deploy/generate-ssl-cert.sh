#!/bin/bash

# Exit on error
set -e

# Default values
DOMAIN="localhost"
OUTPUT_DIR="./deploy/ssl"
DAYS=365

# Display help message
if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
  echo "Usage: ./deploy/generate-ssl-cert.sh [options]"
  echo ""
  echo "Options:"
  echo "  -h, --help              Show this help message"
  echo "  -d, --domain DOMAIN     Specify domain name (default: $DOMAIN)"
  echo "  -o, --output DIR        Specify output directory (default: $OUTPUT_DIR)"
  echo "  -v, --validity DAYS     Specify validity period in days (default: $DAYS)"
  echo ""
  exit 0
fi

# Process command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -d|--domain)
      DOMAIN="$2"
      shift 2
      ;;
    -o|--output)
      OUTPUT_DIR="$2"
      shift 2
      ;;
    -v|--validity)
      DAYS="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use -h or --help to see available options"
      exit 1
      ;;
  esac
done

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Generate SSL certificate
echo "Generating self-signed SSL certificate for $DOMAIN..."
openssl req -x509 -nodes -days $DAYS -newkey rsa:2048 \
  -keyout "$OUTPUT_DIR/key.pem" \
  -out "$OUTPUT_DIR/cert.pem" \
  -subj "/CN=$DOMAIN" \
  -addext "subjectAltName=DNS:$DOMAIN,DNS:www.$DOMAIN,IP:127.0.0.1"

# Set permissions
chmod 600 "$OUTPUT_DIR/key.pem"
chmod 644 "$OUTPUT_DIR/cert.pem"

echo "SSL certificate generated successfully!"
echo "Certificate: $OUTPUT_DIR/cert.pem"
echo "Private key: $OUTPUT_DIR/key.pem"
echo "Validity: $DAYS days"

# Instructions for trusting the certificate
echo ""
echo "To trust this certificate in your browser:"
echo ""
echo "Chrome/Edge:"
echo "  1. Open chrome://settings/certificates (or edge://settings/certificates)"
echo "  2. Go to 'Authorities' tab"
echo "  3. Click 'Import' and select $OUTPUT_DIR/cert.pem"
echo "  4. Check 'Trust this certificate for identifying websites' and click OK"
echo ""
echo "Firefox:"
echo "  1. Open about:preferences#privacy"
echo "  2. Scroll down to 'Certificates' and click 'View Certificates'"
echo "  3. Go to 'Authorities' tab"
echo "  4. Click 'Import' and select $OUTPUT_DIR/cert.pem"
echo "  5. Check 'Trust this CA to identify websites' and click OK"
echo "" 