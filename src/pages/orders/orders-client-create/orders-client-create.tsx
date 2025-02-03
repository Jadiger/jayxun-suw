import { PageHead } from '@/shared/ui/page-head/page-head'
import { ChevronRight } from 'react-feather'

const OrdersClientCreate = () => {
  return (
    <>
      <PageHead
        title="Добавить клиент в базу"
        render={<ChevronRight color="var(--mantine-color-gray-1)" />}
      />
    </>
  )
}

export default OrdersClientCreate
