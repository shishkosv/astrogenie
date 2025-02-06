import React from 'react';
import { View, Text } from 'react-native';
import { useAstrology } from '../context/AstrologyContext';

interface Props {
  navigation: any; // Replace with proper navigation type if using react-navigation
}

export const FriendshipScoreScreen: React.FC<Props> = ({ navigation }): JSX.Element => {
  const { compatibility } = useAstrology();

  return (
    <View>
      <Text>Friendship Score Screen</Text>
      {/* Add your friendship score UI here */}
    </View>
  );
};
