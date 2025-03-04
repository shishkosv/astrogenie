import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { TYPOGRAPHY } from '../../../../theme/typography';

export const compatibilityStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  partnersContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  partnerColumn: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      maxWidth: '48%',
    }),
  },
  divider: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  orText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.light,
    textAlign: 'center',
    marginVertical: 16,
  },
  formSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600' as const,
    color: COLORS.text.light,
    marginLeft: 8,
  },
  inputGroup: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  inputRow: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '500' as const,
    color: `${COLORS.text.light}80`,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    padding: 6,
    ...(Platform.OS === 'web' && {
      minWidth: 250,
      maxWidth: 300,
    }),
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: COLORS.status.error,
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: 'center',
  },
  calculateButton: {
    backgroundColor: COLORS.accent.purple,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '600' as const,
  },
}); 