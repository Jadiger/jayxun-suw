import { Button, Group, Text } from '@mantine/core'
import { useAuth } from '../auth-context/auth-context'
import { modals } from '@mantine/modals'
import { LogOut } from 'react-feather'

export const Logout = () => {
  const { logout } = useAuth()

  const handleLogout = () => {
    modals.openConfirmModal({
      title: 'Подтвердите действие',
      children: <Text size="sm">Вы действительно хотите выйти?</Text>,
      labels: { confirm: 'Подтвердить', cancel: 'Отмена' },
      onConfirm: logout,
    })
  }

  return (
    <Button onClick={handleLogout} fullWidth color="#FBEEED">
      <Group align="center" justify='center' gap={8}>
        <LogOut size={20} color='var(--mantine-color-red-0)'/>
        <span style={{ color: 'var(--mantine-color-red-0)', fontSize: '16px'}}>
          Выйти
        </span>
      </Group>
    </Button>
  )
}
