import { useNavigate } from 'react-router-dom'

import { ProductForm } from '../product-form/product-form'
import { useCreateProduct } from '@/queries/product-queries'
import { ProductBody } from '@/types/products'

export const ProductCreate = () => {
  const navigate = useNavigate()
  const createMutation = useCreateProduct()

  const submitFn = async (data: ProductBody) => {
    try {
      createMutation.mutateAsync(data).then(() => navigate('/products'))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ProductForm
        loading={createMutation.isPending}
        submitFn={submitFn}
        title="Добавить товар"
      />
    </>
  )
}
