import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { DateTimePicker } from '../../shared/DateTimePicker';
import { CitySelector } from '../../shared/CitySelector';
import { CountrySelector } from '../../shared/CountrySelector';
import Icon from '../../icons/Icon';
import { compatibilityStyles as styles } from './styles/CompatibilityStyles';
import type { BaseRequest } from '../../../types/base/WesternBaseTypes';
import { COLORS } from '../../../theme/colors';

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
        <Icon name="user" size={24} color={COLORS.accent.purple} />
        <Text style={[styles.sectionTitle, { color: COLORS.text.light }]}>{person.name}</Text>
      </View>
      
      <View style={styles.inputGroup}>
        <View style={styles.inputRow}>
          <Text style={[styles.fieldLabel, { color: COLORS.text.light }]}>Name</Text>
          <TextInput
            style={[styles.input, { color: COLORS.text.light }]}
            value={person.name}
            onChangeText={(text) => onPersonChange({...person, name: text})}
            placeholder="Enter name"
            placeholderTextColor={COLORS.text.muted}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={[styles.fieldLabel, { color: COLORS.text.light }]}>Birth Date & Time</Text>
          <View style={styles.input}>
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
              onPress={() => setShowDatePicker(true)}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={[styles.fieldLabel, { color: COLORS.text.light }]}>Country</Text>
          <View style={styles.input}>
            <CountrySelector
              value={person.country}
              onChange={(value) => onPersonChange({...person, country: value})}
              label="Select country"
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={[styles.fieldLabel, { color: COLORS.text.light }]}>City</Text>
          <View style={styles.input}>
            <CitySelector
              value={person.city}
              onLocationSelect={handleLocationSelect}
              country={person.country}
              placeholder="Enter birth city"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CompatibilityPartnerControl; 