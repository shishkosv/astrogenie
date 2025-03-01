import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { HoroscopePreview } from './HoroscopePreview';
import Layout from '../layout/Layout';

// Sample zodiac signs
const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 
  'Leo', 'Virgo', 'Libra', 'Scorpio', 
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// Sample horoscope data
const SAMPLE_HOROSCOPE = {
  horoscope: "Today is a great day to start new projects. Your creative energy is at its peak, and you'll find that ideas flow easily. Take advantage of this productive period to advance your goals.",
  luckyNumber: 7,
  luckyColor: "Blue",
  mood: "Inspired"
};

const HoroscopePreviewExample = () => {
  const [selectedSign, setSelectedSign] = useState('Aries');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignPress = () => {
    setModalVisible(true);
  };

  const selectSign = (sign: string) => {
    setSelectedSign(sign);
    setModalVisible(false);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Your Daily Horoscope</Text>
        
        <HoroscopePreview
          sign={selectedSign}
          horoscope={SAMPLE_HOROSCOPE.horoscope}
          luckyNumber={SAMPLE_HOROSCOPE.luckyNumber}
          luckyColor={SAMPLE_HOROSCOPE.luckyColor}
          mood={SAMPLE_HOROSCOPE.mood}
          onSignPress={handleSignPress}
        />

        {/* Sign Selector Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Your Sign</Text>
              
              <FlatList
                data={ZODIAC_SIGNS}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.signItem,
                      selectedSign === item && styles.selectedSignItem
                    ]}
                    onPress={() => selectSign(item)}
                  >
                    <Text 
                      style={[
                        styles.signItemText,
                        selectedSign === item && styles.selectedSignItemText
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  signItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedSignItem: {
    backgroundColor: 'rgba(111, 76, 255, 0.3)',
  },
  signItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedSignItemText: {
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default HoroscopePreviewExample; 