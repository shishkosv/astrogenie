import React from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import Layout from '../layout/Layout';
import { dailyHoroscopesStyles as styles } from './styles/DailyHoroscopesStyles';
import TodayMatch from './TodayMatch';
import SignTraits from './horoscope/SignTraits';
import DailyForecast from './horoscope/DailyForecast';
import { useZodiac } from '../../context/ZodiacContext';
import SignSwitcher from '../layout/SignSwitcher';

const DailyHoroscopes = () => {
  const { selectedSign } = useZodiac();

  return (
    <Layout>
      <ScrollView style={styles.container}>
        {/* Sign Switcher and Title Section */}
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownRow}>
            <View style={styles.titleColumn}>
              {selectedSign ? (
                <>
                  <Text style={styles.title}>
                    Daily Horoscope for {selectedSign.name}
                  </Text>
                  <Text style={styles.subtitle}>
                    Your daily astrological guidance and insights
                  </Text>
                </>
              ) : (
                <Text style={styles.emptyText}>
                  Please select your zodiac sign
                </Text>
              )}
            </View>
            <View style={styles.switcherColumn}>
              <SignSwitcher />
            </View>
          </View>
        </View>

        {/* Today's Match Section */}
        <TodayMatch />

        {/* Daily Forecast Section */}
        <DailyForecast />

        {/* Sign Traits Section */}
        <View style={styles.sectionDivider} />
        <SignTraits />
      </ScrollView>
    </Layout>
  );
};

export default DailyHoroscopes; 