import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { useLanguage } from '../../../context/LanguageContext';
import { compatibilityStyles as styles } from '../styles/CompatibilityStyles';
import { astrologyService } from '../../../services/serviceConfig';
import type { BaseRequest } from '../../../types/base/WesternBaseTypes';
import type { RomanticCompatibilityRequest } from '../../../types/requests';
import { RomanticCompatibilityResponse } from '../../../types/responses/RomanticCompatibilityResponse';
import CompatibilityPartnerControl from './CompatibilityPartnerControl';
import Icon from '../../icons/Icon';
import { COLORS } from '../../../theme/colors';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface PersonFormData extends BaseRequest {
  city: string;
  country: string;
  name: string;
}

const defaultPersonData: PersonFormData = {
  day: 1,
  month: 1,
  year: 1990,
  hour: 12,
  min: 0,
  lat: 0,
  lon: 0,
  tzone: 0,
  city: '',
  country: 'US',
  name: ''
};

interface CompatibilityControlProps {
  onNavigateToResults?: (result: RomanticCompatibilityResponse, person1Name: string, person2Name: string) => void;
}

const CompatibilityControl: React.FC<CompatibilityControlProps> = ({ onNavigateToResults }) => {
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;

  const [person1, setPerson1] = useState<PersonFormData>({...defaultPersonData, name: 'Person 1'});
  const [person2, setPerson2] = useState<PersonFormData>({...defaultPersonData, name: 'Person 2'});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateCompatibility = async () => {
    if (!person1.city || !person2.city) {
      setError('Please enter location information for both people');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const request: RomanticCompatibilityRequest = {
        person1: {
          day: person1.day,
          month: person1.month,
          year: person1.year,
          hour: person1.hour,
          min: person1.min,
          lat: person1.lat,
          lon: person1.lon,
          tzone: person1.tzone
        },
        person2: {
          day: person2.day,
          month: person2.month,
          year: person2.year,
          hour: person2.hour,
          min: person2.min,
          lat: person2.lat,
          lon: person2.lon,
          tzone: person2.tzone
        },
        include_detailed_analysis: true
      };

      const result = await astrologyService.getRomanticCompatibility(request);
      
      // Either use the callback or navigate directly
      if (onNavigateToResults) {
        onNavigateToResults(result as RomanticCompatibilityResponse, person1.name, person2.name);
      } else {
        // Navigate to results screen with the data
        navigation.navigate('CompatibilityScoreScreen', { 
          result: result as RomanticCompatibilityResponse,
          person1Name: person1.name,
          person2Name: person2.name
        });
      }
    } catch (err) {
      console.error('Error calculating compatibility:', err);
      setError('An error occurred while calculating compatibility. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.partnersContainer}>
        <View style={styles.partnerColumn}>
          <CompatibilityPartnerControl 
            person={person1}
            onPersonChange={setPerson1}
            index={1}
          />
        </View>

        {isWideScreen && (
          <View style={styles.divider}>
            <Icon name="heart" size={24} color={COLORS.accent.purple} />
          </View>
        )}

        {!isWideScreen && (
          <Text style={styles.orText}>and</Text>
        )}

        <View style={styles.partnerColumn}>
          <CompatibilityPartnerControl 
            person={person2}
            onPersonChange={setPerson2}
            index={2}
          />
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.calculateButton}
        onPress={calculateCompatibility}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.text.light} />
        ) : (
          <Text style={styles.calculateButtonText}>
            Calculate Compatibility
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CompatibilityControl; 