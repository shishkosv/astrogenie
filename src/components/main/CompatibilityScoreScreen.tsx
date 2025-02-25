import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import Icon from '../icons/Icon';
import type { RomanticCompatibilityResponse } from '../../types/responses/index';
import type { Aspect } from '../../types/base/WesternBaseTypes';

type CompatibilityScoreScreenRouteProp = RouteProp<RootStackParamList, 'CompatibilityScoreScreen'>;
type NavigationProp = StackNavigationProp<RootStackParamList>;

const CompatibilityScoreScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CompatibilityScoreScreenRouteProp>();
  const { result, person1Name, person2Name } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  // Calculate a color based on the compatibility score
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50'; // Green for high compatibility
    if (score >= 60) return '#8BC34A'; // Light green for good compatibility
    if (score >= 40) return '#FFC107'; // Amber for moderate compatibility
    if (score >= 20) return '#FF9800'; // Orange for low compatibility
    return '#F44336'; // Red for very low compatibility
  };

  const scoreColor = getScoreColor(result.overall_score);

  // Helper function to render aspects
  const renderAspects = (aspects: Aspect[]) => {
    return aspects.map((aspect, index) => (
      <View key={index} style={styles.aspectItem}>
        <View style={styles.aspectHeader}>
          <Text style={styles.aspectTitle}>
            {aspect.planet1} {aspect.aspect} {aspect.planet2}
          </Text>
        </View>
        <Text style={styles.aspectDescription}>
          {aspect.interpretation || `${aspect.planet1} ${aspect.aspect} ${aspect.planet2} (${aspect.orb.toFixed(2)}°)`}
        </Text>
      </View>
    ));
  };

  // Helper function to get all Venus-Mars aspects
  const getVenusMarsAspects = () => {
    // Check if venus_mars_aspects is an array (from RomanticCompatibilityResponse in specific file)
    if (Array.isArray(result.venus_mars_aspects)) {
      return result.venus_mars_aspects;
    }
    
    // Otherwise, it's the object structure from index.ts
    const venusMarsAspects = result.venus_mars_aspects as {
      person1_venus_aspects: Aspect[];
      person1_mars_aspects: Aspect[];
      person2_venus_aspects: Aspect[];
      person2_mars_aspects: Aspect[];
    };
    
    // Combine all aspects into a single array
    return [
      ...(venusMarsAspects.person1_venus_aspects || []),
      ...(venusMarsAspects.person1_mars_aspects || []),
      ...(venusMarsAspects.person2_venus_aspects || []),
      ...(venusMarsAspects.person2_mars_aspects || [])
    ];
  };

  return (
    <Layout>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
            <Icon name="arrow-left" size={24} color="#4a0e4e" />
            <Text style={styles.backButtonText}>Back to Compatibility</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Compatibility Results</Text>
          
          <View style={styles.namesContainer}>
            <Text style={styles.personName}>{person1Name}</Text>
            <Icon name="heart" size={24} color="#E91E63" />
            <Text style={styles.personName}>{person2Name}</Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Overall Compatibility</Text>
            <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
              <Text style={[styles.scoreValue, { color: scoreColor }]}>
                {result.overall_score}%
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="star" size={24} color="#6B46C1" />
              <Text style={styles.cardTitle}>Compatibility Aspects</Text>
            </View>
            
            {renderAspects(result.compatibility_aspects)}
          </View>

          {result.venus_mars_aspects && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="heart" size={24} color="#E91E63" />
                <Text style={styles.cardTitle}>Venus & Mars Aspects</Text>
              </View>
              
              {renderAspects(getVenusMarsAspects())}
            </View>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4a0e4e',
    marginLeft: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a0e4e',
    marginBottom: 20,
    textAlign: 'center',
  },
  namesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  personName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 10,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4a0e4e',
    marginLeft: 8,
  },
  aspectItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  aspectHeader: {
    marginBottom: 8,
  },
  aspectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  aspectDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default CompatibilityScoreScreen;
