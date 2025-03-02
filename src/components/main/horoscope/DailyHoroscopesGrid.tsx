import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { zodiacSigns } from '../../../services/zodiacSigns';
import Icon from '../../icons/Icon';
import { COLORS } from '../../../theme/colors';
import { SPACING } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';

// Sample horoscope data for each sign
const sampleHoroscopes: Record<string, string> = {
  Aries: "Today is a great day to start new projects. Your energy is high and you'll find that ideas flow easily.",
  Taurus: "Focus on stability and security today. Financial matters may require your attention.",
  Gemini: "Communication is highlighted today. Share your ideas and listen to others' perspectives.",
  Cancer: "Your intuition is strong today. Trust your gut feelings when making important decisions.",
  Leo: "Creative energy surrounds you today. Express yourself and let your talents shine.",
  Virgo: "Pay attention to details today. Your analytical skills will help solve complex problems.",
  Libra: "Relationships are in focus today. Seek balance and harmony in your interactions.",
  Scorpio: "Transformation is possible today. Let go of what no longer serves you.",
  Sagittarius: "Adventure calls today. Explore new ideas and expand your horizons.",
  Capricorn: "Career matters are highlighted today. Your hard work will be recognized.",
  Aquarius: "Innovation is your strength today. Think outside the box to find solutions.",
  Pisces: "Your compassion makes a difference today. Connect with others on a deeper level."
};

const DailyHoroscopesGrid = () => {
  // For web, we'll use CSS media queries for responsiveness
  const isWeb = Platform.OS === 'web';

  // Render each horoscope card
  const renderHoroscopeCard = (sign: typeof zodiacSigns[0], index: number) => {
    return (
      <View 
        key={sign.name} 
        style={[
          styles.card,
          isWeb && { margin: 8 } // Add margin for web
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Icon name="star" size={24} color={COLORS.text.light} />
          </View>
          <View>
            <Text style={styles.signName}>{sign.name}</Text>
            <Text style={styles.dateRange}>{sign.dates}</Text>
          </View>
        </View>
        <Text style={styles.horoscopeText}>
          {sampleHoroscopes[sign.name] || "Your daily horoscope will appear here."}
        </Text>
      </View>
    );
  };

  // For web, we'll use a div with CSS for the responsive grid
  if (isWeb) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Daily Horoscopes</Text>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
          width: '100%',
          padding: '8px'
        }}>
          {zodiacSigns.map((sign, index) => renderHoroscopeCard(sign, index))}
        </div>
      </View>
    );
  }

  // For mobile, we'll use a simple View with flexWrap
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Daily Horoscopes</Text>
      <View style={styles.gridContainer}>
        {zodiacSigns.map((sign, index) => renderHoroscopeCard(sign, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: SPACING.lg,
    backgroundColor: 'transparent',
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold as any,
    color: COLORS.text.light,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Almost half width for 2 columns on mobile
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  signName: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold as any,
    color: COLORS.text.light,
  },
  dateRange: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: `${COLORS.text.light}99`,
  },
  horoscopeText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
    color: `${COLORS.text.light}CC`,
  },
});

export default DailyHoroscopesGrid; 