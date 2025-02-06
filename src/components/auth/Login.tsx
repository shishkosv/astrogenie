import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../shared/Button';
import { loginStyles as styles } from './styles/LoginStyles';
import Icon from '../icons/Icon';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      <View style={styles.container}>
        <View style={styles.columns}>
          {/* Left Column - Email Login */}
          <View style={styles.column}>
            <View style={styles.formWrapper}>
              <View style={styles.formContent}>
                <View style={styles.inputField}>
                  <View style={styles.fieldRow}>
                    <Text style={styles.label}>Email address</Text>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.input}
                          placeholder="name@example.com"
                          value={email}
                          onChangeText={setEmail}
                          autoCapitalize="none"
                          keyboardType="email-address"
                        />
                      </View>
                      <View style={styles.separator} />
                    </View>
                  </View>
                </View>

                <View style={styles.inputField}>
                  <View style={styles.fieldRow}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.input}
                          placeholder="Password"
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity 
                          style={styles.eyeButton}
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <Icon 
                            name={showPassword ? "eye-off" : "eye"} 
                            size={22} 
                            color="#666"
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.separator} />
                    </View>
                  </View>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                
                <Button 
                  variant="default"
                  size="md"
                  onPress={handleLogin}
                >
                  {translations.login}
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
      </View>
    </Layout>
  );
};

export default Login; 