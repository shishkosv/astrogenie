import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const firebaseService = {
  // Auth methods
  async signUp(email: string, password: string) {
    try {
      if (!auth) {
        throw new Error('Firebase Auth is not initialized');
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user.uid);
      return userCredential;
    } catch (error: any) {
      console.error('Firebase signUp error:', error);
      if (error.code === 'auth/configuration-not-found') {
        console.error('Firebase configuration is missing or incorrect');
      }
      throw error;
    }
  },

  async signIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  },

  async signOut() {
    await signOut(auth);
  },

  async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  },

  async createUserProfile(userId: string, userData: any) {
    try {
      if (!db) {
        throw new Error('Firebase Firestore is not initialized');
      }
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      console.log('User profile created successfully');
    } catch (error) {
      console.error('Firebase createUserProfile error:', error);
      throw error;
    }
  },

  // Firestore methods
  async getUserData(userId: string) {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  async updateUserData(userId: string, data: any) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data);
  },
}; 