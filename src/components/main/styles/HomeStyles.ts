import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING } from '../../../theme/spacing';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainContent: {
    flex: 1,
  },
  // Top section container for hero and daily horoscope
  topSectionContainer: {
    ...(Platform.OS === 'web' && {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
    }),
  },
  hero: {
    padding: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 60 : 40,
    paddingBottom: 40,
    ...(Platform.OS === 'web' && {
      flex: 1,
      minWidth: '50%',
    }),
  },
  signSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 16,
    width: '100%',
    flexWrap: 'wrap',
  },
  // Daily Horoscope Card Section
  dailyHoroscopeSection: {
    padding: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' && {
      flex: 1,
      minWidth: '40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  },
  // Horoscope Preview Section
  horoscopePreviewSection: {
    padding: 40,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.light,
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  zodiacSection: {
    padding: 40,
    backgroundColor: 'transparent',
  },
  features: {
    padding: 40,
    backgroundColor: 'transparent',
    marginTop: 0,
  },
  featureList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    ...(Platform.OS === 'web' && {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    }),
  },
  featureItem: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 24,
    flex: 1,
    minWidth: 280,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.text.light,
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: `${COLORS.text.light}CC`,
    marginBottom: 24,
    lineHeight: TYPOGRAPHY.lineHeight.md,
  },
  buttonContainer: {
    alignItems: 'flex-start',
  },
}); 