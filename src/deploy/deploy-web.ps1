# Build the web app
npm run build

# Deploy to a web server (example using surge.sh)
# Note: You need to have surge installed globally
npm install -g surge
surge build astroconnect.surge.sh

Write-Host "Web app deployed to https://astroconnect.surge.sh"

