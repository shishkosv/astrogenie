import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../shared/Button';
import { Input } from '../shared/input';
import { loginStyles as styles } from './styles/LoginStyles';
import Icon from '../icons/Icon';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const { translations } = useLanguage();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate('Home');
    } catch (err) {
      // Error is handled in AuthContext
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.columns}>
          {/* Left Column - Email Login */}
          <View style={styles.column}>
            <View style={styles.formWrapper}>
              <View style={styles.formContent}>
                {error && <Text style={styles.error}>{error}</Text>}
                
                <Input
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                
                <Button
                  variant="primary"
                  onPress={handleLogin}
                  loading={loading}
                >
                  {translations.login}
                </Button>
                
                <Button
                  variant="secondary"
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  {translations.forgotPassword}
                </Button>
              </View>
            </View>
          </View>

          {/* Right Column - Social Login */}
          <View style={styles.column}>
            <View style={styles.socialWrapper}>
              <Text style={styles.socialTitle}>Or continue with</Text>
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Image 
                    source={require('../../assets/images/download_ios.png')} 
                    style={styles.socialIcon} 
                  />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
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
        
        <Button
          variant="secondary"
          onPress={() => navigation.navigate('Registration')}
        >
          {translations.signUp}
        </Button>
      </View>
    </Layout>
  );
};

export default Login; 