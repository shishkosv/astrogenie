import React from 'react';
import { Platform } from 'react-native';
import { globalStyles } from '../../styles/global';

const IconProvider = () => {
  if (Platform.OS !== 'web') return null;
  
  return (
    <style type="text/css">
      {globalStyles}
    </style>
  );
};

export default IconProvider; 