import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

interface AuthContextProviderProps {
  children: ReactNode
}

export interface User {
  id: string
  name: string
  role: 'admin' | 'manager'
  parking_id: string | null
}

interface AuthContextData {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<string | undefined>
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  const navigate = useNavigate()

  async function login(email: string, password: string) {
    try {
      const { data } = await api.post('/users/sessions', {
        email,
        password,
      })

      const { token } = data

      localStorage.setItem('token', token)
      api.defaults.headers.common.authorization = `Bearer ${token}`

      const { data: user } = await api.get('/users/profile')

      setUser(user)

      navigate('/home', { replace: true })
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>

      const errorMessage = axiosError.response?.data?.message

      return errorMessage
    }
  }

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem('token')

      if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`

        try {
          const { data: user } = await api.get('/users/profile')

          setUser(user)

          navigate('/home', { replace: true })
        } catch (error) {
          api.defaults.headers.common.authorization = undefined
          localStorage.removeItem('token')
        }
      }
    })()
  }, []) // eslint-disable-line

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  )
}
