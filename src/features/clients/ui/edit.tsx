import { PageHead } from '@/shared/ui/page-head/page-head'
import { Trash2 } from 'react-feather'
import { ClientForm } from './form'
import {
  useDeleteClient,
  useFethcClient,
  useUpdateClient,
} from '../queries/client-queries'
import { useNavigate, useParams } from 'react-router-dom'
import { IClientBody } from '../types/clients'
import { ActionIcon, Center, Loader } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DeleteModal } from '@/shared/ui/delete-modal'

export const ClientEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [opened, { open, close }] = useDisclosure(false)

  const {
    data: client,
    isLoading,
    isSuccess,
  } = useFethcClient(Number(id), { queryKey: ['client', id] })

  const initaialValues: IClientBody = {
    fullName: client?.fullName || '',
    landmark: client?.landmark || '',
    phoneNumber: client?.phoneNumber.slice(3, 12) || '',
    latitude: client?.latitude || '',
    longitude: client?.longitude || '',
    streetName: client?.streetName || '',
  }

  const updateMutation = useUpdateClient()

  const submitFn = async (data: IClientBody) => {
    try {
      await updateMutation
        .mutateAsync({ body: data, id: Number(id) })
        .then(() => {
          navigate('/clients')
        })
    } catch (error) {
      console.log(error)
    }
  }
  const deleteMutation = useDeleteClient()

  const deleteFn = async () => {
    try {
      await deleteMutation.mutateAsync(Number(id)).then(() => {
        navigate('/clients')
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PageHead
        title="Edit Client"
        render={
          <ActionIcon variant="transparent" onClick={open}>
            <Trash2 size={24} color="var(--mantine-color-gray-8)" />
          </ActionIcon>
        }
      />
      {isLoading && (
        <Center>
          <Loader />
        </Center>
      )}
      {isLoading ||
        (isSuccess && (
          <ClientForm
            initialValues={initaialValues}
            submitFn={submitFn}
            loading={updateMutation.isPending}
            title="Изменить клиент"
          />
        ))}

      {opened && (
        <DeleteModal
          title="Удалить клиент"
          message="Do You Want Delete this client?"
          close={close}
          deleteFunc={deleteFn}
          loading={deleteMutation.isPending}
          opened={opened}
        />
      )}
    </>
  )
}
