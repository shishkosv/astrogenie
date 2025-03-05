import { StyleSheet, Platform, Dimensions } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { TYPOGRAPHY } from '../../../../theme/typography';
import { SPACING } from '../../../../theme/spacing';

const windowWidth = Dimensions.get('window').width;
const isSmallScreen = windowWidth < 768;
const isMediumScreen = windowWidth >= 768 && windowWidth < 1024;

export const tarotDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  heroSection: {
    backgroundColor: 'transparent',
    padding: Platform.select({
      web: isSmallScreen ? SPACING.md : SPACING.xl,
      default: SPACING.xl,
    }),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.medium,
  },
  heroContent: {
    maxWidth: Platform.select({
      web: isSmallScreen ? '100%' : isMediumScreen ? 800 : 1200,
      default: 1200,
    }),
    marginHorizontal: 'auto',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: Platform.select({
      web: isSmallScreen ? TYPOGRAPHY.fontSize.xxl : TYPOGRAPHY.fontSize.xxxl,
      default: TYPOGRAPHY.fontSize.xxxl,
    }),
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.light,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.lineHeight.tight,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Platform.select({
      web: isSmallScreen ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.lg,
      default: TYPOGRAPHY.fontSize.lg,
    }),
    color: COLORS.text.muted,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Platform.select({
      web: isSmallScreen ? SPACING.xs : SPACING.sm,
      default: SPACING.sm,
    }),
    marginBottom: SPACING.xl,
  },
  price: {
    fontSize: Platform.select({
      web: isSmallScreen ? TYPOGRAPHY.fontSize.xl : TYPOGRAPHY.fontSize.xxl,
      default: TYPOGRAPHY.fontSize.xxl,
    }),
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent.purple,
    lineHeight: TYPOGRAPHY.lineHeight.tight,
  },
  yearlyPrice: {
    fontSize: Platform.select({
      web: isSmallScreen ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.lg,
      default: TYPOGRAPHY.fontSize.lg,
    }),
    color: COLORS.text.muted,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  },
  ctaButton: {
    minWidth: Platform.select({
      web: isSmallScreen ? 200 : 250,
      default: 250,
    }),
  },
  mainContent: {
    maxWidth: Platform.select({
      web: isSmallScreen ? '100%' : isMediumScreen ? 800 : 1200,
      default: 1200,
    }),
    marginHorizontal: 'auto',
    padding: Platform.select({
      web: isSmallScreen ? SPACING.md : SPACING.xl,
      default: SPACING.xl,
    }),
  },
  section: {
    marginBottom: Platform.select({
      web: isSmallScreen ? SPACING.xl : SPACING.xxl,
      default: SPACING.xxl,
    }),
  },
  sectionTitle: {
    fontSize: Platform.select({
      web: isSmallScreen ? TYPOGRAPHY.fontSize.xl : TYPOGRAPHY.fontSize.xxl,
      default: TYPOGRAPHY.fontSize.xxl,
    }),
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.light,
    marginBottom: Platform.select({
      web: isSmallScreen ? SPACING.md : SPACING.lg,
      default: SPACING.lg,
    }),
    lineHeight: TYPOGRAPHY.lineHeight.tight,
  },
  description: {
    fontSize: Platform.select({
      web: isSmallScreen ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.lg,
      default: TYPOGRAPHY.fontSize.lg,
    }),
    lineHeight: Platform.select({
      web: isSmallScreen ? 1.6 : 1.8,
      default: 1.8,
    }),
    color: COLORS.text.light,
    opacity: 0.9,
    ...Platform.select({
      web: {
        textAlign: 'justify',
        letterSpacing: '0.01em',
      },
      default: {
        textAlign: 'left',
      },
    }),
  },
  benefitsGrid: {
    ...Platform.select({
      web: {
        display: 'grid',
        gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(2, 1fr)',
        gap: isSmallScreen ? SPACING.md : SPACING.lg,
      },
      default: {
        gap: SPACING.lg,
      },
    }),
  },
  benefitCard: {
    backgroundColor: 'transparent',
    borderRadius: SPACING.radius.lg,
    padding: Platform.select({
      web: isSmallScreen ? SPACING.md : SPACING.lg,
      default: SPACING.lg,
    }),
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Platform.select({
      web: isSmallScreen ? SPACING.md : SPACING.lg,
      default: SPACING.lg,
    }),
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      default: {
        elevation: 3,
      },
    }),
  },
  benefitIcon: {
    width: Platform.select({
      web: isSmallScreen ? 40 : 48,
      default: 48,
    }),
    height: Platform.select({
      web: isSmallScreen ? 40 : 48,
      default: 48,
    }),
    borderRadius: Platform.select({
      web: isSmallScreen ? 20 : 24,
      default: 24,
    }),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: Platform.select({
      web: isSmallScreen ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.lg,
      default: TYPOGRAPHY.fontSize.lg,
    }),
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.text.light,
    marginBottom: SPACING.xs,
  },
  benefitDescription: {
    fontSize: Platform.select({
      web: isSmallScreen ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.md,
      default: TYPOGRAPHY.fontSize.md,
    }),
    color: COLORS.text.muted,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
  },
}); 