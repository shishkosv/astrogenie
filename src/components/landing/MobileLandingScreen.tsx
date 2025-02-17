import type React from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { landingStyles as styles } from './styles/LandingStyles'

const MobileLanding: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: "/placeholder.svg?height=60&width=60" }} style={styles.logo} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to AstroConnect</Text>
        <Text style={styles.subtitle}>Your personal astrological companion</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MobileLanding

