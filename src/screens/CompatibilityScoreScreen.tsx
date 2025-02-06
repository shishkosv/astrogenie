import React from 'react';
import { View, Text } from 'react-native';
import { useAstrology } from '../context/AstrologyContext';
import type { Compatibility } from '../types';

interface Props {
  navigation: any; // Replace with proper navigation type if using react-navigation
}

export const CompatibilityScoreScreen: React.FC<Props> = ({ navigation }): JSX.Element => {
  const { compatibility } = useAstrology();

  return (
    <View>
      <Text>Compatibility Score Screen</Text>
      {/* Add your compatibility score UI here */}
    </View>
  );
};
