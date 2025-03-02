import { StyleSheet, Platform } from 'react-native';
import { COLORS, createGradient } from '../../../theme/colors';
import { SPACING } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';

export const buttonStyles = StyleSheet.create({
  button: {
    borderRadius: SPACING.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: COLORS.gradient.via,
    ...(Platform.OS === 'web' && {
      background: createGradient('90deg'),
    }),
  },
  secondary: {
    backgroundColor: COLORS.gradient.to,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  white: {
    backgroundColor: COLORS.text.light,
  },
  sm: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  md: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  lg: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  text: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  },
  ghostText: {
    color: COLORS.text.light,
  },
  whiteText: {
    color: COLORS.gradient.via,
  },
}); 