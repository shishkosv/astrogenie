import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { mockLocationService } from '../../services/mockLocationService';
import { COLORS } from '../../theme/colors';
import { citySelectorStyles as styles } from './styles/CitySelectorStyles';

interface CitySelectorProps {
  value: string;
  onLocationSelect: (city: string, country: string, lat: number, lon: number, timezone: number) => void;
  country?: string;
  placeholder?: string;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
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
        placeholderTextColor={COLORS.text.mutedDark}
        onFocus={() => setShowSuggestions(true)}
      />
      
      {loading && <ActivityIndicator style={styles.loader} color={COLORS.accent.purple} />}
      
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