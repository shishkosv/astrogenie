import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../icons/Icon';
import SignSwitcher from '../layout/SignSwitcher';
import { useZodiac } from '../../context/ZodiacContext';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';

interface HoroscopePreviewProps {
  onSignPress?: () => void;
}

export function HoroscopePreview({ 
  onSignPress
}: HoroscopePreviewProps) {
  const { current, selectedSign } = useZodiac();
  
  // Get the current horoscope data from the zodiac context
  const horoscopeData = current();
  
  // Default values for badges
  const luckyNumber = '7';
  const luckyColor = 'Blue';
  const mood = 'Inspired';
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.signSelectorContainer}>
          <Text style={styles.sectionTitle}>Select Your Sign</Text>
          <SignSwitcher />
        </View>

        <View style={styles.horoscopeContainer}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Icon name="star" size={24} color={COLORS.text.light} />
            </View>
            
            <View>
              <Text style={styles.title}>Daily Horoscope</Text>
              <Text style={styles.signText}>{selectedSign?.name || 'Select a sign'}</Text>
            </View>
          </View>

          <Text style={styles.horoscopeText}>
            {horoscopeData?.forecast?.SunSign || 'Please select your zodiac sign to view your daily horoscope.'}
          </Text>
        </View>

        <View style={styles.badgesContainer}>
          <HoroscopeBadge label="Lucky Number" value={luckyNumber} />
          <HoroscopeBadge label="Lucky Color" value={luckyColor} />
          <HoroscopeBadge label="Mood" value={mood} />
        </View>
      </View>
    </View>
  );
}

interface HoroscopeBadgeProps {
  label: string;
  value: string;
}

function HoroscopeBadge({ label, value }: HoroscopeBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeLabel}>{label}</Text>
      <Text style={styles.badgeValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  content: {
    marginBottom: SPACING.md,
  },
  signSelectorContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold as any,
    color: COLORS.text.light,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  horoscopeContainer: {
    borderRadius: 12,
    padding: SPACING.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold as any,
    color: COLORS.text.light,
    marginBottom: 4,
  },
  signText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: `${COLORS.text.light}99`,
  },
  horoscopeText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
    color: `${COLORS.text.light}CC`,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -SPACING.xs,
  },
  badge: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: SPACING.xs,
  },
  badgeLabel: {
    color: `${COLORS.text.light}99`,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: 4,
  },
  badgeValue: {
    color: COLORS.text.light,
    fontWeight: TYPOGRAPHY.fontWeight.medium as any,
  },
}); 