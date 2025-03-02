import { StyleSheet, Platform, Dimensions } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';

// Get the window width for responsive design
const windowWidth = Dimensions.get('window').width;

export const compatibilityStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginBottom: 30,
    textAlign: 'center',
  },
  partnersContainer: {
    flexDirection: Platform.OS === 'web' || windowWidth >= 768 ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  partnerColumn: {
    flex: 1,
    width: Platform.OS === 'web' || windowWidth >= 768 ? '48%' : '100%',
    marginHorizontal: Platform.OS === 'web' || windowWidth >= 768 ? 8 : 0,
  },
  formSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    backgroundColor: 'transparent',
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.text.primary,
    marginLeft: 8,
  },
  inputRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    marginBottom: 8,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    fontSize: TYPOGRAPHY.fontSize.md,
    backgroundColor: 'transparent',
    color: COLORS.text.primary,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'transparent',
  },
  dateButtonText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
  },
  locationContainer: {
    width: '100%',
    marginBottom: 16,
  },
  errorContainer: {
    backgroundColor: COLORS.status.error + '20',
    borderColor: COLORS.status.error,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.status.error,
    fontSize: TYPOGRAPHY.fontSize.md,
  },
  calculateButton: {
    backgroundColor: COLORS.accent.purple,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  calculateButtonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
  },
  divider: {
    height: Platform.OS === 'web' || windowWidth >= 768 ? 'auto' : 1,
    width: Platform.OS === 'web' || windowWidth >= 768 ? 1 : '100%',
    backgroundColor: Platform.OS === 'web' || windowWidth >= 768 ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    marginVertical: Platform.OS === 'web' || windowWidth >= 768 ? 0 : 10,
    marginHorizontal: Platform.OS === 'web' || windowWidth >= 768 ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.text.secondary,
    marginVertical: 10,
    textAlign: 'center',
  },
  premiumBanner: {
    backgroundColor: 'transparent',
    borderColor: COLORS.accent.yellow,
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  premiumText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent.yellow,
    marginBottom: 8,
  },
  premiumDescription: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    marginBottom: 15,
  },
  upgradeButton: {
    backgroundColor: COLORS.accent.purple,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
  },
}); 