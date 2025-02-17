import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Layout from '../layout/Layout';
import { horoscopeStyles as styles } from './styles/HoroscopeStyles';
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
            <Icon name="star" size={20} color="#000" />
            <Text style={styles.selectedText}>
              {selectedSign?.name || 'Select Sign'}
            </Text>
            <Icon 
              name={isOpen ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#666"
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
                    color={selectedSign?.name === sign.name ? '#000' : '#666'}
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

        <div className="space-y-2">
          {selectedSign ? (
            <>
              <h2 className="text-2xl font-bold tracking-tight">
                Daily Horoscope for {selectedSign.name}
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