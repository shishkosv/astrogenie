import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Layout from '../../layout/Layout';
import { traitsStyles as styles } from './styles/SignTraitsStyles';
import Icon from '../../icons/Icon';

type TraitTabType = 'personality' | 'friendship' | 'love' | 'lifestyle' | 'health' | 'spirituality';

const traitTabs: { id: TraitTabType; label: string; icon: string }[] = [
  { id: 'personality', label: 'Personality Traits', icon: 'user' },
  { id: 'friendship', label: 'Friendship Compatibility', icon: 'users' },
  { id: 'love', label: 'Love Compatibility', icon: 'heart' },
  { id: 'lifestyle', label: 'Lifestyle', icon: 'coffee' },
  { id: 'health', label: 'Health', icon: 'activity' },
  { id: 'spirituality', label: 'Spirituality', icon: 'moon' },
];

const traitContent: Record<TraitTabType, string[]> = {
  personality: [
    "You are naturally curious and adaptable, with a quick wit and excellent communication skills.",
    "Your versatile nature allows you to excel in various situations and learn new skills quickly.",
    "You possess a dynamic personality that draws others to your engaging conversations and ideas."
  ],
  friendship: [
    "You form deep connections with those who can match your intellectual energy.",
    "Your social circle is diverse, reflecting your varied interests and adaptable nature.",
    "You value friends who can engage in meaningful conversations and share new experiences."
  ],
  love: [
    "You seek a partner who can keep up with your mental agility and need for variety.",
    "Your charm and wit make you attractive to potential partners.",
    "You value emotional connection combined with intellectual stimulation in relationships."
  ],
  lifestyle: [
    "Your lifestyle is characterized by variety and constant learning.",
    "You thrive in environments that offer flexibility and new experiences.",
    "Balance is important to you, though you tend to have multiple projects going at once."
  ],
  health: [
    "Your health benefits from activities that combine mental and physical engagement.",
    "Stress relief through creative outlets is particularly effective for you.",
    "You need variety in your exercise routine to stay motivated."
  ],
  spirituality: [
    "Your spiritual journey is marked by intellectual curiosity and philosophical exploration.",
    "You seek deeper meaning through learning and understanding different perspectives.",
    "Meditation and mindfulness practices can help center your active mind."
  ]
};

const SignTraits = () => {
  const [activeTab, setActiveTab] = useState<TraitTabType>('personality');

  const getRandomContent = (type: TraitTabType) => {
    const contents = traitContent[type];
    const randomIndex = Math.floor(Math.random() * contents.length);
    return contents[randomIndex];
  };

  return (
      <ScrollView style={styles.container}>
        {/* Traits Card */}
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
            {getRandomContent(activeTab)}
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