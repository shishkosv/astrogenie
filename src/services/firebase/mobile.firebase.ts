import auth from '@react-native-firebase/auth';
import type { FirebaseService } from './types';

export class MobileFirebaseService implements FirebaseService {
  async initialize() {
    // Mobile Firebase is auto-initialized
  }

  async signIn(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    return auth().signOut();
  }

  getCurrentUser() {
    return auth().currentUser;
  }
} 