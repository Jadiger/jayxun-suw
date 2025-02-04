
import { PageHead } from '@/shared/ui/page-head/page-head'
import { ProductCreate } from '@/ui/products/product-create/product-create'
import { ChevronRight } from 'react-feather'

const ProductCreatePage = () => {
  return (
    <>
      <PageHead
        title="Добавить товар"
        render={<ChevronRight color="var(--mantine-color-gray-1)" />}
      />

      <ProductCreate />
    </>
  )
}

export default ProductCreatePage
