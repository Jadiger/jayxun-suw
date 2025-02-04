import { PageHead } from '@/shared/ui/page-head/page-head'
import { DriverInfo } from '@/ui/drivers/driver'
import { ActionIcon } from '@mantine/core'
import { Edit2 } from 'react-feather'
import { Link, useParams } from 'react-router-dom'

const DriverPage = () => {
  const { id } = useParams()
  return (
    <>
      <PageHead
        title="Информация о водителе"
        render={
          <ActionIcon
            component={Link}
            to={`/drivers/edit/${id}`}
            variant="transparent"
          >
            <Edit2 size={20} color="var(--mantine-color-gray-8)" />
          </ActionIcon>
        }
      />
      <DriverInfo />
    </>
  )
}

export default DriverPage
