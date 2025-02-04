import { useDoneOrders, useRejectOrders } from '@/queries/orders-queries'
import { rejectBody } from '@/types/orders'
import { BottomButtonWrapper } from '@/shared/ui'
import {
  Button,
  Grid,
  Group,
  Modal,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

import { X } from 'react-feather'

import { useNavigate } from 'react-router-dom'

export const CheckNewOrder = ({
  lat,
  lng,
  clientId,
  id,
}: {
  lat: string
  lng: string
  clientId: number
  id: number
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()

  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')

  const doneMutation = useDoneOrders()
  const rejectMutation = useRejectOrders()

  const doneSubmit = async (id: number, link: string) => {
    try {
      await doneMutation.mutateAsync(id).then(() => {
        navigate(`${link}`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const rejectSubmit = async (id: number, body: rejectBody) => {
    try {
      await rejectMutation.mutateAsync({ id, body }).then(() => {
        navigate('/')
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        radius={16}
        // padding='20px 16px 35px 16px'
        padding="lg"
      >
        {status === 'cancel' && (
          <Stack gap="24">
            <Group justify="space-between">
              <Title order={4}>Отменить заказ</Title>
              <span>
                <X
                  size={24}
                  color="var(--mantine-color-gray-8)"
                  onClick={close}
                />
              </span>
            </Group>
            <Stack gap="8">
              <p
                style={{
                  color: 'var(--mantine-color-gray-9)',
                  fontWeight: 500,
                  fontSize: '14px',
                }}
              >
                Почему вы решили отменить заказ?
              </p>
              <TextInput
                placeholder="Напишите причину"
                style={{ fontSize: '14px' }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
            <Button
              style={{
                background: 'var(--mantine-color-red-0)',
                fontSize: '14px',
              }}
              disabled={!(description.length > 0)}
              onClick={() => {
                rejectSubmit(id, { description })
              }}
            >
              Отменить
            </Button>
          </Stack>
        )}
        {status === 'ok' && (
          <Stack gap="24">
            <Group justify="space-between" align="center">
              <Title order={4}>Выполнить заказ</Title>
              <span>
                <X
                  size={24}
                  color="var(--mantine-color-gray-8)"
                  onClick={close}
                />
              </span>
            </Group>

            <p
              style={{
                color: 'var(--mantine-color-gray-9)',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              Вы уверены, что заказ был доставлен?
            </p>

            <Grid gutter={16}>
              <Grid.Col span={6}>
                <Button
                  fullWidth
                  style={{
                    background: 'var(--mantine-color-gray-2)',
                    fontSize: '14px',
                    color: 'var(--mantine-color-gray-8)',
                  }}
                  onClick={close}
                >
                  Назад
                </Button>
              </Grid.Col>

              <Grid.Col span={6}>
                {lat && lng && (
                  <Button
                    fullWidth
                    style={{
                      background: 'var(--mantine-color-green-0)',
                      fontSize: '14px',
                    }}
                    onClick={() => doneSubmit(id, '/')}
                  >
                    Да
                  </Button>
                )}
                {!lat && !lng && (
                  <Button
                    onClick={() => doneSubmit(id, `/clients/edit/${clientId}`)}
                    fullWidth
                    style={{
                      background: 'var(--mantine-color-green-0)',
                      fontSize: '14px',
                    }}
                  >
                    Да
                  </Button>
                )}
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Modal>
      <BottomButtonWrapper
        render={
          <Group wrap="nowrap" grow>
            <Button
              onClick={() => {
                setStatus('cancel')
                open()
              }}
              style={{ background: 'var(--mantine-color-red-0)' }}
            >
              Отменить
            </Button>

            <Button
              onClick={() => {
                setStatus('ok')
                open()
              }}
              style={{ background: 'var(--mantine-color-green-0)' }}
            >
              Доставил
            </Button>
          </Group>
        }
      />
    </>
  )
}
