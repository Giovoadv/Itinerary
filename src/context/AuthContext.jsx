import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
      }
    } catch (err) {
      console.error('Auth check failed:', err)
      handleLogout()
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Successfully logged out!')
  }

  const value = {
    user,
    setUser,
    loading,
    error,
    setError,
    logout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 