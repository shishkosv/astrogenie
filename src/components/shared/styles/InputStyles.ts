import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING } from '../../../theme/spacing';

export const inputStyles = StyleSheet.create({
  inputField: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    backgroundColor: COLORS.background.light,
    borderRadius: SPACING.radius.md,
    borderWidth: 1,
    borderColor: COLORS.border.dark,
  },
  input: {
    height: 40,
    paddingHorizontal: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginTop: SPACING.xs,
  },
}); 