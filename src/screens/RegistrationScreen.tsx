import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { firebaseService } from '../services/firebase';

interface Props {
  navigation: any;
}

export const RegistrationScreen: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async (): Promise<void> => {
    try {
      await firebaseService.signIn(email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegistrationScreen;
