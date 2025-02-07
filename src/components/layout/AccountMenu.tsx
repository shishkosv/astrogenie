import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useUser } from '../../context/UserContext';
import ProfileExtended from '../profile/ProfileExtended';
import { accountMenuStyles as styles } from './styles/AccountMenuStyles';

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

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
            uri: user?.avatarUrl || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" 
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.dropdown}>
          <ProfileExtended 
            name={user?.displayName}
            role={user?.role || "User"}
            avatar={user?.avatarUrl}
            subscription={user?.subscriptionType || "Free Trial"}
            onClose={handleClose}
          />
        </View>
      )}
    </View>
  );
};

export { AccountMenu };