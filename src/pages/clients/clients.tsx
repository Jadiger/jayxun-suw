import { ClientsLIst } from '@/ui/clients/clients-list/clients-list'
import { CreateButton } from '@/shared/ui/create-button/create-button'

const ClientsPage = () => {
  return (
    <>
      <ClientsLIst />
      <CreateButton link="/clients/create" />
    </>
  )
}

export default ClientsPage
