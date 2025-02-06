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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate('Home');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Layout>
      <View style={authStyles.container}>
        <Text style={authStyles.title}>{translations.login}</Text>
        <View style={authStyles.form}>
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
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}
          <Button 
            variant="default"
            size="sm"
            onPress={handleLogin}
          >
            {translations.login}
          </Button>
          <TouchableOpacity 
            style={authStyles.linkButton}
            onPress={() => navigation.navigate('Registration')}
          >
            <Text style={authStyles.linkText}>{translations.noAccount}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={authStyles.linkButton}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={authStyles.linkText}>{translations.forgotPassword}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Login; 