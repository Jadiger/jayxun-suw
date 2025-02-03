import { ActionIcon, Button, Group, Modal, Stack, Title } from '@mantine/core'
import { X } from 'react-feather'

export const DeleteModal = ({
  close,
  deleteFunc,
  opened,
  loading,
  title,
  message
}: {
  close: () => void
  deleteFunc: () => Promise<void>
  opened: boolean
  loading: boolean
  title : string
  message : string
}) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      centered
      radius={12}
    >
      <Stack gap={24}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Title order={4}>{title}</Title>
          <ActionIcon
            variant="subtle"
            color="var(--mantine-color-gray-8)"
            onClick={close}
          >
            <X size={24} />
          </ActionIcon>
        </Group>
        <p
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--mantine-color-gray-9)',
          }}
        >
          {message}
        </p>
        <Group gap={16} wrap="nowrap">
          <Button
            fullWidth
            style={{
              background: 'var(--mantine-color-gray-2)',
              color: 'var(--mantine-color-gray-8)',
            }}
            onClick={close}
          >
            Назад
          </Button>
          <Button
            fullWidth
            style={{
              background: 'var(--mantine-color-red-0)',
            }}
            onClick={deleteFunc}
            loading={loading}
          >
            Да
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
