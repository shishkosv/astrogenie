import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { locationService } from '../../services/serviceConfig';

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
  label = 'Country'
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.pickerContainer, error && styles.errorBorder]}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
        >
          {locationService.countries.map(country => (
            <Picker.Item 
              key={country.code} 
              label={country.name} 
              value={country.code} 
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  picker: {
    height: 50,
  },
  errorBorder: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
  }
}); 