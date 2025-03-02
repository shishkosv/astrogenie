import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';

export const countrySelectorStyles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    marginBottom: 8,
    fontWeight: TYPOGRAPHY.fontWeight.medium as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    ...TYPOGRAPHY.textStyle.label,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border.dark,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  picker: {
    height: 50,
    color: COLORS.text.primary,
    padding: 12,
  },
  errorBorder: {
    borderColor: COLORS.status.error,
  },
  errorText: {
    color: COLORS.status.error,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginTop: 4,
    fontWeight: TYPOGRAPHY.fontWeight.regular as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    ...TYPOGRAPHY.textStyle.caption,
  }
}); 