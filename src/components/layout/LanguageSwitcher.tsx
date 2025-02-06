import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { FLAGS } from '../../constants/images';
import { languageSwitcherStyles as styles } from './styles/LanguageSwitcherStyles';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: 'en' | 'es') => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setIsOpen(!isOpen)}
      >
        <Image 
          source={FLAGS[language]} 
          style={styles.flagIcon}
        />
        <Text style={styles.selectedText}>
          {language.toUpperCase()}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity 
            style={[
              styles.languageOption,
              language === 'en' && styles.activeOption
            ]}
            onPress={() => handleLanguageChange('en')}
          >
            <Image 
              source={FLAGS.en} 
              style={styles.flagIcon}
            />
            <Text style={[
              styles.optionText,
              language === 'en' && styles.activeText
            ]}>
              English
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.languageOption,
              language === 'es' && styles.activeOption
            ]}
            onPress={() => handleLanguageChange('es')}
          >
            <Image 
              source={FLAGS.es} 
              style={styles.flagIcon}
            />
            <Text style={[
              styles.optionText,
              language === 'es' && styles.activeText
            ]}>
              Español
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LanguageSwitcher; 