import { render, act } from "@testing-library/react-native"
import { AuthProvider, useAuth } from "../../context/AuthContext"
import auth from "@react-native-firebase/auth"
import { jest } from "@jest/globals" // Added import for jest

jest.mock("@react-native-firebase/auth", () => ({
  auth: jest.fn(),
}))

describe("AuthContext", () => {
  it("provides authentication state", () => {
    const TestComponent = () => {
      const { user, loading } = useAuth()
      return (
        <>
          <div data-testid="loading">{loading.toString()}</div>
          <div data-testid="user">{JSON.stringify(user)}</div>
        </>
      )
    }

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(getByTestId("loading").textContent).toBe("true")
    expect(getByTestId("user").textContent).toBe("null")

    act(() => {
      const authStateChangedCallback = (auth().onAuthStateChanged as jest.Mock).mock.calls[0][0]
      authStateChangedCallback({ uid: "123", email: "test@example.com" })
    })

    expect(getByTestId("loading").textContent).toBe("false")
    expect(JSON.parse(getByTestId("user").textContent)).toEqual({
      id: "123",
      email: "test@example.com",
    })
  })
})

