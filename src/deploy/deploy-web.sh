#!/bin/bash

# Build the web app
npm run build

# Deploy to a web server (example using surge.sh)
surge build astroconnect.surge.sh

echo "Web app deployed to https://astroconnect.surge.sh"

