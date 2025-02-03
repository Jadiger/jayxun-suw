import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth-context/auth-context'
import { ROUTES } from '@/shared/constants/routes'

export const ProtectedRoutes = () => {
  const { isAuth } = useAuth()
  

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace={true} />
}
