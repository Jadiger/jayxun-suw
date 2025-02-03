import { NewOrdersList } from '@/features/orders/ui/new-orders-list/new-orders-list'
import { SegmentedControl, Stack } from '@mantine/core'
import { useState } from 'react'

import { AllOrders } from '@/features/orders/ui/all-orders/all-orders'
import { CreateButton } from '@/shared/ui/create-button/create-button'

function OrdersPage() {
  const [status, setStatus] = useState('new')

  return (
    <Stack gap={12}>
      <SegmentedControl
        value={status}
        onChange={setStatus}
        fullWidth
        radius="md"
        data={[
          {
            label: 'Новые',
            value: 'new',
          },
          {
            label: 'Все',
            value: 'all',
          },
        ]}
      />

      {status === 'new' && <NewOrdersList />}

      {status !== 'new' && <AllOrders />}

      <CreateButton link="/orders/create" />
    </Stack>
  )
}

export default OrdersPage
