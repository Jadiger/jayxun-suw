import { PageHead } from '@/shared/ui/page-head/page-head'
import { Center, Divider, Group, Loader, Stack, Title } from '@mantine/core'
import { Edit2 } from 'react-feather'

import style from './product-info.module.css'
import { Link, useParams } from 'react-router-dom'
import { useFethcProduct } from '../../queries/product-queries'

export const ProductInfo = () => {
  const { id } = useParams()

  const { data: product, isLoading } = useFethcProduct(Number(id))

  return (
    <>
      <PageHead
        title="Информация о товаре"
        render={
          <Link
            to={'/products/edit/' + product?.id}
            style={{ all: 'unset', cursor: 'pointer' }}
          >
            <Edit2 color="var(--mantine-color-gray-8)" size={24} />
          </Link>
        }
      />

      <div className="container">
        {isLoading && (
          <Center mt={30}>
            <Loader />
          </Center>
        )}

        {isLoading || (
          <Stack py={12} gap={20}>
            <img src={product?.image} className={style.image} />

            <div>
              <p className={style.grayText}>Название товара</p>
              <p className={style.info}>{product?.name}</p>
              <Divider my={12} color="var(--mantine-color-gray-2)" />
              <p className={style.grayText}>Цена</p>
              <p className={style.info}>{product?.price} сум</p>
            </div>
            <Stack gap={12}>
              <Title order={4}>Количество</Title>
              <Group
                gap={12}
                p={12}
                justify="space-between"
                bg="var(--mantine-color-gray-0)"
                style={{
                  border: '1px solid var(--mantine-color-gray-2)',
                  borderRadius: '12px',
                }}
                wrap='nowrap'
              >
                <div className={style.block}>
                  <p className={style.title}>На складе</p>
                  <p className={style.info}>500 шт</p>
                </div>
                <span className={style.line}></span>
                <div className={style.block}>
                  <p className={style.title}>В продаже</p>
                  <p className={style.info}>400 шт</p>
                </div>
              </Group>
            </Stack>
          </Stack>
        )}
      </div>
    </>
  )
}
