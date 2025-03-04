import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../icons/Icon';
import SignSwitcher from '../layout/SignSwitcher';
import { useZodiac } from '../../context/ZodiacContext';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { Button } from '../shared/Button';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

interface HoroscopePreviewProps {
  onSignPress?: () => void;
}

export function HoroscopePreview({ 
  onSignPress
}: HoroscopePreviewProps) {
  const navigation = useNavigation<NavigationProp>();
  const { current, selectedSign } = useZodiac();
  
  const handleWeeklyForecastClick = () => {
    navigation.navigate('DailyHoroscopes');
  };
  
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
          <View style={styles.signSelectorRow}>
            <View style={styles.signSwitcherColumn}>
              <SignSwitcher />
            </View>
            <View style={styles.buttonColumn}>
              <Button 
                variant="ghost" 
                size="md" 
                onPress={handleWeeklyForecastClick}
                style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Text style={{ color: COLORS.text.light }}>Explore All Horoscopes</Text>
              </Button>
            </View>
          </View>
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
    overflow: 'visible',
    backgroundColor: 'transparent',
    minHeight: 400,
  },
  content: {
    marginBottom: SPACING.md,
    position: 'relative',
    zIndex: 1000,
    elevation: 1000,
  },
  ctaContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  signSelectorContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    position: 'relative',
    zIndex: 1000,
    elevation: 1000,
  },
  signSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: SPACING.md,
  },
  signSwitcherColumn: {
    flex: 1,
    minWidth: 0, // Prevents flex item from overflowing
  },
  buttonColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: SPACING.md,
  },
  signSelectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  signSelectorText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.light,
    fontWeight: TYPOGRAPHY.fontWeight.medium as any,
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