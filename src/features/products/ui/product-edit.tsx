import { PageHead } from '@/shared/ui/page-head/page-head'

import { Trash2 } from 'react-feather'
import { ProductForm } from './product-form/product-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useDeleteProduct,
  useFethcProduct,
  useUpdateProduct,
} from '../queries/product-queries'
import { ProductBody } from '../types/products'
import { ActionIcon, Center, Loader } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DeleteModal } from '@/shared/ui/delete-modal'

export const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [opened, { open, close }] = useDisclosure(false)

  const {
    data: product,
    isLoading,
    // error,
    isSuccess,
  } = useFethcProduct(Number(id))

  const updateMutation = useUpdateProduct()

  const submitFn = async (data: ProductBody) => {
    try {
      await updateMutation
        .mutateAsync({ body: data, id: Number(id) })
        .then(() => navigate('/products'))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMutation = useDeleteProduct()

  const deleteFunc = async () => {
    try {
      await deleteMutation
        .mutateAsync(Number(id))
        .then(() => navigate('/products'))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PageHead
        title="Изменить товар"
        render={
          <ActionIcon variant="transparent" onClick={open}>
            <Trash2 size={24} color="var(--mantine-color-gray-8)" />
          </ActionIcon>
        }
      />

      {isLoading && (
        <Center mt={30}>
          <Loader />
        </Center>
      )}

      {isLoading ||
        (isSuccess && (
          <ProductForm
            title="Изменить товар"
            loading={updateMutation.isPending}
            submitFn={submitFn}
            initialValues={{
              image: product?.image,
              name: product?.name,
              price: Number(product?.price),
            }}
          />
        ))}

      <DeleteModal
        title="Удалить товар"
        message="Вы хотите удалить товар?"
        close={close}
        deleteFunc={deleteFunc}
        opened={opened}
        loading={deleteMutation.isPending}
      />
    </>
  )
}
