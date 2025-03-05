import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Layout from '../layout/Layout';
import { dailyHoroscopesStyles as styles } from './styles/DailyHoroscopesStyles';
import TodayMatch from './TodayMatch';
import SignTraits from './horoscope/SignTraits';
import DailyForecast from './horoscope/DailyForecast';
import { useZodiac } from '../../context/ZodiacContext';
import Icon from '../icons/Icon';
import { zodiacSigns } from '../../services/zodiacSigns';

const DailyHoroscopes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedSign, setSelectedSign } = useZodiac();

  const handleSignChange = (sign: typeof zodiacSigns[0]) => {
    setSelectedSign({
      name: sign.name,
      dateRange: sign.dates,
      period: ''
    });
    setIsOpen(false);
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        {/* Sign Switcher Dropdown */}
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setIsOpen(!isOpen)}
          >
            <Icon name="star" size={20} color="#FFFFFF" />
            <Text style={styles.selectedText}>
              {selectedSign?.name || 'Select Sign'}
            </Text>
            <Icon 
              name={isOpen ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {isOpen && (
            <View style={styles.dropdown}>
              {zodiacSigns.map((sign) => (
                <TouchableOpacity 
                  key={sign.name}
                  style={[
                    styles.dropdownItem,
                    selectedSign?.name === sign.name && styles.activeItem
                  ]}
                  onPress={() => handleSignChange(sign)}
                >
                  <Icon 
                    name="star" 
                    size={20}
                    color={selectedSign?.name === sign.name ? '#6F4CFF' : '#FFFFFF'}
                  />
                  <Text style={[
                    styles.itemText,
                    selectedSign?.name === sign.name && styles.activeText
                  ]}>
                    {sign.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

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