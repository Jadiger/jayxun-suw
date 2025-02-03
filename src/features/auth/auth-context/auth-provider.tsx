import { PropsWithChildren, useState } from 'react'
import { notifications } from '@mantine/notifications'

import { AuthContext } from './auth-context'

import { authApi } from '../api/auth-api'

import { User } from '../types/user'
import { LoginBody } from '../types/login'

interface AuthProviderProps extends PropsWithChildren {
  authored: boolean
  authorizedUser: User | null
}

import Cookies from 'js-cookie'

export const AuthProvider = (props: AuthProviderProps) => {
  const { authored, authorizedUser, children } = props

  const [isAuth, setIsAuth] = useState(authored)
  const [user, setUser] = useState<User | null>(authorizedUser)

  const login = async (body: LoginBody) => {
    try {
      const res = await authApi.login(body)

      Cookies.set('token', res.token, {
        expires: 7,
      })

      setIsAuth(true)
      setUser(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const logout = () => {
    authApi.logout().finally(() => {
      notifications.show({
        title: 'Успешно',
        message: 'Вы вышли из системы',
        color: 'green',
      })
      Cookies.remove('token')
      setIsAuth(false)
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{ login, isAuth, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}
