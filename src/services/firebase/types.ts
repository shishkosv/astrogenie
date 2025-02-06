export interface FirebaseService {
  initialize(): Promise<void>;
  signIn(email: string, password: string): Promise<any>;
  signOut(): Promise<void>;
  // Add other methods you need
  getCurrentUser(): any;
  // ... other common methods
} 