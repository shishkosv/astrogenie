import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onPress: () => void;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onPress,
  loading = false
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant], styles[size]]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#4B0082',
  },
  secondary: {
    backgroundColor: '#CFA2FB',
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 