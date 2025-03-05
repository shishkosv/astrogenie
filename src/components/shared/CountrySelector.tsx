import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { locationService } from '../../services/serviceConfig';
import { COLORS } from '../../theme/colors';
import { inputStyles as styles } from './styles/InputStyles';

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
      <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.input}
          dropdownIconColor={COLORS.text.light}
        >
          {locationService.countries.map(country => (
            <Picker.Item 
              key={country.code} 
              label={country.name} 
              value={country.code} 
              color={COLORS.text.light}
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}; 