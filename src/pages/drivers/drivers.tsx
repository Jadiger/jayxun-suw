import DriversList from '@/ui/drivers/drivers-list'
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
