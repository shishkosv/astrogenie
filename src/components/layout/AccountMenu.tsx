import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import Icon from '../icons/Icon';

export const AccountMenu = () => {
  const navigation = useNavigation();
  const { isAuthenticated, logout } = useAuth();
  const { userData } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Icon name="user" size={20} color="#666" />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Icon name="user" size={20} color="#666" />
        <Text style={styles.userName}>{userData?.name || 'User'}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Icon name="log-out" size={20} color="#666" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  buttonText: {
    fontSize: 14,
    color: '#666',
  },
}); 