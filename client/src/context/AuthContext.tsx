import { ReactNode, createContext, useEffect, useState } from 'react'
import { CreateUserDto, User, UserLoginDto, UserUpdateDto } from '../types/auth'
import {
  getUserRequest,
  getUsersRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  updateUserRequest,
  verifyTokenRequest,
} from '../api/auth'

import Cookies from 'js-cookie'

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  token: string
  loading: boolean
  getUserByUsername: (username: string) => Promise<User | null>
  getUsers: (excludedId: string) => Promise<User[]>
  register: (user: CreateUserDto) => void
  login: (userData: UserLoginDto) => void
  logout: () => void
  updateUser: (id: string, userData: UserUpdateDto) => void
  deleteUser: (id: string) => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = async () => {
      let isLoggedIn = false
      let user = null
      let token = ''

      try {
        const cookies = Cookies.get()
        if (cookies.access_token) {
          const res = await verifyTokenRequest(cookies.access_token)
          if (res.data) {
            isLoggedIn = true
            user = res.data.user
            token = res.data.access_token
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoggedIn(isLoggedIn)
        setUser(user)
        setToken(token)
        setLoading(false)
      }
    }

    verify()
  }, [])

  const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
      const response = await getUserRequest(username)
      return response.data
    } catch (error) {
      console.log('Error getting user: ', error)
      return null
    }
  }

  const getUsers = async (excludedId: string): Promise<User[]> => {
    try {
      const response = await getUsersRequest(excludedId, token)
      return response.data
    } catch (error) {
      console.log('Error getting users: ', error)
      return []
    }
  }

  const register = async (user: CreateUserDto) => {
    const response = await registerRequest(user)
    setUser(response.data.user)
    setToken(response.data.access_token)
    setIsLoggedIn(true)
  }

  const login = async (userData: UserLoginDto) => {
    const response = await loginRequest(userData)
    setUser(response.data.user)
    setToken(response.data.access_token)
    setIsLoggedIn(true)
  }

  const logout = async () => {
    await logoutRequest(token)
    setUser(null)
    setToken('')
    setIsLoggedIn(false)
  }

  const updateUser = async (id: string, userData: UserUpdateDto) => {
    try {
      const response = await updateUserRequest(id, userData, token)
      setUser(response.data)
    } catch (error) {
      console.log('Error during update: ', error)
    }
  }

  const deleteUser = () => {
    // * Delet logic
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        loading,
        getUserByUsername,
        getUsers,
        register,
        login,
        logout,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
