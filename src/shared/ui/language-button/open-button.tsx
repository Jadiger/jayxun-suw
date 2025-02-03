import { Button, Drawer, Stack } from '@mantine/core'
import style from './language-button.module.css'
import { useDisclosure } from '@mantine/hooks'
import { LanguageButton } from './language-button'
import { Globe, X } from 'react-feather'

export function OpenButton() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Drawer
        padding={0}
        radius="md"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        position="bottom"
      >
        <div className="container">
          <div className={style.content}>
            <Stack gap={'24px'}>
              <div className={style.header}>
                <h4>Выберите язык</h4>
                <X onClick={close} />
              </div>
              <LanguageButton />
              <Button onClick={close}>Выбрать</Button>
            </Stack>
          </div>
        </div>
      </Drawer>

      <Button
        onClick={open}
        style={{
          color: 'var(--mantine-color-gray-5)',
          backgroundColor: '#fff',
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: '500',
          paddingBottom: "env(safe-area-inset-bottom)"

        }}
        className={style.openButton}
      >
        <Globe size={20} /> Русский
      </Button>
    </>
  )
}
