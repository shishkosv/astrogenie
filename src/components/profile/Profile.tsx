import React from 'react';
import { View, Text } from 'react-native';
import { useFirebase } from '../../context/FirebaseContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../shared/Button';
import { profileStyles as styles } from './styles/ProfileStyles';

const Profile = () => {
  const { userData, loading } = useFirebase();
  const { logout } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{userData?.name}</Text>
        
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userData?.email}</Text>
        
        <Text style={styles.label}>Member Since</Text>
        <Text style={styles.value}>
          {new Date(userData?.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      <Button
        variant="secondary"
        onPress={logout}
      >
        Logout
      </Button>
    </View>
  );
};

export default Profile; 