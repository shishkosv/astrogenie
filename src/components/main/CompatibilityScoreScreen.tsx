import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { useAstrology } from "../../context/AstrologyContext"
import { useLocalization } from "../../context/LocalizationContext"
import styles from "./styles/CompatibilityScoreScreenStyles"
import { Compatibility } from "src/types/astrology"

const CompatibilityScoreScreen: React.FC = () => {
  const [sign1, setSign1] = useState("")
  const [sign2, setSign2] = useState("")
  const [score, setScore] = useState<Compatibility | null>(null)
  const { getCompatibility } = useAstrology()
  const { t } = useLocalization()

  const calculateCompatibility = async () => {
    if (sign1 && sign2) {
      const compatibilityScore = await getCompatibility(sign1, sign2)
      setScore(compatibilityScore)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t("compatibilityCheck")}</Text>
      <TextInput style={styles.input} placeholder={t("enterZodiacSign1")} value={sign1} onChangeText={setSign1} />
      <TextInput style={styles.input} placeholder={t("enterZodiacSign2")} value={sign2} onChangeText={setSign2} />
      <TouchableOpacity style={styles.button} onPress={calculateCompatibility}>
        <Text style={styles.buttonText}>{t("calculateCompatibility")}</Text>
      </TouchableOpacity>
      {score !== null && (
        <View style={styles.resultContainer}>
          {/* <Text style={styles.resultText}>{t("compatibilityScore", { score })}</Text> */}
          <Text style={styles.description}>{t("compatibilityDescription")}</Text>
        </View>
      )}
    </ScrollView>
  )
}

export default CompatibilityScoreScreen

