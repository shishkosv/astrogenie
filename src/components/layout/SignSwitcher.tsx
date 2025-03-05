import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '../icons/Icon';
import { useContext } from 'react';
import { useZodiac } from '../../context/ZodiacContext';
import { zodiacSigns } from '../../services/zodiacSigns';
import { languageSwitcherStyles as styles } from './styles/LanguageSwitcherStyles';

const SignSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedSign, setSelectedSign } = useZodiac();

  const handleSignChange = (signName: string) => {
    setSelectedSign({
      name: signName,
      dateRange: '',
      period: ''
    });
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]} 
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon 
            name="star" 
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.selectedText}>
            {selectedSign?.name || 'Select Sign'}
          </Text>
        </View>

        <Icon 
          name={isOpen ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="#FFFFFF"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {zodiacSigns.map((sign) => (
            <TouchableOpacity 
              key={sign.name}
              style={[
                styles.languageOption,
                selectedSign?.name === sign.name && styles.activeOption
              ]}
              onPress={() => handleSignChange(sign.name)}
            >
              <Icon 
                name="star" 
                size={20}
                color={selectedSign?.name === sign.name ? '#000' : '#666'}
              />

              <Text style={[
                styles.optionText,
                selectedSign?.name === sign.name && styles.activeText
              ]}>
                {sign.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SignSwitcher; 