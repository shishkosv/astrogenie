import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING } from '../../../theme/spacing';

export const dateTimePickerStyles = StyleSheet.create({
  dateButton: {
    borderWidth: 1,
    borderColor: COLORS.border.dark,
    borderRadius: SPACING.radius.md,
    padding: SPACING.md,
    backgroundColor: 'transparent',
    minWidth: Platform.OS === 'web' ? '200px' : '100%',
    ...Platform.select({
      web: {
        width: '100%',
      },
      default: {
        width: '100%',
      }
    })
  },
  dateButtonText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.regular as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  },
  webInput: {
    width: '100%',
    minWidth: '200px',
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.md,
    borderRadius: SPACING.radius.md,
    borderWidth: 1,
    borderColor: COLORS.border.dark,
    backgroundColor: 'transparent',
    color: COLORS.text.primary,
  }
}); 