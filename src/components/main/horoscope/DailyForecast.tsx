import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { forecastStyles as styles } from './styles/ForecastStyles';
import Icon from '../../icons/Icon';
import { useZodiac } from '../../../context/ZodiacContext';
import type { ForecastInfo } from '../../../types/ForecastInfo';
import SignSwitcher from '../../layout/SignSwitcher';
import { COLORS } from '../../../theme/colors';

const tabs: { id: keyof ForecastInfo; label: string; icon: string }[] = [
  { id: 'SunSign', label: 'Sun Sign', icon: 'sun' },
  { id: 'Love', label: 'Love', icon: 'heart' },
  { id: 'Career', label: 'Career', icon: 'briefcase' },
  { id: 'Money', label: 'Money', icon: 'dollar-sign' },
  { id: 'Health', label: 'Health', icon: 'activity' },
  { id: 'Chinese', label: 'Chinese', icon: 'compass' },
  { id: 'Tarot', label: 'Tarot', icon: 'layers' },
  { id: 'Numerology', label: 'Numerology', icon: 'hash' },
  { id: 'Planets', label: 'Planets', icon: 'globe' },
  { id: 'Celebrities', label: 'Celebrities', icon: 'users' }
];

const DailyForecast = () => {
  const [activeTab, setActiveTab] = useState<keyof ForecastInfo>('SunSign');
  const { current, selectedSign } = useZodiac();

  return (
    <View style={styles.container}>
      {/* Sign Selector */}
      <View style={styles.signSelectorContainer}>
        <Text style={styles.sectionTitle}>Select Your Sign</Text>
        <SignSwitcher />
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContentContainer}
      >
        <View style={styles.tabsWrapper}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon 
                name={tab.icon} 
                size={20} 
                color={activeTab === tab.id ? COLORS.text.light : COLORS.text.muted} 
              />
              <Text style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Horoscope Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Icon 
              name={tabs.find(tab => tab.id === activeTab)?.icon || 'sun'} 
              size={24} 
              color={COLORS.text.light} 
            />
          </View>
          <View>
            <Text style={styles.cardTitle}>
              {tabs.find(tab => tab.id === activeTab)?.label} Horoscope
            </Text>
            <Text style={styles.signName}>
              {selectedSign?.name || 'Select a sign'}
            </Text>
          </View>
        </View>
        <Text style={styles.cardContent}>
          {current()?.forecast[activeTab] || 'Please select your zodiac sign to view your daily forecast.'}
        </Text>
      </View>
    </View>
  );
};

export default DailyForecast; 