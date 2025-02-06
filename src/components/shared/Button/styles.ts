import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8444A4',
  },
  // Variants
  default: {
    backgroundColor: '#8444A4',
  },
  secondary: {
    backgroundColor: 'hsl(var(--primary))',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8444A4',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  // Sizes
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 120,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 160,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 200,
  },
  // Text styles
  text: {
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
  defaultText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: 'hsl(var(--primary-foreground))',
  },
  outlineText: {
    color: '#8444A4',
  },
  ghostText: {
    color: '#8444A4',
  },
}); 