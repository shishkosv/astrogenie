import React, { useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { Button } from '../../shared/Button';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { StyleSheet } from 'react-native';

interface TarotCardProps {
  reading: {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    yearlyPrice?: number;
    icon: React.JSX.Element;
  };
  index: number;
  onPress: (reading: TarotCardProps['reading']) => void;
}

export const TarotCard = ({ reading, index, onPress }: TarotCardProps) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ scale: scaleAnim }],
          opacity: index === 0 ? 0 : 1,
        },
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.cardInner,
          isPressed && styles.cardPressed,
        ]}
        onPress={() => onPress(reading)}
      >
        <View style={styles.gradientOverlay}>
          <View style={styles.topGradient} />
          <View style={styles.bottomGradient} />
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              {reading.icon}
            </View>
          </View>
          <Text style={styles.title}>{reading.title}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${reading.price}</Text>
            {reading.yearlyPrice && (
              <Text style={styles.yearlyPrice}>
                — or ${reading.yearlyPrice}/year
              </Text>
            )}
          </View>

          <Button
            variant="secondary"
            size="sm"
            onPress={() => onPress(reading)}
          >
            View Details
          </Button>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 350,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardInner: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  cardPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  topGradient: {
    position: 'absolute',
    right: -48,
    top: -48,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    opacity: 0.5,
  },
  bottomGradient: {
    position: 'absolute',
    left: -32,
    bottom: -32,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.3,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    color: COLORS.text.light,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.muted,
    marginBottom: 16,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: '700',
    color: COLORS.accent.purple,
    marginRight: 8,
  },
  yearlyPrice: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.muted,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 