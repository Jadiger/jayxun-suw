import { Outlet } from 'react-router-dom'
import styles from './auth-layout.module.css'

export const AuthLayout = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.flexBlock}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
