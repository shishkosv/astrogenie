import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { forecastStyles as styles } from './styles/ForecastStyles';
import Icon from '../../icons/Icon';


const tabs: { id: string; label: string; icon: string }[] = [
  { id: 'sun', label: 'Sun Sign', icon: 'sun' },
  { id: 'heart', label: 'Love', icon: 'heart' },
  { id: 'briefcase', label: 'Career', icon: 'briefcase' },
  { id: 'dollar-sign', label: 'Money', icon: 'dollar-sign' },
  { id: 'activity', label: 'Health', icon: 'activity' },
  { id: 'compass', label: 'Chinese', icon: 'compass' },
  { id: 'layers', label: 'Tarot', icon: 'layers' },
  { id: 'hash', label: 'Numerology', icon: 'hash' },
  { id: 'globe', label: 'Planets', icon: 'globe' },
  { id: 'users', label: 'Celebrities', icon: 'users' },
  { id: 'eye', label: 'Free Psychic Reading', icon: 'eye' },
];

const horoscopeContent: Record<string, string> = {
  sun: "Today's planetary alignment brings positive energy to your endeavors. Focus on personal growth and new opportunities that come your way. Your natural leadership abilities will shine through.",
  heart: "Venus is in a favorable position, making this an excellent time for romance. If you're single, you might meet someone special. For those in relationships, deeper connections are possible.",
  briefcase: "Your professional life is highlighted today. A project you've been working on may finally get recognition. Consider taking on new responsibilities - they could lead to advancement.",
  dollarSign: "Financial matters look promising. It's a good time to review your investments and make long-term plans. Unexpected gains are possible through past investments.",
  activity: "Your energy levels are high today. It's an excellent time to start a new fitness routine or focus on wellness goals. Pay attention to both physical and mental health.",
  compass: "According to Chinese astrology, this is a favorable period for personal development and spiritual growth. Your lucky elements are particularly strong.",
  layers: "The cards suggest a period of transformation and growth. New opportunities are on the horizon, but careful consideration is needed before making major decisions.",
  hash: "Your personal number indicates a phase of completion and new beginnings. Pay attention to recurring numbers - they carry important messages.",
  globe: "The current planetary positions suggest a time of positive change and growth. Jupiter's influence brings luck and expansion to your endeavors.",
  users: "Many Gemini celebrities are experiencing similar energies today. Like them, you might find yourself in the spotlight or receiving recognition for your talents.",
  eye: "The spiritual energies are particularly strong today. Trust your intuition and inner guidance. Meditation and reflection will bring valuable insights.",
};

const DailyForecast = () => {
  const [activeTab, setActiveTab] = useState<string>('sun');

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
          {horoscopeContent[activeTab]}
        </Text>
      </View>

      
    </View>
  );
};

export default DailyForecast; 