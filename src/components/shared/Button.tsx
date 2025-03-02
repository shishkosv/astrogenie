import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Platform, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, createGradient } from '../../theme/colors';
import { buttonStyles as styles } from './styles/ButtonStyles';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  onPress: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onPress,
  loading = false,
  style
}) => {
  // For web, we can use actual CSS for the gradient text in the white button
  const gradientTextStyle = Platform.OS === 'web' && variant === 'white' ? {
    background: createGradient('90deg'),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
  } : {};

  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant], styles[size], style]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator 
          color={
            variant === 'ghost' ? COLORS.text.light : 
            variant === 'white' ? COLORS.gradient.via : 
            COLORS.text.light
          } 
        />
      ) : (
        <Text 
          style={[
            styles.text, 
            variant === 'ghost' && styles.ghostText,
            variant === 'white' && styles.whiteText,
            gradientTextStyle
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}; 