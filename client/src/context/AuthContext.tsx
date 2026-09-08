import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import axios from "axios"

interface User {
  id: string
  name: string
  email: string
  xp: number
  streak: number
  completedChallenges: number
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean

  login: (
    token: string,
    user: User
  ) => void

  logout: () => void

  refreshUser: () => Promise<void>
}

const AuthContext =
  createContext<AuthContextType | null>(null)

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  const [token, setToken] = useState<string | null>(
    null
  )

  const [loading, setLoading] = useState(true)


  // Check existing login when app starts

  useEffect(() => {
    async function loadUser() {
      const storedToken =
        localStorage.getItem("token")

      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        )

        setToken(storedToken)

        setUser(response.data.user)

      } catch (error) {
        console.error(
          "Authentication check failed:",
          error
        )

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        setToken(null)
        setUser(null)

      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])


  // Login

  function login(
    newToken: string,
    newUser: User
  ) {
    localStorage.setItem(
      "token",
      newToken
    )

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    )

    setToken(newToken)
    setUser(newUser)
  }


  // Logout

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setToken(null)
    setUser(null)
  }


  // Get latest user data from MongoDB

  async function refreshUser() {
    const storedToken =
      localStorage.getItem("token")

    if (!storedToken) {
      setUser(null)
      setToken(null)
      return
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )

      const updatedUser =
        response.data.user

      setToken(storedToken)
      setUser(updatedUser)

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      )

    } catch (error) {
      console.error(
        "Could not refresh user:",
        error
      )

      logout()
    }
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    )
  }

  return context
}