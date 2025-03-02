import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { forecastStyles as styles } from './styles/ForecastStyles';
import Icon from '../../icons/Icon';
import { useZodiac } from '../../../context/ZodiacContext';
import type { ForecastInfo } from '../../../types/ForecastInfo';
import SignSwitcher from '../../layout/SignSwitcher';
import { COLORS } from '../../../theme/colors';
import { SPACING } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';

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
    <View style={customStyles.container}>
      {/* Sign Selector */}
      <View style={customStyles.signSelectorContainer}>
        <Text style={customStyles.sectionTitle}>Select Your Sign</Text>
        <SignSwitcher />
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={customStyles.tabsContainer}
        contentContainerStyle={customStyles.tabsContentContainer}
      >
        <View style={customStyles.tabsWrapper}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                customStyles.tab,
                activeTab === tab.id && customStyles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon 
                name={tab.icon} 
                size={20} 
                color={activeTab === tab.id ? COLORS.text.light : `${COLORS.text.light}99`} 
              />
              <Text style={[
                customStyles.tabLabel,
                activeTab === tab.id && customStyles.activeTabLabel
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Horoscope Card */}
      <View style={customStyles.card}>
        <View style={customStyles.cardHeader}>
          <View style={customStyles.iconContainer}>
            <Icon 
              name={tabs.find(tab => tab.id === activeTab)?.icon || 'sun'} 
              size={24} 
              color={COLORS.text.light} 
            />
          </View>
          <View>
            <Text style={customStyles.cardTitle}>
              {tabs.find(tab => tab.id === activeTab)?.label} Horoscope
            </Text>
            <Text style={customStyles.signName}>
              {selectedSign?.name || 'Select a sign'}
            </Text>
          </View>
        </View>
        <Text style={customStyles.cardContent}>
          {current()?.forecast[activeTab] || 'Please select your zodiac sign to view your daily forecast.'}
        </Text>
      </View>
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: 'transparent',
  },
  signSelectorContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold as any,
    color: COLORS.text.light,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  tabsContainer: {
    marginBottom: SPACING.lg,
  },
  tabsContentContainer: {
    paddingBottom: SPACING.sm,
  },
  tabsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xs,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeTab: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabLabel: {
    marginLeft: SPACING.xs,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: `${COLORS.text.light}99`,
  },
  activeTabLabel: {
    color: COLORS.text.light,
    fontWeight: TYPOGRAPHY.fontWeight.medium as any,
  },
  card: {
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
    marginBottom: SPACING.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold as any,
    color: COLORS.text.light,
    marginBottom: 4,
  },
  signName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: `${COLORS.text.light}99`,
  },
  cardContent: {
    fontSize: TYPOGRAPHY.fontSize.md,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
    color: `${COLORS.text.light}CC`,
  },
});

export default DailyForecast; 