import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Layout from '../../layout/Layout';
import { traitsStyles as styles } from './styles/SignTraitsStyles';
import Icon from '../../icons/Icon';
import { useZodiac } from '../../../context/ZodiacContext';
import { COLORS } from '../../../theme/colors';

type TraitTabType = 'personality' | 'friendship' | 'love' | 'lifestyle' | 'health' | 'spirituality';

const traitTabs: { id: TraitTabType; label: string; icon: string }[] = [
  { id: 'personality', label: 'Personality Traits', icon: 'user' },
  { id: 'friendship', label: 'Friendship Compatibility', icon: 'users' },
  { id: 'love', label: 'Love Compatibility', icon: 'heart' },
  { id: 'lifestyle', label: 'Lifestyle', icon: 'coffee' },
  { id: 'health', label: 'Health', icon: 'activity' },
  { id: 'spirituality', label: 'Spirituality', icon: 'moon' },
];

const SignTraits = () => {
  const [activeTab, setActiveTab] = useState<TraitTabType>('personality');
  const { current, selectedSign } = useZodiac();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Icon 
              name={traitTabs.find(tab => tab.id === activeTab)?.icon || 'user'} 
              size={24} 
              color={COLORS.text.light} 
            />
          </View>
          <View>
            <Text style={styles.cardTitle}>
              {traitTabs.find(tab => tab.id === activeTab)?.label}
            </Text>
            <Text style={styles.signName}>
              {selectedSign?.name || 'Select a sign'}
            </Text>
          </View>
        </View>
        <Text style={styles.cardContent}>
          {current()?.traits[activeTab] || 'Please select your zodiac sign to view your traits.'}
        </Text>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContentContainer}
      >
        <View style={styles.tabsWrapper}>
          {traitTabs.map((tab) => (
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
    </ScrollView>
  );
};

export default SignTraits; 