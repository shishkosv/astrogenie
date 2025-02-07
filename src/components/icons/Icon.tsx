import React from 'react';
import Feather  from 'react-native-vector-icons/Feather';

type IconName = React.ComponentProps<typeof Feather>['name'];

interface CustomIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon: React.FC<CustomIconProps> = ({ name, size = 24, color = '#000' }) => {
  return <Feather name={name} size={size} color={color} />;
};

export default Icon; 