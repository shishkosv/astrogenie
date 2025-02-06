import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import Layout from '../layout/Layout';
import { signListStyles as styles } from './styles/SignListStyles';
import { useZodiac } from '../../context/ZodiacContext';
import { SignButton } from '../shared/SignButton';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const zodiacSigns = [
  { name: 'Aries', dateRange: 'Mar 21 - Apr 19', period: '0321-0419' },
  { name: 'Taurus', dateRange: 'Apr 20 - May 20', period: '0420-0520' },
  { name: 'Gemini', dateRange: 'May 21 - Jun 20', period: '0521-0620' },
  { name: 'Cancer', dateRange: 'Jun 21 - Jul 22', period: '0621-0722' },
  { name: 'Leo', dateRange: 'Jul 23 - Aug 22', period: '0723-0822' },
  { name: 'Virgo', dateRange: 'Aug 23 - Sep 22', period: '0823-0922' },
  { name: 'Libra', dateRange: 'Sep 23 - Oct 22', period: '0923-1022' },
  { name: 'Scorpio', dateRange: 'Oct 23 - Nov 21', period: '1023-1121' },
  { name: 'Sagittarius', dateRange: 'Nov 22 - Dec 21', period: '1122-1221' },
  { name: 'Capricorn', dateRange: 'Dec 22 - Jan 19', period: '1222-0119' },
  { name: 'Aquarius', dateRange: 'Jan 20 - Feb 18', period: '0120-0218' },
  { name: 'Pisces', dateRange: 'Feb 19 - Mar 20', period: '0219-0320' },
];

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
            dateRange={sign.dateRange}
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