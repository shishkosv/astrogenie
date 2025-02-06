import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { authStyles } from './styles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      setMessage(translations.resetPasswordSent);
    } catch (err) {
      setError(translations.resetPasswordError);
    }
  };

  return (
    <Layout>
      <View style={authStyles.container}>
        <Text style={authStyles.title}>{translations.forgotPassword}</Text>
        <Text style={authStyles.subtitle}>{translations.resetPasswordDesc}</Text>
        <View style={authStyles.form}>
          <TextInput
            style={authStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {message ? <Text style={authStyles.successText}>{message}</Text> : null}
          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={authStyles.button} onPress={handleResetPassword}>
            <Text style={authStyles.buttonText}>{translations.resetPassword}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={authStyles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={authStyles.linkText}>{translations.backToLogin}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default ForgotPassword; 