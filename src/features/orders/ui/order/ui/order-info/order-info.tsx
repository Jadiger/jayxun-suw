import style from './order-info.module.css'
import { CheckNewOrder } from '../check-new-order/check-new-order'
import {
  ActionIcon,
  Center,
  Divider,
  Group,
  Loader,
  Stack,
  Title,
} from '@mantine/core'
import ClientInfo from '@/shared/ui/client-info/client-info'
import { Fragment } from 'react/jsx-runtime'

import { Phone, Map, Edit2 } from 'react-feather'
import { IOrderProductWithCount } from '@/features/orders/types/orders'
import { useFetchOrder } from '@/features/orders/queries/orders-queries'
import { Link, useParams } from 'react-router-dom'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { ProductsListComponent } from '@/shared/ui/products-list/products-list'

export const OrderInfo = () => {
  const { id } = useParams()
  const { data, isLoading, isSuccess } = useFetchOrder(Number(id))
  console.log(data)

  const products = data?.products.reduce<IOrderProductWithCount[]>(
    (acc, item) => {
      const found = acc.find((prod) => prod.id === item.id)
      if (found) {
        found.count++
      } else {
        acc.push({ ...item, count: 1 })
      }

      return acc
    },
    []
  )

  return (
    <>
      <PageHead
        title={`Заказ #${id}`}
        render={
          data?.status === 'CREATED' ? (
            <Link to={'/'} className={style.titleIcon}>
              <Edit2 />
            </Link>
          ) : (
            <Edit2 color="var(--mantine-color-gray-1)" />
          )
        }
      />
      {isLoading && (
        <Center>
          <Loader mt={30} />
        </Center>
      )}
      {isLoading ||
        (isSuccess && (
          <Fragment>
            <div className="container">
              <Stack gap={20} mb={32}>
                <Stack gap={0} pt={12}>
                  <ClientInfo
                    title="Клиент"
                    info={data?.client.fullName || ''}
                  />
                  <Divider my={12} />
                  <ClientInfo
                    title="ID Клиента"
                    info={String(data?.client.id)}
                  />
                  <Divider my={12} color="var(--mantine-color-gray-2)" />
                  <ClientInfo
                    title="Номер телефона"
                    info={data?.client.phoneNumber}
                    render={
                      <ActionIcon
                        p={8}
                        w={32}
                        h={32}
                        style={{ borderRadius: '50%' }}
                      >
                        <Phone size={24} />
                      </ActionIcon>
                    }
                  />

                  <Divider my={12} color="var(--mantine-color-gray-2)" />
                  {!data?.client.latitude && !data?.client.latitude && (
                    <ClientInfo title="Адрес" info={data?.client.streetName} />
                  )}

                  {data?.client.latitude && data.client.longitude && (
                    <ClientInfo
                      title="Адрес"
                      info={data?.client.streetName}
                      render={
                        <ActionIcon
                          p={8}
                          w={32}
                          h={32}
                          style={{ borderRadius: '50%' }}
                        >
                          <Map size={24} />
                        </ActionIcon>
                      }
                    />
                  )}

                  <Divider my={12} color="var(--mantine-color-gray-2)" />
                  <ClientInfo title="Ориентир" info={data?.client.landmark} />
                  <Divider my={12} color="var(--mantine-color-gray-2)" />
                  <ClientInfo
                    title="Время заказа"
                    info={
                      data
                        ? `${
                            new Date(data.createdAt).getHours() >= 10
                              ? new Date(data.createdAt).getHours()
                              : `0${new Date(data.createdAt).getHours()}`
                          }:
                ${
                  new Date(data.createdAt).getMinutes() >= 10
                    ? new Date(data.createdAt).getMinutes()
                    : `0${new Date(data.createdAt).getMinutes()}`
                }, 
                ${
                  new Date(data.createdAt).getDate() >= 10
                    ? new Date(data.createdAt).getDate()
                    : `0${new Date(data.createdAt).getDate()}`
                }.
                ${
                  new Date(data.createdAt).getMonth() + 1 >= 10
                    ? new Date(data.createdAt).getMonth() + 1
                    : `0${new Date(data.createdAt).getMonth() + 1}`
                }.
                ${new Date(data?.createdAt).getFullYear()}`
                        : 'WF'
                    }
                  />
                  {data?.status === 'DONE' && (
                    <Fragment>
                      <Divider my={12} color="var(--mantine-color-gray-2)" />
                      <ClientInfo
                        title="Время доставки"
                        info={
                          data
                            ? `${
                                new Date(data.updatedAt).getHours() >= 10
                                  ? new Date(data.updatedAt).getHours()
                                  : `0${new Date(data.updatedAt).getHours()}`
                              }:
                ${
                  new Date(data.updatedAt).getMinutes() >= 10
                    ? new Date(data.updatedAt).getMinutes()
                    : `0${new Date(data.updatedAt).getMinutes()}`
                }, 
                ${
                  new Date(data.updatedAt).getDate() >= 10
                    ? new Date(data.updatedAt).getDate()
                    : `0${new Date(data.updatedAt).getDate()}`
                }.
                ${
                  new Date(data.updatedAt).getMonth() + 1 >= 10
                    ? new Date(data.updatedAt).getMonth() + 1
                    : `0${new Date(data.updatedAt).getMonth() + 1}`
                }.
                ${new Date(data?.updatedAt).getFullYear()}`
                            : 'WF'
                        }
                      />
                      <Divider my={12} color="var(--mantine-color-gray-2)" />
                      <ClientInfo
                        title="Статус"
                        info="Успешно"
                        color="var(--mantine-color-green-0)"
                      />
                    </Fragment>
                  )}
                  {data?.status === 'REJECTED' && (
                    <Fragment>
                      <Divider my={12} color="var(--mantine-color-gray-2)" />
                      <ClientInfo
                        title="Статус"
                        info="Отменен"
                        color="var(--mantine-color-red-0)"
                      />
                      <Divider my={12} color="var(--mantine-color-gray-2)" />
                      <ClientInfo
                        title="Причина отмена заказа"
                        info={data.description}
                      />
                    </Fragment>
                  )}
                </Stack>
                <ProductsListComponent
                  products={products}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  price={data.price}
                />

                <Stack gap={12}>
                  <Title order={4}>Водитель</Title>
                  <Stack
                    gap={0}
                    style={{
                      backgroundColor: 'var(--mantine-color-gray-0)',
                      border: '1px solid var(--mantine-color-gray-2)',
                      borderRadius: '12px',
                    }}
                    py={12}
                    px={8}
                  >
                    <Group gap={8} justify="space-between" wrap="nowrap">
                      <img
                        src="/products/driver.png"
                        className={style.productImg}
                      />
                      <div className={style.productInfo}>
                        <div
                          className={style.productName}
                        >{`${data?.courier.lastName} ${data?.courier.firstName}`}</div>
                        <div className={style.carInfo}>
                          <div className={style.textBlack}>
                            {data?.courier.carName}
                          </div>
                          <div className={style.textGray}>
                            {data?.courier.carNumber}
                          </div>
                        </div>
                      </div>
                    </Group>
                  </Stack>
                </Stack>
              </Stack>
              <div style={{ height: '100px' }}></div>
            </div>
            {data?.status === 'CREATED' && (
              <CheckNewOrder
                lat={data?.client.latitude}
                lng={data?.client.longitude}
                clientId={data.client.id}
                id={data.id}
              />
            )}
          </Fragment>
        ))}
    </>
  )
}
