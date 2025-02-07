import React from 'react';
import { View, ScrollView } from 'react-native';
import Layout from '../layout/Layout';
import { horoscopeStyles as styles } from './styles/HoroscopeStyles';
import TodayMatch from './TodayMatch';
import SignTraits from './horoscope/SignTraits';
import DailyForecast from './horoscope/DailyForecast';
import { useContext } from 'react';
import { useZodiac } from '../../context/ZodiacContext';


const DailyHoroscopes = () => {
  const zodiacContext = useZodiac();  // Get the whole context without destructuring
  const zodiacSign = zodiacContext.selectedSign?.name;  // Adjust property name based on your context

  return (
    <Layout>
      <ScrollView style={styles.container}>

      <div className="space-y-2">
          {zodiacSign ? (
            <>
              <h2 className="text-2xl font-bold tracking-tight">
                Daily Horoscope for {zodiacSign}
              </h2>
              <p className="text-muted-foreground">
                Your daily astrological guidance and insights
              </p>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              Please select your zodiac sign
            </div>
          )}
        </div>

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