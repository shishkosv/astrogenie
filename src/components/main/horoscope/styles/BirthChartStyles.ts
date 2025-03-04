import { StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { TYPOGRAPHY } from '../../../../theme/typography';

export const birthChartStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.status.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 24,
    backgroundColor: 'transparent',
  },
  formTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: '700' as const,
    color: COLORS.text.light,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  responsiveLayout: Platform.select({
    web: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
    },
    default: {
      flexDirection: 'column',
    },
  }) as ViewStyle,
  leftColumn: Platform.select({
    web: {
      flex: 1,
      marginRight: 24,
    },
    default: {
      marginBottom: 24,
    },
  }) as ViewStyle,
  rightColumn: Platform.select({
    web: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    default: {
      alignItems: 'center',
    },
  }) as ViewStyle,
  formRow: {
    marginBottom: 16,
  },
  formGrid: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formField: {
    width: Platform.OS === 'web' ? '100%' : '100%',
    marginBottom: 8,
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
  chartPreview: {
    backgroundColor: COLORS.accent.blue,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'web' ? 0 : 16,
    ...(Platform.OS === 'web' ? {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    } : {}),
  },
  chartCircleOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Platform.OS === 'web' ? 
      `linear-gradient(to bottom right, ${COLORS.accent.purple}, ${COLORS.accent.blue})` : 
      'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      ':hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 0 15px rgba(111, 76, 255, 0.5)',
      },
      ':active': {
        transform: 'scale(0.98)',
      }
    }),
  },
  chartCircleInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent.blue,
  },
  chartText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '500' as const,
    marginBottom: 4,
  },
  chartIcon: {
    marginTop: 4,
    opacity: 0.8,
  },
  chartDescription: {
    color: `${COLORS.text.light}CC`,
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    maxWidth: 300,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  },
  generateButton: {
    backgroundColor: COLORS.text.light,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    opacity: 0.7,
  },
  generateButtonText: {
    color: COLORS.accent.purple,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '600' as const,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600' as const,
    marginBottom: 16,
    color: COLORS.text.light,
  },
  dataSection: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  dataSectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '600' as const,
    color: COLORS.text.light,
    marginBottom: 12,
  },
  locationInputs: {
    marginBottom: 16,
  },
  locationDetails: {
    marginTop: 8,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  locationText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: `${COLORS.text.light}CC`,
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: COLORS.accent.purple,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '600' as const,
  },
  planetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  planetName: {
    marginLeft: 12,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '500' as const,
    color: COLORS.text.light,
    width: 100,
  },
  planetInfo: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: `${COLORS.text.light}CC`,
  },
  houseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  houseNumber: {
    width: 100,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '500' as const,
    color: COLORS.text.light,
  },
  houseInfo: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: `${COLORS.text.light}CC`,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  chartImage: {
    borderRadius: 8,
  },
  interpretButton: {
    backgroundColor: COLORS.accent.blue,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  interpretButtonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '600' as const,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
  },
  fullWidthCard: {
    width: '100%',
  },
  halfWidthCard: {
    width: '48%',
  },
  resetButton: {
    backgroundColor: COLORS.accent.purple,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  resetButtonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '600' as const,
  },
}); 