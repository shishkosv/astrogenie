import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';

interface SignButtonProps {
  name: string;
  dateRange: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
}

type Styles = {
  button: ViewStyle;
  buttonSmall: ViewStyle;
  buttonMedium: ViewStyle;
  buttonLarge: ViewStyle;
  name: TextStyle;
  dateRange: TextStyle;
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

const styles = StyleSheet.create<Styles>({
  button: {
    backgroundColor: '#C9BC2B',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    aspectRatio: 1,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  buttonSmall: {
    width: 75,
    padding: 8,
  },
  buttonMedium: {
    width: 94,
    padding: 10,
  },
  buttonLarge: {
    width: 113,
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  dateRange: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
}); 