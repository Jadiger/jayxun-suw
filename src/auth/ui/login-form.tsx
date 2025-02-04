import { useState } from 'react'
import { Alert, Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'

import { useAuth } from '../auth-context/auth-context'

import { User, Lock } from 'react-feather'

import { LoginBody } from '../types/login'

export const LoginForm = () => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginBody>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Обязательное поле'),
      password: isNotEmpty('Обязательное поле'),
    },
  })

  const handleSubmit = async (data: typeof form.values) => {
    setIsLoading(true)
    setError(null)

    try {
      await login(data)
    } catch (error) {
      const err = error as Record<string, string>

      form.setErrors(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ flexGrow: '1' }}>
      {error && (
        <Alert title="Ошибка" variant="light" color="red" mb="md">
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={24}>
          <TextInput
            label="Логин"
            withAsterisk
            leftSection={<User />}
            placeholder="Введите логин"
            {...form.getInputProps(`username`)}
          />

          <PasswordInput
            label="Пароль"
            withAsterisk
            leftSection={<Lock />}
            placeholder="Введите пароль"
            {...form.getInputProps(`password`)}
          />
        </Stack>
        <Button loading={isLoading} type="submit" fullWidth mt="xl">
          Войти
        </Button>
      </form>
    </div>
  )
}
