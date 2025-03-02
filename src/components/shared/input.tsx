import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { inputStyles as styles } from './styles/InputStyles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  style,
  ...props 
}) => {
  return (
    <View style={styles.inputField}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#666"
          {...props}
        />
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

// Styles have been moved to InputStyles.ts
