import type React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../context/AuthContext"
import { useLocalization } from "../../context/LocalizationContext"
import { useAstrology } from "../../context/AstrologyContext"
import styles from "./styles/DashboardScreenStyles"

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation()
  const { user } = useAuth()
  const { t } = useLocalization()
  const { dailyHoroscope } = useAstrology()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t("dashboard")}</Text>
      <View style={styles.horoscopeSection}>
        <Text style={styles.subHeader}>{t("todaysHoroscope", { sign: user?.zodiacSign })}</Text>
        <Text>{dailyHoroscope}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("DetailedHoroscope")}>
          <Text style={styles.link}>{t("readMore")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.featuresGrid}>
        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate("CompatibilityScore")}>
          <Text>{t("compatibilityScore")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate("FriendshipScore")}>
          <Text>{t("friendshipScore")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate("TarotCards")}>
          <Text>{t("tarotCards")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate("PersonalizedForecast")}>
          <Text>{t("personalizedForecast")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default DashboardScreen

