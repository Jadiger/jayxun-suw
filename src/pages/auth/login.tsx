import { LoginForm } from '@/features/auth/ui/login-form'
import { Stack, Title } from '@mantine/core'
import styles from './login.module.css'

import { OpenButton } from '@/shared/ui/language-button/open-button'

const LoginPage = () => {
  return (
    <>
      <Stack align="center" gap={0}>
        <h1 className={styles.logo}>Jayxun suwları</h1>

        <Title order={3} mb="md">
          Добро пожаловать! 👋
        </Title>

        <p className={styles.text}>Введите данные для входа в кабинет</p>
      </Stack>

      <LoginForm />

      <OpenButton />
    </>
  )
}

export default LoginPage
