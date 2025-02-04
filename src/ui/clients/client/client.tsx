import {
  ActionIcon,
  Center,
  Divider,
  Group,
  Loader,
  Stack,
  Title,
} from '@mantine/core'
import style from './client.module.css'
import ClientInfoBlock from '@/shared/ui/client-info/client-info'
import { Map, Phone } from 'react-feather'

import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import MapWithRouting from '@/shared/ui/map-with-routing/map-with-routing'
import { ProductsListComponent } from '@/shared/ui/products-list/products-list'
import { IOrderProductWithCount } from '@/types/orders'
import { Product } from '@/types/products'
import { useFethcClient } from '@/queries/client-queries'

export const ClientInfo = () => {
  const { id } = useParams()
  const {
    data: client,
    isLoading,
    isSuccess,
  } = useFethcClient(Number(id), {
    queryKey: ['client', id],
  })
  const [mapRouting, setMapRouting] = useState(false)
  const formatDate = (dateStr: string) => {
    if (!dateStr) {
      return ''
    }
    const [date, time] = dateStr.split(' ')
    const [day, month, year] = date
      .split('-')
      .map((num) => num.padStart(2, '0'))
    const [hours, minutes] = time.split(':').map((num) => num.padStart(2, '0'))

    return `${day}.${month}.${year}, ${hours}:${minutes}`
  }

  console.log(client)

  const products = (productsList: Product[]) =>
    productsList.reduce<IOrderProductWithCount[]>((acc, item) => {
      const found = acc.find((prod) => prod.id === item.id)
      if (found) {
        found.count++
      } else {
        acc.push({ ...item, count: 1 })
      }

      return acc
    }, [])

  return (
    <div className="container">
      {isLoading && (
        <Center mt={30}>
          <Loader />
        </Center>
      )}
      {!isLoading && (
        <Stack gap={20} pt={12} pb={25}>
          <Group justify="center" gap={8} className={style.title}>
            <span className={style.titleInfo}>Клиент ID:</span>
            <Title order={5}>#{client?.id}</Title>
          </Group>
          <div>
            <ClientInfoBlock title="Клиент" info={`${client?.fullName}`} />
            <Divider my={12} color="var(--mantine-color-gray-2)" />
            <ClientInfoBlock
              title="Номер телефона"
              info={`${client?.phoneNumber}`}
              render={
                <ActionIcon radius={'50%'} p={8} size={32}>
                  <Phone size={24} />
                </ActionIcon>
              }
            />
            <Divider my={12} color="var(--mantine-color-gray-2)" />
            {client?.latitude && client.longitude && (
              <ClientInfoBlock
                title="Адрес"
                info={client?.streetName || ''}
                render={
                  <ActionIcon
                    radius={'50%'}
                    p={8}
                    size={32}
                    onClick={() => {
                      setMapRouting(true)
                    }}
                  >
                    <Map size={24} />
                  </ActionIcon>
                }
              />
            )}
            {!client?.latitude && !client?.longitude && (
              <ClientInfoBlock title="Адрес" info={client?.streetName || ''} />
            )}
            <Divider my={12} color="var(--mantine-color-gray-2)" />

            <ClientInfoBlock title="Ориентир" info={client?.landmark || ''} />
            <Divider my={12} color="var(--mantine-color-gray-2)" />
          </div>

          {mapRouting && (
            <MapWithRouting
              lat={Number(client?.latitude)}
              lng={Number(client?.longitude)}
            />
          )}
          <ProductsListComponent
            isSuccess={isSuccess}
            isLoading={isLoading}
            products={client?.orders
              .filter(item => item.status === 'DONE')
              .flatMap((order) =>
                order.products.filter((product) => product.id !== 2)
              )
              .reduce<IOrderProductWithCount[]>((acc, item) => {
                const found = acc.find((prod) => prod.id === item.id)
                if (found) {
                  found.count++
                } else {
                  acc.push({ ...item, count: 1 })
                }

                return acc
              }, [])}
          />

          <Stack gap={8}>
            <Title order={4}>Заказы</Title>
            {client?.orders.map((order, index) => {
              return (
                <Link
                  key={index}
                  to={`/orders/${order.id}`}
                  style={{ all: 'unset', cursor: 'pointer' }}
                >
                  <div className={style.clientOrder} key={index}>
                    <Group
                      justify="space-between"
                      wrap="nowrap"
                      className={style.cleintBlackText}
                    >
                      <span>{formatDate(order.createdAt)}</span>
                      <span>{`${order.price} сум`}</span>
                    </Group>
                    <Group justify="space-between" wrap="nowrap">
                      <span className={style.clientGrayText}>
                        {products(order.products).map((item, index) =>
                          products(order.products).length !== index + 1
                            ? `${item.count} ${item.name}, `
                            : `${item.count} ${item.name}`
                        )}
                      </span>
                      {order.status === 'DONE' && (
                        <span className={style.statusDone}>Успешно</span>
                      )}
                      {order.status === 'REJECTED' && (
                        <span className={style.statusRejected}>Отменен</span>
                      )}
                    </Group>
                  </div>
                </Link>
              )
            })}
          </Stack>
        </Stack>
      )}
    </div>
  )
}
