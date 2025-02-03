import { ClientInfo } from '@/features/clients/ui/client/client'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { ActionIcon } from '@mantine/core'

import { Edit2 } from 'react-feather'
import { Link, useParams } from 'react-router-dom'

const ClientPage = () => {
  const {id} = useParams()
  return (
    <>
      <PageHead
        title="Информация о клиенте"
        render={
          <ActionIcon
            variant="transparent"
            component={Link}
            to={`/clients/edit/${id}`}
          >
            <Edit2 color="var(--mantine-color-gray-8)" size={24} />
          </ActionIcon>
        }
      />
      <ClientInfo />
    </>
  )
}

export default ClientPage
