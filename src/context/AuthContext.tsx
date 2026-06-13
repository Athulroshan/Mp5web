import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type AuthUser = {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  isAdmin: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_USER = 'mpss_auth_user'
const STORAGE_TOKEN = 'mpss_auth_token'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_USER)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_TOKEN)
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_TOKEN, token)
    } else {
      localStorage.removeItem(STORAGE_TOKEN)
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_USER)
    }
  }, [user])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || 'Login failed. Please check your credentials.'
        }
      }

      const authUser: AuthUser = {
        id: data.data.user.id,
        name: data.data.user.name,
        email: data.data.user.email,
        role: data.data.user.role,
        avatar: data.data.user.avatar
      }

      setUser(authUser)
      setToken(data.data.token)
      return { success: true, message: 'Login successful' }
    } catch (error) {
      console.error('Auth login error:', error)
      return { success: false, message: 'Unable to login. Please try again.' }
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    if (!token) {
      return {
        success: false,
        message: 'You must be signed in to change your password.'
      }
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || 'Unable to change password.'
        }
      }

      return { success: true, message: data.message || 'Password changed successfully.' }
    } catch (error) {
      console.error('Change password error:', error)
      return {
        success: false,
        message: 'Unable to change password. Please try again.'
      }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAdmin: Boolean(user?.role === 'admin'),
      login,
      changePassword,
      logout
    }),
    [user, token]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
