import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { birthChartStyles as styles } from './styles/BirthChartStyles';
import { astrologyService } from '../../../services/serviceConfig';
import type { ChartInterpretationResponse } from '../../../types/responses/ChartInterpretationResponse';
import type { ChartInterpretationRequest } from '../../../types/requests/ChartInterpretationRequest';
import Icon from '../../icons/Icon';
import SvgImage from '../../shared/SvgImage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/AppNavigator';

type BirthChartInterpretationNavigationProp = StackNavigationProp<RootStackParamList, 'BirthChartInterpretation'>;

interface BirthChartInterpretationProps {
  onError?: (error: Error) => void;
  isLoading?: boolean;
}

// Default data for chart interpretation
const defaultChartRequest: ChartInterpretationRequest = {
  day: 15,
  month: 5,
  year: 1990,
  hour: 12,
  min: 0,
  lat: 40.7128,
  lon: -74.0060,
  tzone: -4,
  house_type: 'placidus',
  language: 'en'
};

const BirthChartInterpretation: React.FC<BirthChartInterpretationProps> = ({
  onError,
  isLoading: externalLoading
}) => {
  const navigation = useNavigation<BirthChartInterpretationNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartInterpretationResponse | null>(null);

  const isLoading = externalLoading || loading;

  // Load chart interpretation data on component mount
  useEffect(() => {
    loadChartInterpretation();
  }, []);

  const loadChartInterpretation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await astrologyService.getChartInterpretationData(defaultChartRequest);
      setChartData(response);
    } catch (err) {
      console.error('Error in fetchChartInterpretation:', err);
      const error = err instanceof Error ? err : new Error('Failed to fetch chart interpretation');
      setError(error.message);
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const renderChartData = () => {
    if (!chartData) return null;

    // Use different image paths for web and native
    const natalChartImage = Platform.OS === 'web' 
      ? '/static/media/natal_card.d195ff83.svg'  // Web path
      : require('../../../assets/natal_card.svg'); // Native path using require

    // Web-specific card styles
    const webCardStyle = Platform.OS === 'web' ? { 
      flex: 1,
      width: '30%',
      minWidth: 250,
    } : {};

    // For web, we'll use a div for the cards container
    const CardsContainer = Platform.OS === 'web' 
      ? (props: any) => (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 24,
            gap: 16
          }}>
            {props.children}
          </div>
        )
      : (props: any) => <View style={styles.cardsContainer}>{props.children}</View>;

    // For web, we'll use a div for each card
    const Card = Platform.OS === 'web'
      ? (props: any) => (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: 16,
            overflow: 'hidden',
            flex: '0 0 calc(33.333% - 16px)',
            maxWidth: 'calc(33.333% - 16px)',
            ...(props.fullWidth ? { flex: '0 0 100%', maxWidth: '100%' } : {}),
            ...(props.halfWidth ? { flex: '0 0 calc(50% - 8px)', maxWidth: 'calc(50% - 8px)' } : {}),
          }}>
            {props.children}
          </div>
        )
      : (props: any) => <View style={[styles.card, props.fullWidth ? styles.fullWidthCard : props.halfWidth ? styles.halfWidthCard : {}]}>{props.children}</View>;

    return (
      <>
        {/* Birth Chart Wheel Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Birth Chart Wheel</Text>
          <View style={styles.chartContainer}>
            <SvgImage 
              source={natalChartImage}
              width="100%"
              height={300}
              style={styles.chartImage}
            />
          </View>
        </View>

        {/* Section 1: Planetary Positions (Full Width) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planetary Positions</Text>
          <Card fullWidth>
            <View style={styles.cardHeader}>
              <Icon name="star" size={24} color="#CFA2FB" />
              <Text style={styles.cardTitle}>Planets in Signs</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Planet</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Sign</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Degree</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Status</Text>
              </View>
              {chartData.planets.map((planet) => (
                <View key={planet.name}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{planet.name}</Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{planet.sign}</Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{planet.degree}° {planet.minute}'</Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{planet.retrograde ? 'Retrograde' : 'Direct'}</Text>
                  </View>
                  <View style={styles.interpretationBlock}>
                    <Text style={styles.interpretation}>
                      {planet.interpretation || `${planet.name} in ${planet.sign} represents ${planet.retrograde ? 'internalized' : 'expressed'} energy in the area of life governed by this planet.`}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Section 2: Houses and Aspects (Two Cards Side by Side) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Houses & Aspects</Text>
          <CardsContainer>
            {/* Houses Card */}
            <Card halfWidth>
              <View style={styles.cardHeader}>
                <Icon name="home" size={24} color="#CFA2FB" />
                <Text style={styles.cardTitle}>House Cusps</Text>
              </View>
              <View style={styles.cardContent}>
                {chartData.houses.map((house) => (
                  <View key={house.house_number}>
                    <View style={styles.cardItem}>
                      <Text style={styles.itemName}>House {house.house_number}</Text>
                      <Text style={styles.itemDetail}>
                        {house.sign} {house.degree}° {house.minute}'
                      </Text>
                    </View>
                    <View style={styles.interpretationBlock}>
                      <Text style={styles.interpretation}>
                        {house.interpretation || `House ${house.house_number} in ${house.sign} shows how ${house.sign} energy manifests in the ${getHouseDescription(house.house_number)} area of life.`}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Card>

            {/* Aspects Card */}
            <Card halfWidth>
              <View style={styles.cardHeader}>
                <Icon name="link" size={24} color="#CFA2FB" />
                <Text style={styles.cardTitle}>Major Aspects</Text>
              </View>
              <View style={styles.cardContent}>
                {chartData.aspects.map((aspect, index) => (
                  <View key={index}>
                    <View style={styles.cardItem}>
                      <Text style={styles.itemName}>
                        {aspect.planet1} {aspect.aspect} {aspect.planet2}
                      </Text>
                      <Text style={styles.itemDetail}>
                        Orb: {aspect.orb}°
                      </Text>
                    </View>
                    <View style={styles.interpretationBlock}>
                      <Text style={styles.interpretation}>
                        {aspect.interpretation || `The ${aspect.aspect} between ${aspect.planet1} and ${aspect.planet2} indicates ${getAspectDescription(aspect.aspect)} between these planetary energies.`}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Card>
          </CardsContainer>
        </View>

        {/* Section 3: Additional Interpretation Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chart Analysis</Text>
          <CardsContainer>
            {/* Moon Phase Card */}
            <Card halfWidth>
              <View style={styles.cardHeader}>
                <Icon name="moon" size={24} color="#CFA2FB" />
                <Text style={styles.cardTitle}>Moon Phase</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.cardItem}>
                  <Text style={styles.itemName}>{chartData.moon_phase.moon_phase_name}</Text>
                </View>
                <View style={styles.interpretationBlock}>
                  <Text style={styles.interpretation}>
                    {chartData.moon_phase.moon_phase_description}
                  </Text>
                </View>
              </View>
            </Card>

            {/* Elements Card */}
            <Card halfWidth>
              <View style={styles.cardHeader}>
                <Icon name="fire" size={24} color="#CFA2FB" />
                <Text style={styles.cardTitle}>Elemental Balance</Text>
              </View>
              <View style={styles.cardContent}>
                {chartData.elements.elements.map((element, index) => (
                  <View key={index} style={styles.cardItem}>
                    <Text style={styles.itemName}>{element.name}</Text>
                    <Text style={styles.itemDetail}>{element.percentage}%</Text>
                  </View>
                ))}
                <View style={styles.interpretationBlock}>
                  <Text style={styles.interpretation}>
                    {chartData.elements.description}
                  </Text>
                </View>
              </View>
            </Card>
          </CardsContainer>
        </View>

        {/* Section 4: Modes and Hemispheres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chart Patterns</Text>
          <CardsContainer>
            {/* Modes Card */}
            <Card halfWidth>
              <View style={styles.cardHeader}>
                <Icon name="activity" size={24} color="#CFA2FB" />
                <Text style={styles.cardTitle}>Modality Balance</Text>
              </View>
              <View style={styles.cardContent}>
                {chartData.modes.modes.map((mode, index) => (
                  <View key={index} style={styles.cardItem}>
                    <Text style={styles.itemName}>{mode.name}</Text>
                    <Text style={styles.itemDetail}>{mode.percentage}%</Text>
                  </View>
                ))}
                <View style={styles.interpretationBlock}>
                  <Text style={styles.interpretation}>
                    {chartData.modes.description}
                  </Text>
                </View>
              </View>
            </Card>

            {/* Hemispheres Card */}
            <Card halfWidth>
              <View style={styles.cardHeader}>
                <Icon name="globe" size={24} color="#CFA2FB" />
                <Text style={styles.cardTitle}>Hemispheric Emphasis</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.cardItem}>
                  <Text style={styles.itemName}>East-West Balance</Text>
                </View>
                <View style={styles.interpretationBlock}>
                  <Text style={styles.interpretation}>
                    {chartData.hemisphere.east_west.description}
                  </Text>
                </View>
                <View style={styles.cardItem}>
                  <Text style={styles.itemName}>North-South Balance</Text>
                </View>
                <View style={styles.interpretationBlock}>
                  <Text style={styles.interpretation}>
                    {chartData.hemisphere.north_south.description}
                  </Text>
                </View>
              </View>
            </Card>
          </CardsContainer>
        </View>

        {/* Section 5: Dominant Sign */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dominant Influence</Text>
          <Card fullWidth>
            <View style={styles.cardHeader}>
              <Icon name="award" size={24} color="#CFA2FB" />
              <Text style={styles.cardTitle}>Dominant Sign</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardItem}>
                <Text style={styles.itemName}>{chartData.dominant_sign.sign_name}</Text>
                <Text style={styles.itemDetail}>{chartData.dominant_sign.percentage}% influence</Text>
              </View>
              <View style={styles.interpretationBlock}>
                <Text style={styles.interpretation}>
                  {`Your chart is dominated by ${chartData.dominant_sign.sign_name} energy, which suggests that the qualities of this sign are particularly emphasized in your personality and life expression.`}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </>
    );
  };

  // Helper functions for interpretations
  const getHouseDescription = (houseNumber: number): string => {
    const descriptions = [
      "self and identity", // 1st house
      "resources and values", // 2nd house
      "communication and learning", // 3rd house
      "home and family", // 4th house
      "creativity and pleasure", // 5th house
      "health and service", // 6th house
      "relationships and partnerships", // 7th house
      "transformation and shared resources", // 8th house
      "philosophy and higher learning", // 9th house
      "career and public image", // 10th house
      "community and aspirations", // 11th house
      "spirituality and unconscious" // 12th house
    ];
    return descriptions[houseNumber - 1] || "unknown";
  };

  const getAspectDescription = (aspect: string): string => {
    const descriptions: Record<string, string> = {
      "Conjunction": "a powerful fusion and intensification",
      "Sextile": "a harmonious opportunity for growth",
      "Square": "a challenging tension that motivates action",
      "Trine": "a natural flow of supportive energy",
      "Opposition": "a dynamic polarity seeking balance",
      "Quincunx": "an awkward adjustment between energies",
      "Semisextile": "a subtle connection requiring awareness",
      "Semisquare": "a minor irritation prompting growth",
      "Sesquiquadrate": "an internal tension seeking resolution"
    };
    return descriptions[aspect] || "an interaction";
  };

  return (
    <ScrollView 
      style={[styles.container, { zIndex: 1 }]} 
      keyboardShouldPersistTaps="handled"
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#CFA2FB" />
          <Text style={styles.loadingText}>Loading Chart Interpretation...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={48} color="#FF6B6B" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={loadChartInterpretation}
          >
            <Text style={styles.submitButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={navigateBack}
          >
            <Icon name="arrow-left" size={20} color="#666" />
            <Text style={styles.backButtonText}>Back to Birth Chart</Text>
          </TouchableOpacity>

          {renderChartData()}
        </>
      )}
    </ScrollView>
  );
};

export default BirthChartInterpretation; 