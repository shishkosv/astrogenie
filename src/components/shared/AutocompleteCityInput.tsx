import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { mockLocationService } from '../../services/mockLocationService';

interface AutocompleteCityInputProps {
  value: string;
  onLocationSelect: (city: string, country: string, lat: number, lon: number, timezone: number) => void;
  country?: string;
  placeholder?: string;
}

export const AutocompleteCityInput: React.FC<AutocompleteCityInputProps> = ({
  value,
  onLocationSelect,
  country,
  placeholder = 'Enter city name'
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const searchCities = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await mockLocationService.searchCities(query, country);
        setSuggestions(results);
      } catch (error) {
        console.error('Error searching cities:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchCities, 300);
    return () => clearTimeout(debounce);
  }, [query, country]);

  const handleSelect = (city: string, countryCode: string, lat: number = 0, lon: number = 0, timezone: number = 0) => {
    setQuery(city);
    setShowSuggestions(false);
    onLocationSelect(city, countryCode, lat, lon, timezone);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={text => {
          setQuery(text);
          setShowSuggestions(true);
        }}
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(true)}
      />
      
      {loading && <ActivityIndicator style={styles.loader} />}
      
      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => `${item.city}-${item.country}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelect(item.city, item.country)}
              >
                <Text style={styles.cityName}>
                  {item.city}{item.state ? `, ${item.state}` : ''}
                </Text>
                <Text style={styles.countryName}>
                  {mockLocationService.countries.find(c => c.code === item.country)?.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 2,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  loader: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    maxHeight: 200,
    zIndex: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cityName: {
    fontSize: 16,
    color: '#333',
  },
  countryName: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
}); 