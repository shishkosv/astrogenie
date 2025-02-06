import type React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useLocalization } from '../../context/LocalizationContext';
import styles from './styles/LoginScreenStyles';

const LoginScreen: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { t } = useLocalization();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('login')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('emailAddress')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('login')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.link}>{t('dontHaveAccount')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
