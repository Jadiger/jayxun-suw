import style from './new-orders-list.module.css'

import { Link } from 'react-router-dom'
import { Center, Divider, Group, Loader, Stack, Title } from '@mantine/core'
import { NoData } from '@/shared/ui/no-data/no-data'
import { Circle, Flag, MapPin } from 'react-feather'

import { Fragment } from 'react/jsx-runtime'
import { useFetchNewOrders } from '@/queries/orders-queries'
import { IOrderProduct } from '@/types/orders'

export const NewOrdersList = () => {
  const { data, isFetching: isLoading } = useFetchNewOrders({
    page: 0,
    size: 10,
  })

  if (data?.content.length === 0) {
    return <NoData title="У вас нет заказов" />
  }

  const productsCount = (products: IOrderProduct[]) => {
    const productCounts: Record<string, number> = products.reduce(
      (acc, product) => {
        acc[product.name] = (acc[product.name] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const productListString = Object.entries(productCounts)
      .map(([name, count]) => `${count} ${name}`)
      .join(', ')

    return productListString
  }

  return (
    <Stack gap={0} pt={12}>
      {isLoading && (
        <Center mt={30}>
          <Loader />
        </Center>
      )}

      {!isLoading &&
        data?.content.map((order, index) => (
          <Fragment key={index}>
            <Link
              to={`/orders/${order.id}`}
              style={{
                textDecoration: 'none',
                display: 'block',
                all: 'unset',
                cursor: 'pointer',
              }}
            >
              <Stack gap={8}>
                <Group
                  justify="space-between"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'var(--mantine-color-gray-6)',
                  }}
                >
                  <span>{`#${order.id}`}</span>
                  <span>
                    {`${
                      new Date(order.createdAt).getHours() >= 10
                        ? new Date(order.createdAt).getHours()
                        : `0${new Date(order.createdAt).getHours()}`
                    }:
                ${
                  new Date(order.createdAt).getMinutes() >= 10
                    ? new Date(order.createdAt).getMinutes()
                    : `0${new Date(order.createdAt).getMinutes()}`
                },
                ${
                  new Date(order.createdAt).getDate() >= 10
                    ? new Date(order.createdAt).getDate()
                    : `0${new Date(order.createdAt).getDate()}`
                }.
                ${
                  new Date(order.createdAt).getMonth() + 1 >= 10
                    ? new Date(order.createdAt).getMonth() + 1
                    : `0${new Date(order.createdAt).getMonth() + 1}`
                }.
                ${new Date(order.createdAt).getFullYear()}`}
                  </span>
                </Group>

                <Title order={6} fz={18}>
                  {productsCount(order.products)}
                </Title>

                <div className={style.orderClient}>
                  <div className={style.clientInfo}>
                    {!order.client.latitude && !order.client.latitude && (
                      <span className={style.orderIcon}></span>
                    )}
                    {`${order.client.fullName} (#${order.client.id})`}
                    <Circle size={5} color="var(--mantine-color-gray-6)" />
                    <a
                      className={style.clientPhone}
                      href={`tel:${order.client.phoneNumber}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        // e.preventDefault()
                      }}
                    >
                      {order.client.phoneNumber}
                    </a>
                  </div>
                </div>

                <div className={style.clientAdress}>
                  <MapPin size={20} />
                  {order.client.streetName}
                </div>

                <div className={style.clientAdress}>
                  <Flag size={20} />
                  {order.client.landmark}
                </div>
              </Stack>
            </Link>
            {data.content.length !== index + 1 && (
              <Divider my={12} color="var(--mantine-color-gray-2)" />
            )}
          </Fragment>
        ))}
    </Stack>
  )
}
