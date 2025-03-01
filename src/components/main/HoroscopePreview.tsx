import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../icons/Icon';

interface HoroscopePreviewProps {
  sign: string;
  horoscope: string;
  luckyNumber: number;
  luckyColor: string;
  mood: string;
  onSignPress?: () => void;
}

export function HoroscopePreview({ 
  sign, 
  horoscope, 
  luckyNumber, 
  luckyColor, 
  mood,
  onSignPress
}: HoroscopePreviewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="star" size={24} color="#FFFFFF" />
          </View>
          
          <View>
            <Text style={styles.title}>Select your sign</Text>
            <TouchableOpacity 
              style={styles.signSelector} 
              onPress={onSignPress}
            >
              <Text style={styles.signText}>{sign}</Text>
              <Icon name="chevron-down" size={16} color="rgba(255, 255, 255, 0.6)" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.horoscopeContainer}>
          <Text style={styles.horoscopeText}>{horoscope}</Text>
        </View>

        <View style={styles.badgesContainer}>
          <HoroscopeBadge label="Lucky Number" value={luckyNumber.toString()} />
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
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    backgroundColor: 'rgba(111, 76, 255, 0.1)',
  },
  content: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  signSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  horoscopeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
  },
  horoscopeText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  badge: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  badgeLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
  },
  badgeValue: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
}); 