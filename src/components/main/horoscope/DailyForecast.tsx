import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { forecastStyles as styles } from './styles/ForecastStyles';
import Icon from '../../icons/Icon';
import { useZodiac } from '../../../context/ZodiacContext';
import type { ForecastInfo } from '../../../types/ForecastInfo';

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
  const { current } = useZodiac();

  return (
    <View>
      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
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
                color={activeTab === tab.id ? '#CFA2FB' : '#666'} 
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
          <Icon 
            name={tabs.find(tab => tab.id === activeTab)?.icon || 'sun'} 
            size={24} 
            color="#CFA2FB" 
          />
          <Text style={styles.cardTitle}>
            {tabs.find(tab => tab.id === activeTab)?.label}
          </Text>
        </View>
        <Text style={styles.cardContent}>
          {current()?.forecast[activeTab] || 'Please select your zodiac sign'}
        </Text>
      </View>
    </View>
  );
};

export default DailyForecast; 