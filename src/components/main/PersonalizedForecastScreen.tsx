import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { useAstrology } from "../../context/AstrologyContext"
import { useLocalization } from "../../context/LocalizationContext"
import { useAuth } from "../../context/AuthContext"
import styles from "./styles/PersonalizedForecastScreenStyles"

const PersonalizedForecastScreen: React.FC = () => {
  const [forecast, setForecast] = useState("")
  const { getHoroscope } = useAstrology()
  const { t } = useLocalization()
  const { user } = useAuth()

  useEffect(() => {
    fetchForecast()
  }, [])

  const fetchForecast = async () => {
    if (user?.zodiacSign) {
      const personalizedForecast = await getHoroscope(user.zodiacSign)
      setForecast(personalizedForecast)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t("personalizedForecast")}</Text>
      <Text style={styles.subHeader}>{t("yourZodiacSign", { sign: user?.zodiacSign })}</Text>
      <View style={styles.forecastContainer}>
        <Text style={styles.forecastText}>{forecast}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchForecast}>
        <Text style={styles.buttonText}>{t("refreshForecast")}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default PersonalizedForecastScreen

