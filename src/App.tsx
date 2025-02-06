import type React from 'react';
import { Platform, useEffect } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';
import { LocalizationProvider } from './context/LocalizationContext';
import { AstrologyProvider } from './context/AstrologyContext';
import LoginScreen from './components/login/LoginScreen';
import RegistrationScreen from './components/userprofile/RegistrationScreen';
import DashboardScreen from './components/main/DashboardScreen';
import CompatibilityScoreScreen from './components/main/CompatibilityScoreScreen';
import FriendshipScoreScreen from './components/main/FriendshipScoreScreen';
import TarotCardsScreen from './components/main/TarotCardsScreen';
import PersonalizedForecastScreen from './components/main/PersonalizedForecastScreen';
import { firebaseService } from './services/firebase';

const Stack = createStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    firebaseService.initialize();
  }, []);

  return (
    <AuthProvider>
      <LocalizationProvider>
        <AstrologyProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: Platform.OS === 'web',
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="CompatibilityScore" component={CompatibilityScoreScreen} />
              <Stack.Screen name="FriendshipScore" component={FriendshipScoreScreen} />
              <Stack.Screen name="TarotCards" component={TarotCardsScreen} />
              <Stack.Screen name="PersonalizedForecast" component={PersonalizedForecastScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AstrologyProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
};

export default App;
