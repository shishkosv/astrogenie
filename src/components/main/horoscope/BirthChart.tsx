import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, TouchableOpacity, Platform } from 'react-native';
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

interface BirthChartFormProps {
  initialData?: Partial<WesternChartRequest>;
  onSubmit?: (data: WesternChartResponse) => void;
  onError?: (error: Error) => void;
  onLoadingChange?: (loading: boolean) => void;
  isLoading?: boolean;
  defaultHouseSystem?: 'placidus' | 'koch' | 'topocentric' | 'poryphry' | 'equal_house' | 'whole_sign';
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

          {/* Planets Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Planetary Positions</Text>
            {chartData.planets.map((planet: Planet) => (
              <View key={planet.name} style={styles.planetRow}>
                <Icon name="star" size={20} color="#CFA2FB" />
                <Text style={styles.planetName}>{planet.name}</Text>
                <Text style={styles.planetInfo}>
                  {planet.sign} {planet.degree}° {planet.minute}'
                  {planet.retrograde && ' R'}
                </Text>
              </View>
            ))}
          </View>

          {/* Houses Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>House Cusps</Text>
            {chartData.houses.map((house: House) => (
              <View key={house.house_number} style={styles.houseRow}>
                <Text style={styles.houseNumber}>House {house.house_number}</Text>
                <Text style={styles.houseInfo}>
                  {house.sign} {house.degree}° {house.minute}'
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default BirthChartForm; 