import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import Layout from '../../layout/Layout';
import { signListStyles as styles } from './styles/SignListStyles';
import { SignButton } from '../../shared/SignButton';
import { zodiacSigns } from '../../../services/zodiacSigns';
import { useContext } from 'react';
import { useZodiac } from '../../../context/ZodiacContext';

type NavigationProp = StackNavigationProp<RootStackParamList>;


interface SignListsProps {
  standalone?: boolean;
}

const SignLists: React.FC<SignListsProps> = ({ standalone = true }) => {
  const navigation = useNavigation<NavigationProp>();
  const { setSelectedSign } = useZodiac();

  const handleSignSelect = (sign: typeof zodiacSigns[0]) => {
    setSelectedSign(sign);
    navigation.navigate('DailyHoroscopes');
  };

  const content = (
    <>
      <Text style={styles.title}>Choose Your Zodiac Sign</Text>
      <View style={styles.signGrid}>
        {zodiacSigns.map((sign) => (
          <SignButton
            key={sign.name}
            name={sign.name}
            dateRange={sign.dates}
            onPress={() => handleSignSelect(sign)}
            size="small"
          />
        ))}
      </View>
    </>
  );

  if (standalone) {
    return (
      <Layout>
        <ScrollView style={styles.container}>
          {content}
        </ScrollView>
      </Layout>
    );
  }

  return content;
};

export default SignLists; 