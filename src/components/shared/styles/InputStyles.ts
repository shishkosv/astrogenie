import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING } from '../../../theme/spacing';

export const inputStyles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.light,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: SPACING.radius.md,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        height: 44,
      },
      android: {
        height: 48,
      },
      default: {
        height: 40,
      }
    }),
  },
  input: {
    height: '100%',
    color: COLORS.text.light,
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.regular as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  },
  errorBorder: {
    borderColor: COLORS.status.error,
  },
  errorText: {
    color: COLORS.status.error,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginTop: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeight.regular as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  }
}); 