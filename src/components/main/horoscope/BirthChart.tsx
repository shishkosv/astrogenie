import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, TouchableOpacity, Platform, Image } from 'react-native';
import { birthChartStyles as styles } from './styles/BirthChartStyles';
import { astrologyService, locationService } from '../../../services/serviceConfig';
import type { WesternChartResponse } from '../../../types/responses/WesternChartResponse';
import type { WesternChartRequest } from '../../../types/requests/WesternChartRequest';
import Icon from '../../icons/Icon';
import { Picker } from '@react-native-picker/picker';
import { House } from 'types/base/WesternBaseTypes';
import { Planet } from 'types/base/WesternBaseTypes';
import { AutocompleteCityInput } from '../../shared/AutocompleteCityInput';
import { DateTimePicker } from '../../shared/DateTimePicker';
import { CountrySelector } from '../../shared/CountrySelector';
import { birthChartData } from '../../../services/mockWesternAstrologyData';
import SvgImage from '../../shared/SvgImage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/AppNavigator';

type BirthChartNavigationProp = StackNavigationProp<RootStackParamList, 'BirthChart'>;

interface BirthChartFormProps {
  initialData?: Partial<WesternChartRequest>;
  onSubmit?: (data: WesternChartResponse) => void;
  onError?: (error: Error) => void;
  onLoadingChange?: (loading: boolean) => void;
  isLoading?: boolean;
  defaultHouseSystem?: 'placidus' | 'koch' | 'topocentric' | 'poryphry' | 'equal_house' | 'whole_sign';
  navigation?: BirthChartNavigationProp;
}

const defaultFormData: WesternChartRequest = {
  day: 1,
  month: 1,
  year: 2000,
  hour: 12,
  min: 0,
  lat: 0,
  lon: 0,
  tzone: 0,
  house_type: 'placidus'
};

