import React from 'react';
import { View, ScrollView } from 'react-native';
import Layout from '../layout/Layout';
import { horoscopeStyles as styles } from './styles/HoroscopeStyles';
import TodayMatch from './TodayMatch';
import SignTraits from './horoscope/SignTraits';
import DailyForecast from './horoscope/DailyForecast';

const DailyHoroscopes = () => {
  return (
    <Layout>
      <ScrollView style={styles.container}>
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