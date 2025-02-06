import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseService } from '../services/firebase';
import { useFirebase } from './FirebaseContext';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useFirebase();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await firebaseService.signIn(email, password);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      // Create the user
      const userCredential = await firebaseService.signUp(email, password);
      
      if (!userCredential.user) {
        throw new Error('Failed to create user account');
      }

      // Add user data to Firestore
      await firebaseService.createUserProfile(userCredential.user.uid, userData);
      
    } catch (err: any) {
      console.error('Auth error:', err);
      
      // Handle specific Firebase errors
      switch (err.code) {
        case 'auth/email-already-in-use':
          throw new Error('Email is already registered. Please login instead.');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address.');
        case 'auth/operation-not-allowed':
          throw new Error('Email/password accounts are not enabled. Please contact support.');
        case 'auth/weak-password':
          throw new Error('Password should be at least 6 characters.');
        default:
          throw new Error(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await firebaseService.signOut();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await firebaseService.resetPassword(email);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        login,
        register,
        logout,
        resetPassword,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
