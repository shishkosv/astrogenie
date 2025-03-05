import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import Icon from '../icons/Icon';

interface DownloadButtonProps {
  platform: 'iOS' | 'Android';
  variant?: 'default' | 'outline';
}

export function DownloadButton({ platform, variant = 'default' }: DownloadButtonProps) {
  const isIOS = platform === 'iOS';

  return (
    <TouchableOpacity 
      style={[
        styles.button,
        variant === 'default' ? styles.defaultButton : styles.outlineButton
      ]}
    >
      <Icon name="download" size={16} color={variant === 'default' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)'} />
      <Text style={[
        styles.buttonText,
        variant === 'default' ? styles.defaultText : styles.outlineText
      ]}>
        Download for {platform}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  defaultButton: {
    backgroundColor: '#000000',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  defaultText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
}); 