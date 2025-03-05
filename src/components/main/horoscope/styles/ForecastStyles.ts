import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { TYPOGRAPHY } from '../../../../theme/typography';
import { SPACING } from '../../../../theme/spacing';

export const forecastStyles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: 'transparent',
  },
  signSelectorContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.medium,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.text.light,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  tabsContentContainer: {
    paddingBottom: SPACING.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  signName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.muted,
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: SPACING.radius.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      default: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.text.light,
  },
  cardContent: {
    fontSize: TYPOGRAPHY.fontSize.md,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
    color: COLORS.text.muted,
  },
  tabsContainer: {
    marginBottom: SPACING.lg,
  },
  tabsWrapper: {
    flexDirection: 'row',
    gap: SPACING.xs,
    paddingVertical: SPACING.xs,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: SPACING.radius.md,
    backgroundColor: 'transparent',
    gap: SPACING.xs,
    minWidth: 100,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.medium,
  },
  activeTab: {
    backgroundColor: COLORS.overlay.medium,
    borderColor: COLORS.accent.purple,
  },
  tabLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.text.muted,
  },
  activeTabLabel: {
    color: COLORS.accent.purple,
  },
}); 