const BirthChartForm: React.FC<BirthChartFormProps> = ({
  initialData,
  onSubmit,
  onError,
  onLoadingChange,
  isLoading: externalLoading,
  defaultHouseSystem = 'placidus'
}) => {
  const navigation = useNavigation<BirthChartNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<WesternChartResponse | null>(null);
  const [formData, setFormData] = useState<WesternChartRequest>({
    ...defaultFormData,
    ...initialData,
    house_type: initialData?.house_type || defaultHouseSystem
  });
  const [location, setLocation] = useState({
    city: '',
    country: locationService.countries[0].code
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const isLoading = externalLoading || loading;

  const handleSubmit = async () => {
    setLoading(true);
    onLoadingChange?.(true);
    setError(null);

    try {
      const response = await astrologyService.getBirthChart(formData);
      setChartData(response);
      onSubmit?.(response);
    } catch (err) {
      console.error('Error in fetchBirthChart:', err);
      const error = err instanceof Error ? err : new Error('Failed to fetch birth chart');
      setError(error.message);
      onError?.(error);
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  const handleLocationChange = async (city: string, country: string) => {
    try {
      const locationData = await locationService.getLocationData(city, country);
      setFormData(prev => ({
        ...prev,
        lat: locationData.lat,
        lon: locationData.lon,
        tzone: locationData.tzone
      }));
    } catch (error) {
      console.error('Error updating location:', error);
      // Handle error appropriately
    }
  };

  const handleDateChange = (selectedDate: Date) => {
    setShowDatePicker(false);
    setDate(selectedDate);
    setFormData(prev => ({
      ...prev,
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      day: selectedDate.getDate(),
      hour: selectedDate.getHours(),
      min: selectedDate.getMinutes()
    }));
  };

  const navigateToInterpretation = () => {
    navigation.navigate('BirthChartInterpretation');
  };

  const renderForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Enter Birth Details</Text>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>Date and Time of Birth</Text>
        <DateTimePicker
          value={date}
          onChange={handleDateChange}
          showPicker={showDatePicker}
          onPress={() => setShowDatePicker(true)}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>Location</Text>
        <View style={styles.locationInputs}>
          <CountrySelector
            value={location.country}
            onChange={(value) => {
              setLocation(prev => ({ ...prev, country: value, city: '' }));
            }}
            label="Country"
          />
          <AutocompleteCityInput
            value={location.city}
            onLocationSelect={(city, country) => {
              setLocation({ city, country });
              handleLocationChange(city, country);
            }}
            country={location.country}
            placeholder="Enter city name"
          />
        </View>
        <View style={styles.locationDetails}>
          <Text style={styles.locationText}>
            Latitude: {formData.lat.toFixed(4)}°
          </Text>
          <Text style={styles.locationText}>
            Longitude: {formData.lon.toFixed(4)}°
          </Text>
          <Text style={styles.locationText}>
            Timezone: GMT{formData.tzone >= 0 ? '+' : ''}{formData.tzone}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        onPress={handleSubmit}
        style={[
          styles.submitButton,
          isLoading && styles.submitButtonDisabled
        ]}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Calculating...' : 'Calculate Birth Chart'}
        </Text>
      </TouchableOpacity>
    </View>
  );

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
        
        {/* Get Interpretation Button */}
        <TouchableOpacity 
          style={styles.interpretationButton}
          onPress={navigateToInterpretation}
        >
          <Icon name="book-open" size={20} color="#FFFFFF" />
          <Text style={styles.interpretationButtonText}>Get Interpretation</Text>
        </TouchableOpacity>

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
                      {(planet as any).interpretation || `${planet.name} in ${planet.sign} represents ${planet.retrograde ? 'internalized' : 'expressed'} energy in the area of life governed by this planet.`}
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
                {birthChartData.houses.map((house) => (
                  <View key={house.house_number}>
                    <View style={styles.cardItem}>
                      <Text style={styles.itemName}>House {house.house_number}</Text>
                      <Text style={styles.itemDetail}>
                        {house.sign} {house.degree}° {house.minute}'
                      </Text>
                    </View>
                    <View style={styles.interpretationBlock}>
                      <Text style={styles.interpretation}>
                        {(house as any).interpretation || `House ${house.house_number} in ${house.sign} shows how ${house.sign} energy manifests in the ${getHouseDescription(house.house_number)} area of life.`}
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
                {birthChartData.aspects.map((aspect, index) => (
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
                        {(aspect as any).interpretation || `The ${aspect.aspect} between ${aspect.planet1} and ${aspect.planet2} indicates ${getAspectDescription(aspect.aspect)} between these planetary energies.`}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Card>
          </CardsContainer>
        </View>

        {/* Section 3: Detailed Interpretations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Interpretations</Text>
          <Card fullWidth>
            <View style={styles.cardHeader}>
              <Icon name="book" size={24} color="#CFA2FB" />
              <Text style={styles.cardTitle}>Chart Interpretation</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.sectionSubtitle}>Planetary Placements</Text>
              {chartData.planets.map((planet) => (
                <View key={planet.name} style={styles.interpretationBlock}>
                  <Text style={styles.interpretationTitle}>{planet.name} in {planet.sign}</Text>
                  <Text style={styles.interpretation}>
                    {getDetailedPlanetInterpretation(planet.name, planet.sign, planet.retrograde || false)}
                  </Text>
                </View>
              ))}
              
              <Text style={styles.sectionSubtitle}>House Placements</Text>
              {birthChartData.houses.map((house) => (
                <View key={house.house_number} style={styles.interpretationBlock}>
                  <Text style={styles.interpretationTitle}>House {house.house_number} in {house.sign}</Text>
                  <Text style={styles.interpretation}>
                    {getDetailedHouseInterpretation(house.house_number, house.sign)}
                  </Text>
                </View>
              ))}
              
              <Text style={styles.sectionSubtitle}>Major Aspects</Text>
              {birthChartData.aspects.map((aspect, index) => (
                <View key={index} style={styles.interpretationBlock}>
                  <Text style={styles.interpretationTitle}>
                    {aspect.planet1} {aspect.aspect} {aspect.planet2}
                  </Text>
                  <Text style={styles.interpretation}>
                    {getDetailedAspectInterpretation(aspect.planet1, aspect.planet2, aspect.aspect)}
                  </Text>
                </View>
              ))}
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

  const getDetailedPlanetInterpretation = (planet: string, sign: string, retrograde: boolean): string => {
    // This would ideally come from your astrological interpretation database
    return `${planet} in ${sign} ${retrograde ? '(Retrograde)' : ''} indicates how the energy of ${planet} expresses through the qualities of ${sign}. ${retrograde ? 'The retrograde motion suggests this energy is more internalized and reflective.' : 'This placement shows a direct expression of this planetary energy.'} This influences how you ${getPlanetFunction(planet)} in your life.`;
  };

  const getPlanetFunction = (planet: string): string => {
    const functions: Record<string, string> = {
      "Sun": "express your core identity and purpose",
      "Moon": "process emotions and seek security",
      "Mercury": "think and communicate",
      "Venus": "relate to others and experience pleasure",
      "Mars": "assert yourself and take action",
      "Jupiter": "expand and seek meaning",
      "Saturn": "create structure and accept responsibility",
      "Uranus": "innovate and seek freedom",
      "Neptune": "dream and connect spiritually",
      "Pluto": "transform and empower yourself"
    };
    return functions[planet] || "express yourself";
  };

  const getDetailedHouseInterpretation = (houseNumber: number, sign: string): string => {
    // This would ideally come from your astrological interpretation database
    return `House ${houseNumber} represents the area of life related to ${getHouseDescription(houseNumber)}. With ${sign} on the cusp of this house, you approach these matters with the qualities of ${sign}. This placement suggests that you ${getSignApproach(sign)} when dealing with ${getHouseDescription(houseNumber)}.`;
  };

  const getSignApproach = (sign: string): string => {
    const approaches: Record<string, string> = {
      "Aries": "take initiative and act boldly",
      "Taurus": "seek stability and practical solutions",
      "Gemini": "communicate and analyze intellectually",
      "Cancer": "nurture and protect emotionally",
      "Leo": "express yourself creatively and dramatically",
      "Virgo": "organize and perfect methodically",
      "Libra": "seek harmony and fair compromise",
      "Scorpio": "investigate deeply and transform",
      "Sagittarius": "explore and expand philosophically",
      "Capricorn": "build structured and disciplined foundations",
      "Aquarius": "innovate and approach unconventionally",
      "Pisces": "intuit and connect compassionately"
    };
    return approaches[sign] || "express the qualities of this sign";
  };

  const getDetailedAspectInterpretation = (planet1: string, planet2: string, aspect: string): string => {
    // This would ideally come from your astrological interpretation database
    return `The ${aspect} between ${planet1} and ${planet2} creates ${getAspectDescription(aspect)} between how you ${getPlanetFunction(planet1)} and how you ${getPlanetFunction(planet2)}. This aspect ${getAspectEffect(aspect)} in your chart.`;
  };

  const getAspectEffect = (aspect: string): string => {
    const effects: Record<string, string> = {
      "Conjunction": "intensifies and merges these energies",
      "Sextile": "creates opportunities for these energies to work together harmoniously",
      "Square": "creates tension that motivates growth through resolving conflicts",
      "Trine": "allows these energies to flow together effortlessly and supportively",
      "Opposition": "creates awareness through polarity and the need for balance",
      "Quincunx": "requires adjustments and flexibility between these different energies",
      "Semisextile": "creates a subtle connection requiring conscious integration",
      "Semisquare": "creates minor irritations that prompt personal growth",
      "Sesquiquadrate": "creates internal tension seeking creative resolution"
    };
    return effects[aspect] || "influences how these energies interact";
  };

  return (
    <ScrollView 
      style={[styles.container, { zIndex: 1 }]} 
      keyboardShouldPersistTaps="handled"
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#CFA2FB" />
          <Text style={styles.loadingText}>Calculating Birth Chart...</Text>
        </View>
      ) : !chartData ? (
        renderForm()
      ) : (
        <>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setChartData(null)}
          >
            <Icon name="arrow-left" size={20} color="#666" />
            <Text style={styles.backButtonText}>Back to Form</Text>
          </TouchableOpacity>

          {renderChartData()}
        </>
      )}
    </ScrollView>
  );
};

const additionalStyles = {
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartImage: {
    width: '100%',
    maxWidth: 500,
    height: 300,
    resizeMode: 'contain',
  },
};

export default BirthChartForm; 