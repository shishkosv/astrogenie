import { render, fireEvent } from "@testing-library/react-native"
import LoginScreen from "../../components/login/LoginScreen"
import { AuthProvider } from "../../context/AuthContext"
import { LocalizationProvider } from "../../context/LocalizationContext"

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}))

describe("LoginScreen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <LocalizationProvider>
          <LoginScreen />
        </LocalizationProvider>
      </AuthProvider>,
    )

    expect(getByText("Login")).toBeTruthy()
    expect(getByPlaceholderText("Email Address")).toBeTruthy()
    expect(getByPlaceholderText("Password")).toBeTruthy()
    expect(getByText("Login")).toBeTruthy()
    expect(getByText("Don't have an account?")).toBeTruthy()
  })

  it("handles login button press", () => {
    const navigationMock = { navigate: jest.fn() }
    jest.mock("@react-navigation/native", () => ({
      ...jest.requireActual("@react-navigation/native"),
      useNavigation: () => navigationMock,
    }))

    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <LocalizationProvider>
          <LoginScreen />
        </LocalizationProvider>
      </AuthProvider>,
    )

    const emailInput = getByPlaceholderText("Email Address")
    const passwordInput = getByPlaceholderText("Password")
    const loginButton = getByText("Login")

    fireEvent.changeText(emailInput, "test@example.com")
    fireEvent.changeText(passwordInput, "password123")
    fireEvent.press(loginButton)

    expect(navigationMock.navigate).toHaveBeenCalledWith("Home") // Add assertion to check navigation
  })
})

