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
import { DateTimePicker } from '../../shared/DateTimePicker';
import { CountrySelector } from '../../shared/CountrySelector';
import { birthChartData } from '../../../services/mockWesternAstrologyData';
import SvgImage from '../../shared/SvgImage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { COLORS } from '../../../theme/colors';
import { CitySelector } from '../../shared/CitySelector';

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

  // For web, we'll use a div with CSS grid for the form inputs
  const FormGrid = Platform.OS === 'web'
    ? (props: any) => (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          width: '100%',
          marginBottom: '16px'
        }}>
          {props.children}
        </div>
      )
    : (props: any) => (
        <View style={styles.formGrid}>
          {props.children}
        </View>
      );

  // For web, we'll use a div for each form field
  const FormField = Platform.OS === 'web'
    ? (props: any) => (
        <div style={{ width: '100%', ...(props.style || {}) }}>
          {props.children}
        </div>
      )
    : (props: any) => (
        <View style={[styles.formField, props.style]}>
          {props.children}
        </View>
      );

  const renderForm = () => (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Birth Chart</Text>
        
        <FormGrid>
          <FormField>
            <Text style={styles.fieldLabel}>Birth Date</Text>
            <View style={styles.input}>
              <DateTimePicker
                value={date}
                onChange={handleDateChange}
                showPicker={showDatePicker}
                onPress={() => setShowDatePicker(true)}
              />
            </View>
          </FormField>

          <FormField>
            <Text style={styles.fieldLabel}>Birth Time</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              placeholderTextColor={`${COLORS.text.light}60`}
              value={`${formData.hour.toString().padStart(2, '0')}:${formData.min.toString().padStart(2, '0')}`}
              onChangeText={(text) => {
                const [hours, minutes] = text.split(':').map(Number);
                if (!isNaN(hours) && !isNaN(minutes)) {
                  setFormData(prev => ({
                    ...prev,
                    hour: hours,
                    min: minutes
                  }));
                }
              }}
            />
          </FormField>

          <FormField>
            <Text style={styles.fieldLabel}>Country</Text>
            <View style={styles.input}>
              <CountrySelector
                value={location.country}
                onChange={(value) => {
                  setLocation(prev => ({ ...prev, country: value, city: '' }));
                }}
                label="Select country"
              />
            </View>
          </FormField>
        </FormGrid>

        <FormGrid>
          <FormField style={{ width: '100%' }}>
            <Text style={styles.fieldLabel}>City</Text>
            <View style={styles.input}>
              <CitySelector
                value={location.city}
                onLocationSelect={(city, country, lat, lon, timezone) => {
                  setLocation({ city, country });
                  handleLocationChange(city, country);
                }}
                country={location.country}
                placeholder="Enter birth city"
              />
            </View>
          </FormField>
        </FormGrid>

        {formData.lat !== 0 && formData.lon !== 0 && (
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
        )}

        <View style={styles.chartPreview}>
          <View style={styles.chartCircleOuter}>
            <View style={styles.chartCircleInner}>
              <Text style={styles.chartText}>Birth Chart</Text>
            </View>
          </View>
          
          <Text style={styles.chartDescription}>
            Enter your birth details to generate your complete astrological profile
          </Text>
          
          <TouchableOpacity 
            onPress={handleSubmit}
            style={[
              styles.generateButton,
              isLoading && styles.generateButtonDisabled
            ]}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.accent.purple} />
            ) : (
              <Text style={styles.generateButtonText}>
                Generate Birth Chart
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderChartData = () => {
    if (!chartData) return null;

    // Use different image paths for web and native
    const natalChartImage = Platform.OS === 'web' 
      ? '/static/media/natal_card.d195ff83.svg'  // Web path
      : require('../../../assets/natal_card.svg'); // Native path using require

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Birth Chart</Text>
        
        <View style={styles.chartContainer}>
          <SvgImage 
            source={natalChartImage}
            width="100%"
            height={300}
            style={styles.chartImage}
          />
        </View>
        
        {/* Planets Section */}
        <View style={styles.dataSection}>
          <Text style={styles.dataSectionTitle}>Planets</Text>
          {chartData.planets.map((planet: Planet) => (
            <View key={planet.name} style={styles.planetRow}>
              <Text style={styles.planetName}>{planet.name}</Text>
              <Text style={styles.planetInfo}>
                {planet.sign} {planet.degree.toFixed(1)}° {planet.retrograde ? 'R' : ''}
              </Text>
            </View>
          ))}
        </View>
        
        {/* Houses Section */}
        <View style={styles.dataSection}>
          <Text style={styles.dataSectionTitle}>Houses</Text>
          {chartData.houses.map((house: House) => (
            <View key={house.house_number} style={styles.houseRow}>
              <Text style={styles.houseNumber}>House {house.house_number}</Text>
              <Text style={styles.houseInfo}>
                {house.sign} {house.degree.toFixed(1)}°
              </Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.interpretButton}
          onPress={navigateToInterpretation}
        >
          <Text style={styles.interpretButtonText}>
            Get Detailed Interpretation
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      {renderForm()}
      {chartData && renderChartData()}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const BirthChart = BirthChartForm;
export default BirthChart; 