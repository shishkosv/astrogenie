import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useLanguage } from '../../context/LanguageContext';
import Layout from '../layout/Layout';
import { subscriptionStyles as styles } from './styles/SubscriptionStyles';
import { Button } from '../shared/Button';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface PlanFeature {
  id: string;
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: PlanFeature[];
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    period: 'month',
    description: 'Perfect for beginners exploring astrology',
    features: [
      { id: '1', text: 'Daily Horoscopes', included: true },
      { id: '2', text: 'Basic Compatibility Check', included: true },
      { id: '3', text: 'Limited Tarot Readings', included: true },
      { id: '4', text: 'Advanced Predictions', included: false },
      { id: '5', text: 'Personal Consultations', included: false },
      { id: '6', text: 'Premium Reports', included: false },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 19.99,
    period: 'month',
    description: 'For enthusiasts seeking deeper insights',
    features: [
      { id: '1', text: 'Daily Horoscopes', included: true },
      { id: '2', text: 'Advanced Compatibility Check', included: true },
      { id: '3', text: 'Unlimited Tarot Readings', included: true },
      { id: '4', text: 'Advanced Predictions', included: true },
      { id: '5', text: 'Personal Consultations', included: false },
      { id: '6', text: 'Premium Reports', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 29.99,
    period: 'month',
    description: 'Complete astrological guidance experience',
    features: [
      { id: '1', text: 'Daily Horoscopes', included: true },
      { id: '2', text: 'Advanced Compatibility Check', included: true },
      { id: '3', text: 'Unlimited Tarot Readings', included: true },
      { id: '4', text: 'Advanced Predictions', included: true },
      { id: '5', text: 'Personal Consultations', included: true },
      { id: '6', text: 'Premium Reports', included: true },
    ],
  },
];

const Subscription = () => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string>('advanced');

  const handleSubscribe = (planId: string) => {
    // Implement subscription logic
    navigation.navigate('Checkout');
  };

  const renderFeature = (feature: PlanFeature) => (
    <View key={feature.id} style={styles.featureItem}>
      <Text style={[
        styles.featureText,
        !feature.included && styles.featureDisabled
      ]}>
        {feature.included ? '✓' : '×'} {feature.text}
      </Text>
    </View>
  );

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{translations.subscriptionPlans}</Text>
        <Text style={styles.subtitle}>{translations.choosePlan}</Text>

        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.selectedPlan
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currency}>$</Text>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>/{plan.period}</Text>
              </View>
              <Text style={styles.description}>{plan.description}</Text>
              
              <View style={styles.featuresContainer}>
                {plan.features.map(renderFeature)}
              </View>

              <Button
                variant="default"
                size="sm"
                onPress={() => handleSubscribe(plan.id)}
              >
                {translations.subscribe}
              </Button>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Subscription; 