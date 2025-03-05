import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { useLanguage } from '../../context/LanguageContext';

interface FeatureSelectorProps {
  activeFeature: string;
  onFeatureChange: (feature: string) => void;
}

export function FeatureSelector({ activeFeature, onFeatureChange }: FeatureSelectorProps) {
  const { translations } = useLanguage();
  
  const features = [
    { value: 'daily', label: translations.featureDailyHoroscopes },
    { value: 'compatibility', label: translations.featureCompatibilityCheck },
    { value: 'birthchart', label: translations.featureBirthChart },
  ];

  // For web, we'll use a div with CSS for the responsive grid
  if (Platform.OS === 'web') {
    return (
      <div 
        style={{
          width: '100%',
        }}
      >
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {features.map((feature) => (
            <button
              key={feature.value}
              onClick={() => onFeatureChange(feature.value)}
              style={{
                padding: '12px',
                border: 'none',
                backgroundColor: activeFeature === feature.value ? 'white' : 'transparent',
                color: activeFeature === feature.value ? COLORS.gradient.via : COLORS.text.light,
                fontSize: TYPOGRAPHY.fontSize.md,
                fontWeight: TYPOGRAPHY.fontWeight.medium,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {feature.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // For mobile, we'll use React Native components
  return (
    <View style={styles.container}>
      <View style={styles.tabsList}>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.value}
            style={[
              styles.tabsTrigger,
              activeFeature === feature.value && styles.activeTabsTrigger
            ]}
            onPress={() => onFeatureChange(feature.value)}
            activeOpacity={0.7}
          >
            <Text 
              style={[
                styles.tabsText,
                activeFeature === feature.value && styles.activeTabsText
              ]}
            >
              {feature.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  tabsList: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: SPACING.radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  tabsTrigger: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabsTrigger: {
    backgroundColor: COLORS.text.light,
  },
  tabsText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium as any,
    color: COLORS.text.light,
    textAlign: 'center',
  },
  activeTabsText: {
    color: COLORS.gradient.via,
  },
});

export default FeatureSelector; 