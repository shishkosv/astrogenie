#!/bin/bash

# Build the iOS app
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

# Archive the app
xcodebuild -workspace ios/AstroConnect.xcworkspace -scheme AstroConnect -sdk iphoneos -configuration Release archive -archivePath $PWD/build/AstroConnect.xcarchive

# Export the archive
xcodebuild -exportArchive -archivePath $PWD/build/AstroConnect.xcarchive -exportOptionsPlist ios/ExportOptions.plist -exportPath $PWD/build

echo "iOS app built and exported to $PWD/build"

