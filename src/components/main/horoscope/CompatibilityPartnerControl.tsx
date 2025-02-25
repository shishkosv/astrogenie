import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { DateTimePicker } from '../../shared/DateTimePicker';
import { CountrySelector } from '../../shared/CountrySelector';
import { AutocompleteCityInput } from '../../shared/AutocompleteCityInput';
import Icon from '../../icons/Icon';
import { compatibilityStyles as styles } from '../styles/CompatibilityStyles';
import type { BaseRequest } from '../../../types/base/WesternBaseTypes';

interface PersonFormData extends BaseRequest {
  city: string;
  country: string;
  name: string;
}

interface CompatibilityPartnerControlProps {
  person: PersonFormData;
  onPersonChange: (person: PersonFormData) => void;
  index: number;
}

export const CompatibilityPartnerControl: React.FC<CompatibilityPartnerControlProps> = ({
  person,
  onPersonChange,
  index
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLocationSelect = (city: string, country: string, lat: number, lon: number, timezone: number) => {
    onPersonChange({
      ...person,
      city,
      country,
      lat,
      lon,
      tzone: timezone
    });
  };

  const handleDateChange = (date: Date) => {
    onPersonChange({
      ...person,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      hour: date.getHours(),
      min: date.getMinutes()
    });
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  return (
    <View style={styles.formSection}>
      <View style={styles.personHeader}>
        <Icon name="user" size={24} color="#6B46C1" />
        <Text style={styles.sectionTitle}>{person.name}</Text>
      </View>
      
      <View style={styles.inputRow}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          value={person.name}
          onChangeText={(text) => onPersonChange({...person, name: text})}
          placeholder="Enter name"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Birth Date & Time</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {new Date(
              person.year, 
              person.month - 1, 
              person.day, 
              person.hour, 
              person.min
            ).toLocaleString()}
          </Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={new Date(
              person.year, 
              person.month - 1, 
              person.day, 
              person.hour, 
              person.min
            )}
            onChange={handleDateChange}
            showPicker={showDatePicker}
            onPress={() => setShowDatePicker(false)}
          />
        )}
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Country</Text>
        <CountrySelector
          value={person.country}
          onChange={(value) => onPersonChange({...person, country: value})}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>City</Text>
        <AutocompleteCityInput
          value={person.city}
          onLocationSelect={handleLocationSelect}
          country={person.country}
          placeholder="Enter birth city"
        />
      </View>
    </View>
  );
};

export default CompatibilityPartnerControl; 