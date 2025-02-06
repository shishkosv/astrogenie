import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import Layout from '../layout/Layout';
import { checkoutStyles as styles } from './styles/CheckoutStyles';
import { Button } from '../shared/Button';

const Checkout = () => {
  const { translations } = useLanguage();
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

  const handleSubmit = () => {
    // Implement checkout logic
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{translations.checkout}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translations.shippingInfo}</Text>
          <TextInput
            style={styles.input}
            placeholder={translations.name}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder={translations.email}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder={translations.address}
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder={translations.city}
            value={formData.city}
            onChangeText={(text) => setFormData({ ...formData, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder={translations.country}
            value={formData.country}
            onChangeText={(text) => setFormData({ ...formData, country: text })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translations.paymentInfo}</Text>
          <TextInput
            style={styles.input}
            placeholder={translations.cardNumber}
            value={formData.cardNumber}
            onChangeText={(text) => setFormData({ ...formData, cardNumber: text })}
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder={translations.expiryDate}
              value={formData.expiryDate}
              onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={formData.cvv}
              onChangeText={(text) => setFormData({ ...formData, cvv: text })}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        </View>

        <Button 
          variant="default"
          size="sm"
          onPress={handleSubmit}
        >
          {translations.placeOrder}
        </Button>
      </ScrollView>
    </Layout>
  );
};

export default Checkout; 