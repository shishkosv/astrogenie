import "react-native-gesture-handler/jestSetup"

jest.mock("@react-native-firebase/auth", () => ({
  auth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  })),
}))

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}))

jest.mock("react-native-localize", () => ({
  findBestAvailableLanguage: jest.fn(() => ({ languageTag: "en" })),
}))

