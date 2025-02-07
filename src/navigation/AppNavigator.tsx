import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import WebLanding from '../components/landing/WebLanding';
import Home from '../components/main/Home';
import TarotReadings from '../components/main/tarot/TarotReadings';
import Features from '../components/main/Features';
import About from '../components/main/About';
import Contact from '../components/main/Contact';
import DailyHoroscopes from '../components/main/DailyHoroscopes';
import Compatibility from '../components/main/Compatibility';
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';
import ForgotPassword from '../components/auth/ForgotPassword';
import Cart from '../components/cart/Cart';
import Checkout from '../components/cart/Checkout';
import Subscription from '../components/cart/Subscription';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BirthChart from '../components/main/BirthChart';
import SignLists from '../components/main/horoscope/SignLists';
import SignTraits from '../components/main/horoscope/SignTraits';
import TarotReadingDetail from '../components/main/tarot/TarotReadingDetail';

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
  Settings: undefined;
  Favorites: undefined;
  Cart: undefined;
  Checkout: undefined;
  Subscription: undefined;
  BirthChart: undefined;
  SignLists: undefined;
  SignTraits: undefined;
  TarotReadingDetail: {
    reading: {
      id: string;
      title: string;
      subtitle: string;
      price: number;
      yearlyPrice?: number;
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

// Define linking configuration
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['astroconnect://', 'https://astroconnect.com'],
  config: {
    screens: {
      Landing: '',
      Home: 'home',
      TarotReadings: 'tarot',
      Features: 'features',
      About: 'about',
      Contact: 'contact',
      DailyHoroscopes: 'horoscopes',
      Compatibility: 'compatibility',
      Registration: 'register',
      Login: 'login',
      ForgotPassword: 'forgot-password',
      Settings: 'settings',
      Favorites: 'favorites',
      Cart: 'cart',
      Checkout: 'checkout',
      Subscription: 'subscription',
      BirthChart: 'birth-chart',
      SignLists: 'signs',
      SignTraits: 'traits',
      TarotReadingDetail: {
        path: 'tarot/:id',
        parse: {
          id: (id: string) => id,
        },
      },
    },
  },
  // Enable browser history on web platform
  enabled: Platform.OS === 'web',
};

const AppNavigator = () => {
  return (
    <NavigationContainer 
      linking={linking}
      fallback={<Text>Loading...</Text>}
    >
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={WebLanding} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TarotReadings" component={TarotReadings} />
        <Stack.Screen name="Features" component={Features} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="DailyHoroscopes" component={DailyHoroscopes} />
        <Stack.Screen name="Compatibility" component={Compatibility} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="BirthChart" component={BirthChart} />
        <Stack.Screen name="SignLists" component={SignLists} />
        <Stack.Screen name="SignTraits" component={SignTraits} />
        <Stack.Screen name="TarotReadingDetail" component={TarotReadingDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 