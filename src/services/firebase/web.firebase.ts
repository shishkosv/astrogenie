import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, User, Auth } from 'firebase/auth';
import { FirebaseService } from './types';

export class WebFirebaseService implements FirebaseService {
  private auth: Auth;

  async initialize(): Promise<void> {
    const firebaseConfig = {
      // Your web Firebase config
    };
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  async signIn(email: string, password: string): Promise<User> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return result.user;
  }

  async signOut(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
