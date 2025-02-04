import { useCreateClients } from '@/queries/client-queries'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { IClientBody } from '@/types/clients'
import { ChevronRight } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { ClientForm } from './form'

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
