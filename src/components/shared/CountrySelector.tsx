import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { locationService } from '../../services/serviceConfig';
import { COLORS } from '../../theme/colors';
import { countrySelectorStyles as styles } from './styles/CountrySelectorStyles';

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
  error,
  label
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.pickerContainer, error && styles.errorBorder]}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor={COLORS.text.primary}
        >
          {locationService.countries.map(country => (
            <Picker.Item 
              key={country.code} 
              label={country.name} 
              value={country.code} 
              color={COLORS.text.primary}
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}; 