import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import MobileLanding from './components/landing/MobileLanding';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ZodiacProvider } from './context/ZodiacContext';
import { FirebaseProvider } from './context/FirebaseContext';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { auth } from './config/firebase';
import { UserProvider } from './context/UserContext';

const App = () => {
  useEffect(() => {
    // Global error handler for uncaught errors
    const handleError = (error: ErrorEvent) => {
      console.error('Global error:', error);
      // You can add additional error handling logic here
    };

    // Global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      // You can add additional error handling logic here
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  useEffect(() => {
    // Check Firebase initialization
    if (auth) {
      console.log('Firebase Auth is initialized');
      auth.onAuthStateChanged((user) => {
        console.log('Auth state changed:', user ? 'User logged in' : 'No user');
      });
    } else {
      console.error('Firebase Auth is not initialized');
    }
  }, []);

  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <UserProvider>
          <ZodiacProvider>
            <AuthProvider>
              <LanguageProvider>
                <View style={{ flex: 1 }}>
                  {Platform.OS === 'web' ? <AppNavigator /> : <MobileLanding />}
                </View>
              </LanguageProvider>
            </AuthProvider>
          </ZodiacProvider>
        </UserProvider>
      </FirebaseProvider>
    </ErrorBoundary>
  );
};

export default App;