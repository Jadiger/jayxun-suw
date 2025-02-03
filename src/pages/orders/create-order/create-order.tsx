import { NewClientOrder } from '@/features/orders/ui/create-order/new-client/new-client-order'
import NewOrderForBaseClient from '@/features/orders/ui/create-order/order-for-base-client/order-base-client'

import { PageHead } from '@/shared/ui/page-head/page-head'
import { SegmentedControl } from '@mantine/core'
import { useState } from 'react'

const CreateOrderPage = () => {
  const [value, setValue] = useState('new')

  return (
    <>
      <PageHead title="Создать заказ" render={<div></div>} />
      <div className="container">
        <SegmentedControl
          value={value}
          onChange={setValue}
          data={[
            { label: 'Новый клиент', value: 'new' },
            { label: 'На базе есть', value: 'base' },
          ]}
          w={'100%'}
          mt={12}
          radius="md"
        />
      </div>
      {value === 'new' && <NewClientOrder />}
      {value === 'base' && <NewOrderForBaseClient />}
    </>
  )
}

export default CreateOrderPage
