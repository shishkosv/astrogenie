import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING } from '../../../theme/spacing';

export const citySelectorStyles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    marginBottom: SPACING.md,
  },
  input: {
    borderRadius: SPACING.radius.md,
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.md,
    borderWidth: 1,
    borderColor: COLORS.border.dark,
    color: COLORS.text.primary,
  },
  loader: {
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.md,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.background.card,
    borderRadius: SPACING.radius.md,
    borderWidth: 1,
    borderColor: COLORS.border.dark,
    maxHeight: 200,
    zIndex: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionItem: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.dark,
  },
  cityName: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.fontWeight.regular as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  },
  countryName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeight.regular as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  },
}); 