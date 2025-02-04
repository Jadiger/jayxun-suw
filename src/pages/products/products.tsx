import { ProductList } from '@/ui/products/product-list/product-list'
import { CreateButton } from '@/shared/ui/create-button/create-button'

const ProductsPage = () => {
  return (
    <>
      <ProductList />

      <CreateButton link="/products/create" />
    </>
  )
}

export default ProductsPage
