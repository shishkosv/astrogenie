import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { authStyles } from './styles';
import { Button } from '../shared/Button';
import { registrationStyles as styles } from './styles/RegistrationStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '../icons/Icon';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Spain', 'Italy', 'Japan', 'China', 'India', 'Brazil',
  // Add more countries as needed
];

const hours = Array.from({ length: 24 }, (_, i) => ({
  label: i < 10 ? `0${i}:00` : `${i}:00`,
  value: i
}));

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthHour, setBirthHour] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showHourDropdown, setShowHourDropdown] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    country?: string;
    city?: string;
    birthDate?: string;
  }>({});

  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { signup } = useAuth();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    // Country validation
    if (!country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    // City validation
    if (!city) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    // Birth date validation
    if (!birthDate) {
      newErrors.birthDate = 'Date of birth is required';
      isValid = false;
    } else {
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        newErrors.birthDate = 'You must be at least 13 years old';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await signup(email, password, name);
      navigation.navigate('Home');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleSocialSignup = (provider: 'google' | 'facebook') => {
    try {
      // Implement social signup logic here
      console.log(`Signing up with ${provider}`);
    } catch (err) {
      setError(`${provider} registration failed. Please try again.`);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>{translations.register}</Text>
          
          <View style={styles.columnsWrapper}>
            {/* Left Column */}
            <View style={styles.column}>
              <View style={styles.inputField}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <View style={styles.inputField}>
                <Text style={styles.label}>Password *</Text>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Enter your password"
                  secureTextEntry
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {/* Country Dropdown */}
              <View style={styles.inputField}>
                <Text style={styles.label}>Country of Birth *</Text>
                <TouchableOpacity
                  style={[styles.dropdown, errors.country && styles.inputError]}
                  onPress={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <Text style={styles.dropdownText}>
                    {country || 'Select country'}
                  </Text>
                  <Icon name={showCountryDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="#666" />
                </TouchableOpacity>
                {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
                {showCountryDropdown && (
                  <View style={styles.dropdownList}>
                    {countries.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setCountry(item);
                          setShowCountryDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* City Input */}
              <View style={styles.inputField}>
                <Text style={styles.label}>City *</Text>
                <TextInput
                  style={[styles.input, errors.city && styles.inputError]}
                  value={city}
                  onChangeText={(text) => {
                    setCity(text);
                    setErrors(prev => ({ ...prev, city: undefined }));
                  }}
                  placeholder="Enter your city"
                />
                {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
              </View>

              {/* Date of Birth Picker */}
              <View style={styles.inputField}>
                <Text style={styles.label}>Date of Birth *</Text>
                <TouchableOpacity
                  style={[styles.datePickerButton, errors.birthDate && styles.inputError]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.datePickerText}>
                    {formatDate(birthDate)}
                  </Text>
                  <Icon name="calendar" size={20} color="#666" />
                </TouchableOpacity>
                {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}
                {showDatePicker && (
                  <DateTimePicker
                    value={birthDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setBirthDate(selectedDate);
                      }
                    }}
                  />
                )}
              </View>

              {/* Hour of Birth Dropdown */}
              <View style={styles.inputField}>
                <Text style={styles.label}>Hour of Birth</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowHourDropdown(!showHourDropdown)}
                >
                  <Text style={styles.dropdownText}>
                    {hours[birthHour].label}
                  </Text>
                  <Icon name={showHourDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="#666" />
                </TouchableOpacity>
                {showHourDropdown && (
                  <View style={styles.dropdownList}>
                    {hours.map((hour) => (
                      <TouchableOpacity
                        key={hour.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setBirthHour(hour.value);
                          setShowHourDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{hour.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* Right Column - Social Registration */}
            <View style={styles.column}>
              <View style={styles.socialWrapper}>
                <Text style={styles.socialTitle}>Or register with</Text>
                <View style={styles.socialButtons}>
                  <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => handleSocialSignup('google')}
                  >
                    <Image 
                      source={require('../../assets/images/download_ios.png')} 
                      style={styles.socialIcon} 
                    />
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => handleSocialSignup('facebook')}
                  >
                    <Image 
                      source={require('../../assets/images/download_ios.png')} 
                      style={styles.socialIcon} 
                    />
                    <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <Button
              variant="secondary"
              size="lg"
              onPress={handleSignup}
            >
              Register
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Registration; 