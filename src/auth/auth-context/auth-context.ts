import { createContext, useContext } from 'react'

import { User } from '../types/user'
import { LoginBody } from '../types/login'

export interface AuthContext {
  isAuth: boolean
  user: User | null
  login: (body: LoginBody) => Promise<unknown>
  logout: () => void
}

export const AuthContext = createContext<null | AuthContext>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Оберните в AuthProvider свое приложение.')
  }

  return context
}
