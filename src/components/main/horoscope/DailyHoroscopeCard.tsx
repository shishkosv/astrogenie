import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Button } from '../../shared/Button';
import Icon from '../../icons/Icon';
import { COLORS } from '../../../theme/colors';
import { SPACING } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';

interface DailyHoroscopeCardProps {
  date: string;
  horoscope: string;
  onReadFullHoroscope: () => void;
}

export const DailyHoroscopeCard: React.FC<DailyHoroscopeCardProps> = ({ 
  date, 
  horoscope, 
  onReadFullHoroscope 
}) => {
  return (
    <View style={styles.container}>
      {/* Header with dots and icons */}
      <View style={styles.header}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: COLORS.status.error }]} />
          <View style={[styles.dot, { backgroundColor: COLORS.status.warning }]} />
          <View style={[styles.dot, { backgroundColor: COLORS.status.success }]} />
        </View>
        <View style={styles.headerIcons}>
          <Icon name="search" size={16} color={`${COLORS.text.light}99`} />
          <Icon name="message-circle" size={16} color={`${COLORS.text.light}99`} />
        </View>
      </View>

      <View style={styles.content}>
        {/* Icon and title section */}
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Icon name="star" size={24} color={COLORS.text.light} />
          </View>
          <View>
            <Text style={styles.title}>Daily Horoscope</Text>
            <Text style={styles.date}>Updated for {date}</Text>
          </View>
        </View>

        {/* Horoscope text */}
        <Text style={styles.horoscopeText}>{horoscope}</Text>

        {/* Read more button */}
        <View style={styles.buttonContainer}>
          <Button 
            variant="ghost" 
            onPress={onReadFullHoroscope}
            style={styles.button}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Read full horoscope</Text>
              <Icon name="chevron-right" size={16} color={`${COLORS.text.light}CC`} />
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 24,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 500 : '100%',
    ...(Platform.OS === 'web' && {
      height: 'fit-content',
      alignSelf: 'center',
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  dots: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  content: {
    gap: SPACING.xl,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  date: {
    color: `${COLORS.text.light}99`,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  horoscopeText: {
    color: `${COLORS.text.light}CC`,
    fontSize: TYPOGRAPHY.fontSize.md,
    lineHeight: TYPOGRAPHY.lineHeight.md,
  },
  buttonContainer: {
    paddingTop: SPACING.sm,
  },
  button: {
    paddingLeft: 0,
    alignItems: 'flex-start',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: `${COLORS.text.light}CC`,
    fontSize: TYPOGRAPHY.fontSize.md,
    marginRight: SPACING.xs,
  },
});

export default DailyHoroscopeCard; 