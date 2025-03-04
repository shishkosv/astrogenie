import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { locationService } from '../../services/serviceConfig';
import { COLORS } from '../../theme/colors';
import { countrySelectorStyles as styles } from './styles/CountrySelectorStyles';
import { twMerge } from 'tailwind-merge';

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
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <select
          className={twMerge(
            "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
            error ? "border-red-500" : "border-white/20",
            "bg-transparent text-white placeholder-white/60",
            "hover:border-white/40 transition-colors duration-200"
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {locationService.countries.map(country => (
            <option 
              key={country.code} 
              value={country.code}
              className="bg-gray-900 text-white"
            >
              {country.name}
            </option>
          ))}
        </select>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.pickerContainer, error ? styles.errorBorder : null]}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
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