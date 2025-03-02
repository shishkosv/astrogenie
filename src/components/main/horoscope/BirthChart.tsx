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
import { COLORS } from '../../../theme/colors';

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
        {isLoading ? (
          <ActivityIndicator color={COLORS.text.light} />
        ) : (
          <Text style={styles.submitButtonText}>
            Calculate Birth Chart
          </Text>
        )}
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
            borderRadius: 12,
            marginBottom: 16,
            overflow: 'hidden',
            flex: '0 0 calc(33.333% - 16px)',
            maxWidth: 'calc(33.333% - 16px)',
            borderWidth: '1px',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderStyle: 'solid',
            padding: 16,
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
          style={styles.interpretButton}
          onPress={navigateToInterpretation}
        >
          <Text style={styles.interpretButtonText}>
            Get Detailed Interpretation
          </Text>
        </TouchableOpacity>
        
        {/* Planets Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planets</Text>
          <CardsContainer>
            {chartData.planets.map((planet, index) => (
              <Card key={index}>
                <View style={styles.planetRow}>
                  <Icon name={planet.name.toLowerCase()} size={24} color={COLORS.accent.purple} />
                  <Text style={styles.planetName}>{planet.name}</Text>
                  <Text style={styles.planetInfo}>
                    {planet.sign} {planet.degree.toFixed(1)}° {planet.retrograde ? 'R' : ''}
                  </Text>
                </View>
              </Card>
            ))}
          </CardsContainer>
        </View>
        
        {/* Houses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Houses</Text>
          <CardsContainer>
            {chartData.houses.map((house, index) => (
              <Card key={index} halfWidth>
                <View style={styles.houseRow}>
                  <Text style={styles.houseNumber}>House {house.house_number}</Text>
                  <Text style={styles.houseInfo}>
                    {house.sign} {house.degree.toFixed(1)}°
                  </Text>
                </View>
              </Card>
            ))}
          </CardsContainer>
        </View>
      </>
    );
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.accent.purple} />
            <Text style={styles.loadingText}>Calculating birth chart...</Text>
          </View>
        ) : (
          <>
            {renderForm()}
            {chartData && renderChartData()}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default BirthChartForm; 