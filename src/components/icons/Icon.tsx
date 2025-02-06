import React from 'react';
import Feather from '@expo/vector-icons/Feather';
// Or alternatively:
// import { Feather } from '@expo/vector-icons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon = ({ name, size = 24, color = '#000' }: IconProps) => {
  return <Feather name={name} size={size} color={color} />;
};

export default Icon; 