#!/bin/bash

# Build the Android app
react-native bundle --entry-file index.js --platform android --dev false --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Build the APK
cd android && ./gradlew assembleRelease

echo "Android APK built and located at android/app/build/outputs/apk/release/app-release.apk"

