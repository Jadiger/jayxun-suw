import DriversList from '@/features/drivers/ui/drivers-list'
import { CreateButton } from '@/shared/ui/create-button/create-button'

const DriversPage = () => {
  return (
    <>
      <DriversList />
      <CreateButton link="/drivers/create" />
    </>
  )
}

export default DriversPage
