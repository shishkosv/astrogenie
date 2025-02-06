import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress?: () => void;
}

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

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Variants
  default: {
    backgroundColor: 'hsl(var(--primary))',
  },
  secondary: {
    backgroundColor: 'hsl(var(--secondary))',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'hsl(var(--border))',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  // Sizes
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  md: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  lg: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  // Text styles
  text: {
    fontWeight: '500',
  },
  defaultText: {
    color: 'hsl(var(--primary-foreground))',
  },
  secondaryText: {
    color: 'hsl(var(--secondary-foreground))',
  },
  outlineText: {
    color: 'hsl(var(--foreground))',
  },
  ghostText: {
    color: 'hsl(var(--foreground))',
  },
}); 