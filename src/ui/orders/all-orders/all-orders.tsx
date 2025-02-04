import {
  ActionIcon,
  Center,
  Divider,
  Group,
  Loader,
  Stack,
  Title,
} from '@mantine/core'

import style from './all-orders.module.css'
import { Link } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { AllOldersFilter } from './filter/all-orders-filter'
import { useFetchOldOrders } from '../../../queries/orders-queries'
import { NoData } from '@/shared/ui/no-data/no-data'
import { IOrder, IOrderProduct } from '../../../types/orders'
import { Sliders } from 'react-feather'

export const AllOrders = () => {
  const [filter, setFilter] = useState<boolean>(false)
  const [filterModal, setFilterModal] = useState<boolean>(false)
  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useFetchOldOrders({ size: 10, page: 0 })

  // console.log(orders)
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
  if (orders?.content.length === 0) {
    return <NoData title="Zakaz joq" />
  }

  const ordersByDate = (): { date: string; orders: IOrder[] | undefined }[] => {
    if (isSuccess && orders?.content) {
      const newOrdersList: { date: string; orders: IOrder[] | undefined }[] = []
      const dates = [
        ...new Set(
          orders.content
            .map((order) => order.createdAt.split(' ')[0])
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        ),
      ]
      dates.forEach((date) => {
        const ordersForDate = orders.content.filter(
          (order) => order.createdAt.split(' ')[0] === date
        )
        if (ordersForDate.length > 0) {
          newOrdersList.push({
            date,
            orders: ordersForDate,
          })
        }
      })

      return newOrdersList
    }
    return [] // Default qiymat
  }
  //

  return (
    <>
      {isLoading && (
        <Center mt={30}>
          <Loader />
        </Center>
      )}
      {isSuccess && (
        <Stack py={12} gap={12}>
          <Group justify="space-between" wrap="nowrap">
            <div>
              <div style={{ fontSize: '14px', fontWeight: '400' }}>
                <span style={{ color: 'var(--mantine-color-gray-6)' }}>
                  Период
                </span>
                <span style={{ color: 'var(--mantine-color-gray-9)' }}>
                  01.01.2025-15.01.2025
                </span>
              </div>
              <Title order={5}>5 900 000 сум</Title>
              <p className={style.grayText}>123 вода, 123 баклашка, 12 помпа</p>
            </div>
            <ActionIcon
              onClick={() => {
                console.log('clicked')
                setFilterModal(true)
              }}
              p={8}
              size={32}
              bg={
                filter
                  ? 'var(--mantine-color-primary-5)'
                  : 'var(--mantine-color-gray-1)'
              }
            >
              <Sliders
                style={{ flexShrink: '0' }}
                color={filter ? '#fff' : 'var(--mantine-color-gray-8)'}
                size={24}
              />
            </ActionIcon>
          </Group>
          {ordersByDate().map((item, index) => (
            <Stack gap={0} key={index}>
              <Group
                justify="space-between"
                gap={0}
                px={16}
                mb={12}
                bg="var(--mantine-color-gray-2)"
                style={{ margin: '0 -16px' }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--mantine-color-gray-9)',
                    fontWeight: '400',
                  }}
                >
                  {item.date}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--mantine-color-gray-7)',
                    fontWeight: '400',
                  }}
                >
                  {item.orders?.reduce((acc, item) => acc + item.price, 0)} сум
                </span>
              </Group>
              {item.orders
                ?.sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((order, index) => (
                  <Fragment>
                    <Link
                      key={index}
                      to={`/orders/${order.id}`}
                      style={{ textTransform: 'none', all: 'unset' }}
                    >
                      <Stack gap={4}>
                        <Group justify="space-between">
                          <span
                            className={style.grayText}
                          >{`#${order.id}`}</span>
                          {order.status === 'DONE' && (
                            <span
                              className={style.status}
                              style={{
                                color: 'var(--mantine-color-green-0)',
                                background: 'rgba(95, 179, 96, 0.10)',
                              }}
                            >
                              Успешно
                            </span>
                          )}
                          {order.status === 'REJECTED' && (
                            <span
                              className={style.status}
                              style={{
                                color: 'var(--mantine-color-red-0)',
                                background: 'rgba(212, 88, 71, 0.10)',
                              }}
                            >
                              Отменен
                            </span>
                          )}
                        </Group>
                        <Group justify="space-between">
                          <span
                            style={{
                              fontSize: '14px',
                              fontWeight: '500',
                            }}
                          >
                            {order.client.fullName}
                          </span>
                          <span
                            style={{
                              fontSize: '16px',
                              fontWeight: '500',
                              lineHeight: '24px',
                            }}
                          >
                            {`${order.price} сум`}
                          </span>
                        </Group>
                        <Group justify="space-between">
                          <span className={style.grayText}>
                            {productsCount(order.products)}
                          </span>
                          <span className={style.grayText}>
                            {`${
                              new Date(order.createdAt).getHours() > 9
                                ? new Date(order.createdAt).getHours()
                                : `0${new Date(order.createdAt).getHours()}`
                            }:${
                              new Date(order.createdAt).getMinutes() > 9
                                ? new Date(order.createdAt).getMinutes()
                                : `0${new Date(order.createdAt).getMinutes()}`
                            }`}
                          </span>
                        </Group>
                      </Stack>
                    </Link>
                    {item.orders?.length !== index + 1 && (
                      <Divider color="var(--mantine-color-gray-2)" my={12} />
                    )}
                  </Fragment>
                ))}
            </Stack>
          ))}
        </Stack>
      )}
      {filterModal && (
        <AllOldersFilter
          setFilter={setFilter}
          setFilterModal={setFilterModal}
        />
      )}
    </>
  )
}
