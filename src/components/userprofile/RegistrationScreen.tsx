import type React from "react"
import { useState } from "react"
import { Text, TextInput, TouchableOpacity, ScrollView } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
// import { Picker } from "@react-native-picker/picker"
import { useAuth } from "../../context/AuthContext"
import { useLocalization } from "../../context/LocalizationContext"
import styles from "./styles/RegistrationScreenStyles"

const RegistrationScreen: React.FC = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [gender, setGender] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)

  const { register } = useAuth()
  const { t } = useLocalization()

  const handleRegister = async () => {
    try {
      await register(email, password, { dateOfBirth, gender })
      //navigation.navigate("Dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t("signUp")}</Text>
      <TextInput style={styles.input} placeholder={t("fullName")} value={fullName} onChangeText={setFullName} />
      <TextInput
        style={styles.input}
        placeholder={t("emailAddress")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder={t("password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{dateOfBirth.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          // onChange={(event, selectedDate) => {
          //   setShowDatePicker(false)
          //   if (selectedDate) {
          //     setDateOfBirth(selectedDate)
          //   }
          // }}
        />
      )}
      {/* <Picker selectedValue={gender} style={styles.input} onValueChange={(itemValue) => setGender(itemValue)}>
        <Picker.Item label={t("selectGender")} value="" />
        <Picker.Item label={t("male")} value="male" />
        <Picker.Item label={t("female")} value="female" />
        <Picker.Item label={t("other")} value="other" />
      </Picker> */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{t("signUp")}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>{t("alreadyHaveAccount")}</Text>
      </TouchableOpacity> */}
    </ScrollView>
  )
}

export default RegistrationScreen

