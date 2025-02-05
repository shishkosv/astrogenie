# Build the Android app
react-native bundle --entry-file index.js --platform android --dev false --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Build the APK
Set-Location android
./gradlew assembleRelease
Set-Location ..

Write-Host "Android APK built and located at android/app/build/outputs/apk/release/app-release.apk"

