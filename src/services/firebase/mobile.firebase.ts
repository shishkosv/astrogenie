import auth from '@react-native-firebase/auth';
import type { FirebaseService } from './types';
import type { User } from '@react-native-firebase/auth';

export class MobileFirebaseService implements FirebaseService {
  async initialize(): Promise<void> {
    // Mobile Firebase is auto-initialized
  }

  async signIn(email: string, password: string): Promise<User> {
    const result = await auth().signInWithEmailAndPassword(email, password);
    return result.user;
  }

  async signOut(): Promise<void> {
    return auth().signOut();
  }

  getCurrentUser(): User | null {
    return auth().currentUser;
  }
}
