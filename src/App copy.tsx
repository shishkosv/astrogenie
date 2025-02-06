import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AstrologyProvider } from './context/AstrologyContext';
import { LocalizationProvider } from './context/LocalizationContext';
import { RegistrationScreen } from './screens/RegistrationScreen';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <LocalizationProvider>
          <AstrologyProvider>
            <Stack.Navigator>
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </Stack.Navigator>
          </AstrologyProvider>
        </LocalizationProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
