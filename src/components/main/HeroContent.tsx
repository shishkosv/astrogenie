import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Button } from '../shared/Button';
import Icon from '../icons/Icon';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';

interface HeroContentProps {
  onStartReading: () => void;
  onLearnMore: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ 
  onStartReading, 
  onLearnMore 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Your personal{'\n'}
        astrological companion
      </Text>
      
      <Text style={styles.description}>
        Discover insights about your life, relationships, and future with our advanced astrological tools.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          variant="ghost" 
          size="lg" 
          onPress={onStartReading}
          style={styles.primaryButton}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Start your free reading</Text>
            <Icon name="chevron-right" size={16} color={COLORS.text.light} />
          </View>
        </Button>
        
        <Button 
          variant="ghost" 
          size="lg" 
          onPress={onLearnMore}
          style={styles.secondaryButton}
        >
          <Text style={styles.buttonText}>Learn more</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    alignSelf: 'center',
    ...(Platform.OS === 'web' && {
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
    }),
  },
  heading: {
    fontSize: Platform.OS === 'web' ? TYPOGRAPHY.fontSize.xxl : TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.light,
    marginBottom: SPACING.lg,
    lineHeight: Platform.OS === 'web' ? 56 : 40,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: `${COLORS.text.light}CC`,
    marginBottom: SPACING.xl,
    maxWidth: 450,
    lineHeight: TYPOGRAPHY.lineHeight.md,
  },
  buttonContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: SPACING.md,
    marginTop: SPACING.md,
    width: '100%',
    flexWrap: 'wrap',
    ...(Platform.OS === 'web' && {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '16px',
    }),
  },
  primaryButton: {
    marginBottom: Platform.OS === 'web' ? 0 : SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...(Platform.OS === 'web' && {
      flex: '1 1 200px',
      minWidth: '200px',
    }),
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...(Platform.OS === 'web' && {
      flex: '1 1 200px',
      minWidth: '200px',
    }),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    marginRight: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
});

export default HeroContent; 