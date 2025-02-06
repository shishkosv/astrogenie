import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { authStyles } from './styles';
import { Button } from '../shared/Button';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { signup } = useAuth();

  const handleSignup = async () => {
    try {
      await signup(email, password, name);
      navigation.navigate('Home');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Layout>
      <View style={authStyles.container}>
        <Text style={authStyles.title}>{translations.registration}</Text>
        <Text style={authStyles.subtitle}>{translations.createAccount}</Text>
        <View style={authStyles.form}>
          <TextInput
            style={authStyles.input}
            placeholder={translations.name}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={authStyles.input}
            placeholder={translations.password}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}
          <Button 
            variant="default"
            size="sm"
            onPress={handleSignup}
          >
            {translations.signUp}
          </Button>
          <TouchableOpacity 
            style={authStyles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={authStyles.linkText}>{translations.haveAccount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Registration; 