import { NavLink, Outlet } from 'react-router-dom'

import style from './main-layout.layout.module.css'

import { Drawer, Group, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { LanguageButton } from '@/shared/ui/language-button/language-button'
import { Clipboard, Package, Truck, Users, Menu, X } from 'react-feather'
import { Logout } from '@/features/auth/ui/logout'

interface ILinks {
  path: string
  title: string
  icon: React.ReactNode
}

const links: ILinks[] = [
  {
    path: '/',
    title: 'Заказы',
    icon: <Clipboard />,
  },
  {
    path: '/clients',
    title: 'Клиенты',
    icon: <Users />,
  },
  {
    path: '/products',
    title: 'Товары',
    icon: <Package />,
  },
  {
    path: '/drivers',
    title: 'Водители',
    icon: <Truck />,
  },
]

export const MainLayout = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const path = window.location.pathname

  const title = links.filter((item) => item.path === path)[0].title

  return (
    <div className={style.root}>
      <Group
        justify="space-between"
        py={12}
        px={16}
        align="center"
        bg="var(--mantine-color-gray-1)"
      >
        <Title order={3}>{title}</Title>
        <Menu onClick={open} />
      </Group>

      {opened && (
        <Drawer
          opened={opened}
          onClose={close}
          withCloseButton={false}
          position="right"
          padding={0}
          size={'xs'}
          styles={{
            body: {
              height: '100vh',
            },
          }}
        >
          <Stack
            className="container"
            pt={12}
            pb="calc(20px + env(safe-area-inset-bottom)"
            style={{
              height: '100vh',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className={style.drawerHeader}>
              <h4>Jayxun Suwlari</h4>
              <X onClick={close} />
            </div>
            <div className={style.links} style={{ flexGrow: 1 }}>
              {links.map((link) => (
                <NavLink
                  onClick={close}
                  to={link.path}
                  key={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${style.link} ${style.activeLink}`
                      : `${style.link}`
                  }
                >
                  <span className={style.linkIcon}>{link.icon}</span>
                  {link.title}
                </NavLink>
              ))}
            </div>
            <div>
              <Stack gap={20}>
                <LanguageButton />
                <Logout />
              </Stack>
            </div>
          </Stack>
        </Drawer>
      )}

      <div style={{ padding: '12px 16px 20px 16px' }}>
        <Outlet />
      </div>
    </div>
  )
}
