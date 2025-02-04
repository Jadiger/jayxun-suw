import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth-context/auth-context'
import { ROUTES } from '@/shared/constants/routes'

export const AuthRoute = () => {
  const { isAuth } = useAuth()
 

  return !isAuth ? <Outlet /> : <Navigate to={ROUTES.HOME} replace={true} />
}
