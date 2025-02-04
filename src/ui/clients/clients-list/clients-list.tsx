import { Center, Divider, Group, Loader, Stack, TextInput } from '@mantine/core'

import style from './clients-list.module.css'
import { Link } from 'react-router-dom'
import { Search } from 'react-feather'
import { useFethcClients } from '../../../queries/client-queries'
import { NoData } from '@/shared/ui/no-data/no-data'
import { Fragment } from 'react/jsx-runtime'
import { useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'

export const ClientsLIst = () => {
  const [search, setSearch] = useState<string>('')
  const [debouncedValue] = useDebouncedValue(search, 700)

  const {
    data: clients,
    isFetching,
    isSuccess,
  } = useFethcClients({
    page: 0,
    size: 10,
    value: debouncedValue,
  })

  const lastOrder = (index: number) => {
    if (isSuccess) {
      const orders = clients.content[index].orders

      if (orders && orders.length > 0) {
        const last = new Date(
          orders
            .map((item) => new Date(item.createdAt).getTime())
            .sort((a, b) => b - a)[0]
        )

        return {
          lastDate: `${
            last.getDate() > 9 ? last.getDate() : `0${last.getDate()}`
          }.${
            last.getMonth() + 1 > 9
              ? last.getMonth() + 1
              : `0${last.getMonth() + 1}`
          }.${last.getFullYear()}`,
          day: Math.floor(
            (new Date().getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
          ),
        }
      }
    }
    return null
  }

  return (
    <Stack gap={0} pt={12}>
      <TextInput
        mb={16}
        leftSection={<Search size={20} color="var(--mantine-color-gray-5)" />}
        placeholder="Поиск клиентов"
        value={search}
        onChange={(value) => setSearch(value.currentTarget.value)}
      />

      {isFetching && (
        <Center mt={30}>
          <Loader />
        </Center>
      )}

      {!isFetching &&
        ((clients?.content.length == 0 && <NoData title="Klient Joq" />) ||
          clients?.content.map((client, index) => {
            const lastOrderResult = lastOrder(index)
            return (
              <Fragment key={index}>
                <Stack gap={0}>
                  <Link
                    to={`/clients/${client.id}`}
                    style={{ all: 'unset', cursor: 'pointer' }}
                  >
                    <Stack gap={4}>
                      <Group justify="space-between" wrap="nowrap">
                        <p className={style.blackText}>{client.fullName}</p>
                        <span className={style.grayText}>Последний заказ:</span>
                      </Group>
                      <Group justify="space-between" wrap="nowrap">
                        <Group
                          gap={4}
                          align="center"
                          className={style.grayText}
                          wrap="nowrap"
                        >
                          <span>{client.phoneNumber}</span>
                          <span className={style.circle} />
                          <span>ID: {client.id}</span>
                        </Group>
                        {lastOrderResult && lastOrderResult.day > 20 && (
                          <p className={style.redText}>
                            {lastOrderResult.lastDate}
                          </p>
                        )}
                        {lastOrderResult &&
                          lastOrderResult.day > 10 &&
                          lastOrderResult.day <= 20 && (
                            <p className={style.orangeText}>
                              {lastOrderResult.lastDate}
                            </p>
                          )}
                        {lastOrderResult && lastOrderResult.day <= 10 && (
                          <p className={style.blackText}>
                            {lastOrderResult.lastDate}
                          </p>
                        )}
                        {client.orders.length === 0 && (
                          <p
                            style={{
                              color: 'var(--mantine-color-red-0)',
                              fontSize: '14px',
                              fontWeight: 500,
                            }}
                          >
                            Заказа пока нет.
                          </p>
                        )}
                      </Group>
                    </Stack>
                  </Link>

                  <Divider my={16} color="var(--mantine-color-gray-2)" />
                </Stack>
              </Fragment>
            )
          }))}
    </Stack>
  )
}
