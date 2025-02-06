import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseService } from './types';

export class WebFirebaseService implements FirebaseService {
  private auth: any;

  async initialize() {
    const firebaseConfig = {
      // Your web Firebase config
    };
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signOut() {
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
} 