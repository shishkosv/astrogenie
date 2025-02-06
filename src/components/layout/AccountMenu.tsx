import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProfileExtended from '../profile/ProfileExtended';
import { accountMenuStyles as styles } from './styles/AccountMenuStyles';

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleMenuToggle}
        style={styles.avatarContainer}
      >
        <Image
          source={{ 
            uri: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" 
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.dropdown}>
          <ProfileExtended 
            name={user?.name}
            role="User"
            avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
            subscription="Free Trial"
            onClose={handleClose}
          />
        </View>
      )}
    </View>
  );
};

export default AccountMenu; 