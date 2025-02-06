import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyles as styles } from './styles';
import type { ButtonProps } from './types';

export const Button = ({ 
  variant = 'default', 
  size = 'md', 
  children, 
  onPress 
}: ButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.base, styles[variant], styles[size]]} 
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}; 