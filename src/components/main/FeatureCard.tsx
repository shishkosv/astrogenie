import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../shared/Button';
import { COLORS } from '../../theme/colors';

interface FeatureCardProps {
  title: string;
  description: string;
  onTryNow: () => void;
  tryNowText: string;
}

export function FeatureCard({ title, description, onTryNow, tryNowText }: FeatureCardProps) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>
        {description}
      </Text>
      <View style={styles.buttonContainer}>
        <Button 
          variant="ghost"
          size="sm"
          onPress={onTryNow}
          style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Text style={{ color: COLORS.text.light }}>{tryNowText}</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  featureItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flex: 1,
    minWidth: 280,
    marginHorizontal: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  buttonContainer: {
    marginTop: 16,
  },
}); 