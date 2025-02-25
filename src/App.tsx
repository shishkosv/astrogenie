import React, { useEffect } from 'react';
import { View, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import MobileLanding from './components/landing/MobileLandingScreen';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ZodiacProvider } from './context/ZodiacContext';
import { FirebaseProvider } from './context/FirebaseContext';
import { CartProvider } from './context/CartContext';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { auth } from './config/firebase';
import { UserProvider } from './context/UserContext';

// Error fallback component
const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTitle}>Something went wrong</Text>
    <Text style={styles.errorMessage}>{error.message}</Text>
    <TouchableOpacity style={styles.errorButton} onPress={resetError}>
      <Text style={styles.errorButtonText}>Try Again</Text>
    </TouchableOpacity>
  </View>
);

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
    <ErrorBoundary fallback={ErrorFallback}>
      <FirebaseProvider>
        <UserProvider>
          <ZodiacProvider>
            <AuthProvider>
              <CartProvider>
                <LanguageProvider>
                  <View style={{ flex: 1 }}>
                    {Platform.OS === 'web' ? <AppNavigator /> : <MobileLanding />}
                  </View>
                </LanguageProvider>
              </CartProvider>
            </AuthProvider>
          </ZodiacProvider>
        </UserProvider>
      </FirebaseProvider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a0e4e',
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: '#4a0e4e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  errorButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;