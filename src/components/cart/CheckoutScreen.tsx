import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import Layout from '../layout/Layout';
import { checkoutStyles as styles } from './styles/CheckoutStyles';
import { Button } from '../shared/Button';
import { CountrySelector } from '../shared/CountrySelector';
import { AutocompleteCityInput } from '../shared/AutocompleteCityInput';

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

interface BillingLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number;
}

const Checkout = () => {
  const { translations } = useLanguage();
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [location, setLocation] = useState<BillingLocation>({
    city: '',
    country: '',
    latitude: 0,
    longitude: 0,
    timezone: 0
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Format price safely with fallback to 0
  const formatPrice = (price: number | undefined) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  const handleCountryChange = (countryCode: string) => {
    setFormData({ ...formData, country: countryCode });
    setLocation({ ...location, country: countryCode });
  };

  const handleCitySelect = (city: string, country: string, lat: number, lon: number, timezone: number) => {
    setFormData({ ...formData, city });
    setLocation({
      city,
      country,
      latitude: lat,
      longitude: lon,
      timezone
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // Validate city
    if (!location.city) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    // Validate country
    if (!location.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    // Validate card number (simple validation for 16 digits)
    const cardNumberRegex = /^\d{16}$/;
    if (!formData.cardNumber.trim() || !cardNumberRegex.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Valid 16-digit card number is required';
      isValid = false;
    }

    // Validate expiry date (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!formData.expiryDate.trim() || !expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Valid expiry date (MM/YY) is required';
      isValid = false;
    }

    // Validate CVV (3 digits)
    const cvvRegex = /^\d{3}$/;
    if (!formData.cvv.trim() || !cvvRegex.test(formData.cvv)) {
      newErrors.cvv = 'Valid 3-digit CVV is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Implement checkout logic
      console.log('Form submitted:', formData);
      console.log('Location data:', location);
      // Here you would typically call an API to process the payment
      alert('Order placed successfully!');
    } else {
      console.log('Form validation failed');
    }
  };

  // Calculate subtotal, tax, and total
  const subtotal = cart?.totalPrice || 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Checkout</Text>

        <View style={styles.columnsContainer}>
          {/* Left Column - Customer Information */}
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Information</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="email@example.com"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Billing Address</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Street Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123 Main St"
                  value={formData.address}
                  onChangeText={(text) => setFormData({ ...formData, address: text })}
                />
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
              </View>
              
              <CountrySelector
                value={location.country}
                onChange={handleCountryChange}
                error={errors.country}
                label="Country"
              />
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>City</Text>
                <AutocompleteCityInput
                  value={location.city}
                  onLocationSelect={handleCitySelect}
                  country={location.country}
                  placeholder="Select your city"
                />
                {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
              </View>
            </View>
          </View>

          {/* Right Column - Payment and Order Summary */}
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Information</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChangeText={(text) => setFormData({ ...formData, cardNumber: text })}
                  keyboardType="numeric"
                  maxLength={19} // 16 digits + 3 spaces
                />
                {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
              </View>
              
              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.label}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
                    maxLength={5}
                  />
                  {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
                </View>
                
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    value={formData.cvv}
                    onChangeText={(text) => setFormData({ ...formData, cvv: text })}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry={Platform.OS !== 'web'}
                  />
                  {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
                </View>
              </View>
            </View>

            <View style={styles.orderSummary}>
              <Text style={styles.orderSummaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${formatPrice(subtotal)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax (10%)</Text>
                <Text style={styles.summaryValue}>${formatPrice(tax)}</Text>
              </View>
              
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${formatPrice(total)}</Text>
              </View>
            </View>
          </View>
        </View>

        <Button 
          variant="primary"
          size="lg"
          onPress={handleSubmit}
        >
          Place Order
        </Button>
      </ScrollView>
    </Layout>
  );
};

export default Checkout; 