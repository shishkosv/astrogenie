# Note: This script can't be run directly on Windows. It's for reference when using a Mac or cloud Mac service.
# Build the iOS app
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

# The following commands need to be run on a Mac:
# Archive the app
# xcodebuild -workspace ios/AstroConnect.xcworkspace -scheme AstroConnect -sdk iphoneos -configuration Release archive -archivePath $PWD/build/AstroConnect.xcarchive

# Export the archive
# xcodebuild -exportArchive -archivePath $PWD/build/AstroConnect.xcarchive -exportOptionsPlist ios/ExportOptions.plist -exportPath $PWD/build

Write-Host "iOS app bundle created. Archive and export steps must be performed on a Mac."

