import { Button, Group, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'

import { hasLength, isNotEmpty, useForm } from '@mantine/form'
import { PatternFormat } from 'react-number-format'
import { BottomButtonWrapper } from '@/shared/ui'
import { IClientBody } from '@/types/clients'
import { ClientMap } from './map'

export const ClientForm = ({
  initialValues,
  submitFn,
  id,
  loading,
  title,
  status,
}: {
  initialValues?: IClientBody
  submitFn: (data: IClientBody) => Promise<unknown>
  id?: number
  loading: boolean
  title: string
  status?: string
}) => {
  const [map, setMap] = useState<boolean>(false)

  const form = useForm<IClientBody>({
    initialValues,
    validate: {
      fullName: isNotEmpty('required'),
      phoneNumber: hasLength({ min: 9 }),
      streetName: isNotEmpty('required'),
      landmark: isNotEmpty('required'),
    },
    transformValues: (values) => {
      return {
        ...values,
        phoneNumber: `998${values.phoneNumber}`,
      }
    },
  })
  const handleSubmit = async (data: typeof form.values) => {
    try {
      submitFn(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form className="container" onSubmit={form.onSubmit(handleSubmit)}>
        <Stack py={12} gap={12} mb={30}>
          {id && (
            <Group
              wrap="nowrap"
              gap={8}
              py={12}
              px={8}
              justify="center"
              style={{
                borderRadius: '8px',
                border: '1px solid var(--mantine-color-gray-3)',
                background: 'var(--mantine-color-gray-1)',
              }}
            >
              <span
                style={{
                  color: 'var(--mantine-color-gray-6)',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '24px',
                }}
              >
                Клиент ID:
              </span>
              <span
                style={{
                  color: 'var(--mantine-color-gray-9)',
                  fontSize: '16px',
                  fontWeight: '600',
                  lineHeight: '24px',
                }}
              >
                {`#${id}`}
              </span>
            </Group>
          )}

          <TextInput
            label="Клиент ФИО"
            withAsterisk
            placeholder="Full Name"
            {...form.getInputProps('fullName')}
          />

          <PatternFormat
            withAsterisk
            format="+998 ## ### ## ##"
            mask=" "
            allowEmptyFormatting={true}
            customInput={TextInput}
            label="Номер телефона"
            {...form.getInputProps('phoneNumber')}
            onValueChange={(values) => {
              form.setFieldValue('phoneNumber', values.value)
            }}
            onChange={() => {}}
          />
          {status === 'create' && (
            <TextInput
              label="Адрес"
              placeholder="Выберите адрес"
              {...form.getInputProps('streetName')}
            />
          )}
          {status !== 'create' && (
            <TextInput
              placeholder="Выберите адрес"
              value={form.values.streetName}
              withAsterisk
              label="Адрес"
              readOnly
              onClick={() => {
                setMap(true)
              }}
              autoCapitalize="off"
              spellCheck="false"
            />
          )}

          <TextInput
            label="Ориентир"
            placeholder="Введите ориентир (необязательно)"
            {...form.getInputProps('landmark')}
          />
        </Stack>

        {map && <ClientMap setMap={setMap} form={form} />}

        <BottomButtonWrapper
          render={
            <Group wrap="nowrap">
              <Button
                type="submit"
                fullWidth
                disabled={!form.isDirty()}
                bg={'var(--mantine-color-primary-5)'}
                loading={loading}
              >
                {title}
              </Button>
            </Group>
          }
        />
      </form>
    </>
  )
}
