import { IOrderProductWithCount } from '@/types/orders'
import { Center, Divider, Group, Loader, Stack, Title } from '@mantine/core'
import { Fragment } from 'react/jsx-runtime'
import style from './product-list.module.css'

export const ProductsListComponent = ({
  products,
  isSuccess,
  isLoading,
  price,
}: {
  products: IOrderProductWithCount[] | undefined
  isSuccess: boolean
  isLoading: boolean
  price?: number
}) => {
  return (
    <Stack>
      {isLoading && (
        <Center>
          <Loader />
        </Center>
      )}
      {!isLoading && isSuccess && products && (
        <Stack gap={12}>
          <Title order={4}>Товары</Title>
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
            {products?.map((product, index) => (
              <Fragment key={index}>
                <Group gap={8} justify="space-between" wrap="nowrap">
                  <img src={product.image} className={style.productImg} />
                  <div className={style.productInfo}>
                    <div className={style.productName}>{product.name}</div>
                    <div className={style.productPriceDetail}>
                      <p className={style.productPriceInfo}>
                        <span className={style.textBlack}>
                          {product.count} {`шт `}
                        </span>
                        <span className={style.textGray}>
                          x {product.price.toString().slice(0, -2)} сум
                        </span>
                      </p>
                      <p className={style.productPrice}>
                        {product.count * Number(product.price)} сум
                      </p>
                    </div>
                  </div>
                </Group>
                {products?.length !== index + 1 && (
                  <Divider my={12} color="var(--mantine-color-gray-2)" />
                )}
              </Fragment>
            ))}
          </Stack>

          {price && (
            <Group justify="space-between" wrap="nowrap">
              <p
                style={{
                  color: 'var(--mantine-color-gray-6)',
                  fontSize: '16px',
                }}
              >
                Всего
              </p>
              <Title order={4} style={{ color: 'var(--mantine-color-gray-8)' }}>
                {price} сум
              </Title>
            </Group>
          )}
        </Stack>
      )}
    </Stack>
  )
}
