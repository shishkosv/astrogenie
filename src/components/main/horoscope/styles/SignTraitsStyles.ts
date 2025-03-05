import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { TYPOGRAPHY } from '../../../../theme/typography';
import { SPACING } from '../../../../theme/spacing';

export const traitsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: SPACING.md,
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
  cardTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.text.light,
  },
  signName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.muted,
  },
  cardContent: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.light,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
  },
  tabsContainer: {
    marginBottom: SPACING.md,
  },
  tabsContentContainer: {
    paddingBottom: SPACING.sm,
  },
  tabsWrapper: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: SPACING.radius.md,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    gap: SPACING.xs,
  },
  activeTab: {
    backgroundColor: COLORS.accent.purple,
    borderColor: COLORS.accent.purple,
  },
  tabLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.muted,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  activeTabLabel: {
    color: COLORS.text.light,
  },
}); 