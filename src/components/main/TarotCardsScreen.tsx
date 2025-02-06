import type React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAstrology } from '../../context/AstrologyContext';
import { useLocalization } from '../../context/LocalizationContext';
import styles from './styles/TarotCardsScreenStyles';

const TarotCardsScreen: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);
  const { getTarotCards } = useAstrology();
  const { t } = useLocalization();

  const drawCards = async () => {
    const drawnCards = await getTarotCards();
    setCards(drawnCards);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t('dailyTarotReading')}</Text>
      <TouchableOpacity style={styles.button} onPress={drawCards}>
        <Text style={styles.buttonText}>{t('drawCards')}</Text>
      </TouchableOpacity>
      {cards.length > 0 && (
        <View style={styles.cardsContainer}>
          {cards.map((card, index) => (
            <View key={index} style={styles.cardItem}>
              <Image
                source={{
                  uri: `https://example.com/tarot/${card.toLowerCase().replace(' ', '_')}.jpg`,
                }}
                style={styles.cardImage}
              />
              <Text style={styles.cardName}>{card}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default TarotCardsScreen;
