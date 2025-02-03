import { Button, Group, Text } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { useState } from 'react'

interface ConfirmDialogProps {
  text: string
  onConfirm: (modalId: string) => Promise<unknown>
}

export const ConfirmDialog = (props: ContextModalProps<ConfirmDialogProps>) => {
  const { context, id, innerProps } = props
  const [isLoading, setIsLoading] = useState(false)

  const confirm = async () => {
    setIsLoading(true)
    await innerProps.onConfirm(id).finally(() => setIsLoading(false))
  }

  const closeModal = () => {
    context.closeModal(id)
  }

  return (
    <>
      <Text>{innerProps.text}</Text>
      <Group justify="flex-end" mt="lg">
        <Button disabled={isLoading} onClick={closeModal} variant="outline">
          Отмена
        </Button>
        <Button loading={isLoading} onClick={confirm}>
          Подтвердить
        </Button>
      </Group>
    </>
  )
}
