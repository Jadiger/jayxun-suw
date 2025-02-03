import { PageHead } from '@/shared/ui/page-head/page-head'
import { ChevronRight } from 'react-feather'
import { ClientForm } from './form'
import { useNavigate } from 'react-router-dom'
import { useCreateClients } from '../queries/client-queries'
import { IClientBody } from '../types/clients'

function ClientCreate() {
  const navigate = useNavigate()
  const createMutatin = useCreateClients()

  const submitFn = async (data: IClientBody) => {
    try {
      await createMutatin.mutateAsync(data).then(() => navigate('/clients'))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PageHead
        title="Добавить клиент в базу"
        render={<ChevronRight color="var(--mantine-color-gray-1)" />}
      />
      <ClientForm
        submitFn={submitFn}
        loading={createMutatin.isPending}
        title="Добавить клиент"
        status="create"
      />
    </>
  )
}

export default ClientCreate
