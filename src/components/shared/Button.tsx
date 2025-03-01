import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, Platform, View, StyleProp, ViewStyle } from 'react-native';

// Define gradient colors to match the CSS variables
const GRADIENT_COLORS = {
  from: '#4040C0', // hsl(240, 70%, 50%)
  via: '#C040C0', // hsl(280, 70%, 50%)
  to: '#C04080',  // hsl(320, 70%, 50%)
};

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
    background: `linear-gradient(135deg, ${GRADIENT_COLORS.from}, ${GRADIENT_COLORS.via})`,
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
            variant === 'ghost' ? '#FFFFFF' : 
            variant === 'white' ? GRADIENT_COLORS.via : 
            '#FFFFFF'
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

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: GRADIENT_COLORS.via,
    ...(Platform.OS === 'web' && {
      background: `linear-gradient(135deg, ${GRADIENT_COLORS.from}, ${GRADIENT_COLORS.via})`,
    }),
  },
  secondary: {
    backgroundColor: GRADIENT_COLORS.to,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  white: {
    backgroundColor: '#FFFFFF',
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
  ghostText: {
    color: '#FFFFFF',
  },
  whiteText: {
    color: GRADIENT_COLORS.via,
  },
}); 