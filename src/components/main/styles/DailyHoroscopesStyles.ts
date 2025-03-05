import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING } from '../../../theme/spacing';

export const dailyHoroscopesStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: 'transparent',
  },
  dropdownContainer: {
    marginBottom: SPACING.lg,
    width: '100%',
    position: 'relative',
    zIndex: 1000,
  },
  dropdownRow: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    gap: SPACING.lg,
    width: '100%',
    position: 'relative',
  },
  titleColumn: {
    flex: Platform.OS === 'web' ? 1 : undefined,
    minWidth: Platform.OS === 'web' ? 0 : undefined,
    position: 'relative',
    zIndex: 1,
  },
  switcherColumn: {
    flex: Platform.OS === 'web' ? 1 : undefined,
    minWidth: Platform.OS === 'web' ? 0 : undefined,
    position: 'relative',
    zIndex: 1000,
    ...(Platform.OS === 'web' && {
      maxWidth: '300px',
    }),
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    borderRadius: SPACING.radius.md,
  },
  selectedText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.light,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginHorizontal: SPACING.sm,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.background.dark,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    borderRadius: SPACING.radius.md,
    marginTop: SPACING.xs,
    zIndex: SPACING.zIndex.modal,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      default: {
        elevation: 5,
      },
    }),
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.medium,
  },
  activeItem: {
    backgroundColor: COLORS.overlay.medium,
  },
  itemText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.light,
    fontWeight: TYPOGRAPHY.fontWeight.regular,
    marginLeft: SPACING.sm,
  },
  activeText: {
    color: COLORS.accent.purple,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.border.medium,
    marginVertical: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.light,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.muted,
    marginBottom: Platform.OS === 'web' ? 0 : SPACING.lg,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.muted,
    textAlign: 'center',
    marginVertical: SPACING.xl,
  },
}); 