import { useCreateCourier } from '@/queries/courierQueries'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { ICourierBody } from '@/types/drivers'

import { ChevronRight } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { DriverForm } from './drivers-form/drivers-form'


export const DriversCreate = () => {
  const navigate = useNavigate()

  const createMutation = useCreateCourier()

  const submitFn = async (data: ICourierBody) => {
    try {
      await createMutation.mutateAsync(data).then(() => {
        navigate('/drivers')
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <PageHead
        title="Добавить водителя"
        render={<ChevronRight color="var(--mantine-color-gray-1)" size={20} />}
      />

      <DriverForm
        loading={createMutation.isPending}
        submitFn={submitFn}
        title="Добавить водитель"
      />
    </>
  )
}
