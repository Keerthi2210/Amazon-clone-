import {
  createContext,
  useEffect,
  useState
} from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem('shopnest-user')

    return savedUser
      ? JSON.parse(savedUser)
      : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        'shopnest-user',
        JSON.stringify(user)
      )
    } else {
      localStorage.removeItem(
        'shopnest-user'
      )
    }
  }, [user])

  const logout = () => {
    setUser(null)

    localStorage.removeItem(
      'shopnest-token'
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext