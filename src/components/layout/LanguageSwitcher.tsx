import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, language === 'en' && styles.activeButton]} 
        onPress={() => setLanguage('en')}
      >
        <Text style={[styles.text, language === 'en' && styles.activeText]}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, language === 'es' && styles.activeButton]}
        onPress={() => setLanguage('es')}
      >
        <Text style={[styles.text, language === 'es' && styles.activeText]}>ES</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  activeButton: {
    backgroundColor: '#4a0e4e',
    borderColor: '#4a0e4e',
  },
  text: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: '#ffffff',
  },
});

export default LanguageSwitcher; 