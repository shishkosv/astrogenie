import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Layout from '../../layout/Layout';
import { traitsStyles as styles } from './styles/SignTraitsStyles';
import Icon from '../../icons/Icon';
import { useZodiac } from '../../../context/ZodiacContext';

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
  const { current } = useZodiac();

  return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon 
              name={traitTabs.find(tab => tab.id === activeTab)?.icon || 'user'} 
              size={24} 
              color="#CFA2FB" 
            />
            <Text style={styles.cardTitle}>
              {traitTabs.find(tab => tab.id === activeTab)?.label}
            </Text>
          </View>
          <Text style={styles.cardContent}>
            {current()?.traits[activeTab] || 'Select a zodiac sign to see traits'}
          </Text>
        </View>

        {/* Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
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
      </ScrollView>
  );
};

export default SignTraits; 