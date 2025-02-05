import type React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useAstrology } from '../../context/AstrologyContext';
import { useLocalization } from '../../context/LocalizationContext';
import styles from './styles/FriendshipScoreScreenStyles';
import { Compatibility } from 'src/types/astrology';

const FriendshipScoreScreen: React.FC = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [score, setScore] = useState<Compatibility | null>(null);
  const { getCompatibility } = useAstrology();
  const { t } = useLocalization();

  const calculateFriendship = async () => {
    if (name1 && name2) {
      // For simplicity, we're using the same compatibility function
      const friendshipScore = await getCompatibility(name1, name2);
      setScore(friendshipScore);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t('friendshipCheck')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enterName1')}
        value={name1}
        onChangeText={setName1}
      />
      <TextInput
        style={styles.input}
        placeholder={t('enterName2')}
        value={name2}
        onChangeText={setName2}
      />
      <TouchableOpacity style={styles.button} onPress={calculateFriendship}>
        <Text style={styles.buttonText}>{t('calculateFriendship')}</Text>
      </TouchableOpacity>
      {score !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>123</Text>
          <Text style={styles.description}>{t('friendshipDescription')}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default FriendshipScoreScreen;
