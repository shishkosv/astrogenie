import { StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING } from '../../../theme/spacing';

type Styles = {
  button: ViewStyle;
  buttonSmall: ViewStyle;
  buttonMedium: ViewStyle;
  buttonLarge: ViewStyle;
  name: TextStyle;
  dateRange: TextStyle;
}

export const signButtonStyles = StyleSheet.create<Styles>({
  button: {
    backgroundColor: COLORS.accent.purple,
    borderRadius: SPACING.radius.lg,
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
    padding: SPACING.xs,
  },
  buttonMedium: {
    width: 94,
    padding: SPACING.sm,
  },
  buttonLarge: {
    width: 113,
    padding: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    color: COLORS.text.light,
    marginBottom: SPACING.xxs,
    textAlign: 'center',
  },
  dateRange: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text.light,
    textAlign: 'center',
    opacity: 0.9,
  },
}); 