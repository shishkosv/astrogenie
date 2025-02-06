import React from 'react';
import { View, Platform } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import MobileLanding from './components/landing/MobileLanding';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ZodiacProvider } from './context/ZodiacContext';

const App = () => (
  <ZodiacProvider>
    <AuthProvider>
      <LanguageProvider>
        <View style={{ flex: 1 }}>
          {Platform.OS === 'web' ? <AppNavigator /> : <MobileLanding />}
        </View>
      </LanguageProvider>
    </AuthProvider>
  </ZodiacProvider>
);

export default App;