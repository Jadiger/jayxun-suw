import { Center, Divider, Group, Loader, Stack } from '@mantine/core'

import style from './product-list.module.css'
import { Link } from 'react-router-dom'
import { useFethcProducts } from '../../queries/product-queries'
import { Fragment } from 'react/jsx-runtime'
import { NoData } from '@/shared/ui/no-data/no-data'

export const ProductList = () => {
  const { data: products, isFetching } = useFethcProducts({ page: 0, size: 10 })

  if (products?.content.length === 0) {
    return <NoData title="No Products" />
  }

  return (
    <div className="container">
      <Stack py={16} gap={0}>
        {isFetching && (
          <Center mt={30}>
            <Loader />
          </Center>
        )}

        {isFetching ||
          products?.content.map((product, index) => (
            <Fragment key={product.id}>
              <Link
                to={`${product.id}`}
                style={{ all: 'unset', cursor: 'pointer' }}
              >
                <Group justify="space-between" gap={8} wrap="nowrap">
                  <img
                    src={`${
                      product.image
                        ? product.image
                        : '/products/defaultProduct.svg'
                    }`}
                    className={style.image}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <p className={style.title} style={{ marginBottom: '4px' }}>
                      {product.name}
                    </p>
                    <Group justify="space-between" align="center" wrap="nowrap">
                      <div>
                        <p className={style.info}>
                          На складе:{' '}
                          <span className={style.infoPrice}>9999 шт</span>
                        </p>
                        <p className={style.info}>
                          В продаже:{' '}
                          <span className={style.infoPrice}>9999 шт</span>
                        </p>
                        <p></p>
                      </div>
                      <p className="title">{product.price} сум</p>
                    </Group>
                  </div>
                </Group>
              </Link>
              {products.content.length !== index + 1 && (
                <Divider my={16} color="var(--mantine-color-gray-2)" />
              )}
            </Fragment>
          ))}
      </Stack>
    </div>
  )
}
