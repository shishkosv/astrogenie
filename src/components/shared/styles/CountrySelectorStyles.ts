import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING } from '../../../theme/spacing';

export const countrySelectorStyles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border.dark,
    borderRadius: SPACING.radius.md,
    backgroundColor: 'transparent',
  },
  picker: {
    height: 50,
    color: COLORS.text.primary,
    padding: SPACING.md,
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