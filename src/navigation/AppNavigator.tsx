import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebLanding from '../components/landing/WebLanding';
import Home from '../components/main/Home';
import TarotReadings from '../components/main/TarotReadings';
import Features from '../components/main/Features';
import About from '../components/main/About';
import Contact from '../components/main/Contact';
import DailyHoroscopes from '../components/main/DailyHoroscopes';
import Compatibility from '../components/main/Compatibility';
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';
import ForgotPassword from '../components/auth/ForgotPassword';
import Profile from '../components/profile/Profile';
import Settings from '../components/profile/Settings';
import Favorites from '../components/profile/Favorites';

export type RootStackParamList = {
  Landing: undefined;
  Home: undefined;
  TarotReadings: undefined;
  Features: undefined;
  About: undefined;
  Contact: undefined;
  DailyHoroscopes: undefined;
  Compatibility: undefined;
  Registration: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Profile: undefined;
  Settings: undefined;
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen 
          name="Landing" 
          component={WebLanding} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TarotReadings" 
          component={TarotReadings}
          options={{
            title: 'Tarot Readings',
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Features" 
          component={Features}
          options={{
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="About" 
          component={About}
          options={{
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Contact" 
          component={Contact}
          options={{
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="DailyHoroscopes" 
          component={DailyHoroscopes}
          options={{
            title: 'Daily Horoscopes',
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Compatibility" 
          component={Compatibility}
          options={{
            title: 'Compatibility Check',
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Registration" 
          component={Registration}
          options={{
            title: 'Registration',
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPassword}
          options={{
            title: 'Reset Password',
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings}
          options={{
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Favorites" 
          component={Favorites}
          options={{
            headerStyle: {
              backgroundColor: '#4a0e4e',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 