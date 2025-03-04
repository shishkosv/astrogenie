import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING } from '../../../theme/spacing';

export const dateTimePickerStyles = StyleSheet.create({
  dateButton: {
    padding: SPACING.md,
    backgroundColor: 'transparent',
    borderRadius: SPACING.radius.md,
    marginTop: SPACING.xs,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateButtonText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.light,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.fontWeight.regular as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  },
  webInput: {
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.md,
    borderRadius: SPACING.radius.md,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
    width: '100%',
    color: COLORS.text.light,
  }
}); 