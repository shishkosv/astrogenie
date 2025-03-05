import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { languageSwitcherStyles as styles } from './styles/LanguageSwitcherStyles';

const FLAG_EMOJIS = {
  en: '🇺🇸',
  es: '🇪🇸',
  ru: '🇷🇺'
} as const;

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: 'en' | 'es' | 'ru') => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.flagEmoji}>
          {FLAG_EMOJIS[language]}
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
            <Text style={styles.flagEmoji}>
              {FLAG_EMOJIS.en}
            </Text>
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
            <Text style={styles.flagEmoji}>
              {FLAG_EMOJIS.es}
            </Text>
            <Text style={[
              styles.optionText,
              language === 'es' && styles.activeText
            ]}>
              Español
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.languageOption,
              language === 'ru' && styles.activeOption
            ]}
            onPress={() => handleLanguageChange('ru')}
          >
            <Text style={styles.flagEmoji}>
              {FLAG_EMOJIS.ru}
            </Text>
            <Text style={[
              styles.optionText,
              language === 'ru' && styles.activeText
            ]}>
              Русский
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LanguageSwitcher; 