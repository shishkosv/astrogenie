import React from 'react';
import { View, Platform } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import MobileLanding from './components/landing/MobileLanding';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

const App = () => (
  <AuthProvider>
    <LanguageProvider>
      <View style={{ flex: 1 }}>
        {Platform.OS === 'web' ? <AppNavigator /> : <MobileLanding />}
      </View>
    </LanguageProvider>
  </AuthProvider>
);

export default App;