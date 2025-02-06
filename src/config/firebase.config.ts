import { Platform } from 'react-native';

export const getFirebaseConfig = () => {
  if (Platform.OS === 'web') {
    return {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      // ... other web config
    };
  }

  return {
    // Mobile config if needed
    // Note: Usually not needed as google-services.json/GoogleService-Info.plist handles this
  };
};
