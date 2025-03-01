import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Button } from '../shared/Button';
import Icon from '../icons/Icon';

// Import images
import androidBadge from '../../assets/images/download_ android.png';
import iosBadge from '../../assets/images/download_ios.png';

interface FeatureCardProps {
  title: string;
  description: string;
  gradientColor: string;
}

const FeatureCard = ({ title, description, gradientColor }: FeatureCardProps) => {
  return (
    <View style={[styles.featureCard, { backgroundColor: gradientColor }]}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
};

interface DownloadButtonProps {
  platform: 'iOS' | 'Android';
  variant?: 'primary' | 'secondary';
}

const DownloadButton = ({ platform, variant = 'primary' }: DownloadButtonProps) => {
  const image = platform === 'iOS' ? iosBadge : androidBadge;
  
  return (
    <TouchableOpacity>
      <Image 
        source={image as ImageSourcePropType}
        style={styles.storeButton}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export function FeaturesCards() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.textSection}>
            <Text style={styles.heading}>Take AstroConnect with you</Text>
            <Text style={styles.description}>
              Get personalized astrological insights wherever you go with our mobile app.
            </Text>
            <View style={styles.downloadButtons}>
              <DownloadButton platform="iOS" />
              <DownloadButton platform="Android" variant="secondary" />
            </View>
          </View>
          
          <View style={styles.featuresGrid}>
            <FeatureCard
              title="Daily Readings"
              description="Personalized insights every day"
              gradientColor="rgba(111, 76, 255, 0.3)"
            />
            <FeatureCard
              title="Compatibility"
              description="Discover your perfect match"
              gradientColor="rgba(76, 111, 255, 0.3)"
            />
            <FeatureCard
              title="Birth Charts"
              description="Detailed astrological analysis"
              gradientColor="rgba(111, 76, 255, 0.3)"
            />
            <FeatureCard
              title="Notifications"
              description="Never miss an important transit"
              gradientColor="rgba(76, 111, 255, 0.3)"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flexDirection: 'column',
  },
  textSection: {
    marginBottom: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
    fontSize: 16,
  },
  downloadButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 16,
  },
  storeButton: {
    height: 40,
    width: 135,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
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
});

export default FeaturesCards; 