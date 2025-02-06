import { Platform } from 'react-native';
import { FirebaseService } from './types';
import { WebFirebaseService } from './web.firebase';
import { MobileFirebaseService } from './mobile.firebase';

export const createFirebaseService = (): FirebaseService => {
  if (Platform.OS === 'web') {
    return new WebFirebaseService();
  }
  return new MobileFirebaseService();
};

// Export a singleton instance
export const firebaseService = createFirebaseService(); 