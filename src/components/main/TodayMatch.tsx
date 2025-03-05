import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { matchStyles as styles } from './styles/MatchStyles';
import Icon from '../icons/Icon';
import { COLORS } from '../../theme/colors';

type MatchType = 'love' | 'friendship' | 'career';

interface MatchButtonProps {
  type: MatchType;
  label: string;
  icon: string;
  onPress: (type: MatchType) => void;
}

const MatchButton = ({ type, label, icon, onPress }: MatchButtonProps) => (
  <TouchableOpacity 
    style={styles.matchButton}
    onPress={() => onPress(type)}
  >
    <Icon name={icon} size={24} color={COLORS.text.light} />
    <Text style={styles.matchButtonText}>{label}</Text>
  </TouchableOpacity>
);

const TodayMatch = () => {
  const handleMatchPress = (type: MatchType) => {
    // Handle match button press
    console.log(`Finding ${type} match...`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Match</Text>
      <View style={styles.buttonsContainer}>
        <MatchButton
          type="love"
          label="Love Match"
          icon="heart"
          onPress={handleMatchPress}
        />
        <MatchButton
          type="friendship"
          label="Friendship Match"
          icon="users"
          onPress={handleMatchPress}
        />
        <MatchButton
          type="career"
          label="Career Match"
          icon="briefcase"
          onPress={handleMatchPress}
        />
      </View>
    </View>
  );
};

export default TodayMatch; 