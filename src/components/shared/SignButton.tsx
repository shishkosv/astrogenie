import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';
import { signButtonStyles as styles } from './styles/SignButtonStyles';

interface SignButtonProps {
  name: string;
  dateRange: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
}

export const SignButton: React.FC<SignButtonProps> = ({
  name,
  dateRange,
  onPress,
  size = 'small'
}) => {
  const buttonSizeStyle = {
    small: styles.buttonSmall,
    medium: styles.buttonMedium,
    large: styles.buttonLarge,
  }[size];

  return (
    <TouchableOpacity
      style={[styles.button, buttonSizeStyle]}
      onPress={onPress}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.dateRange}>{dateRange}</Text>
    </TouchableOpacity>
  );
};

// Styles have been moved to SignButtonStyles.ts 