import { PageHead } from '@/shared/ui/page-head/page-head'
import { ActionIcon, Center, Loader } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Trash2 } from 'react-feather'

import { DriverForm } from '../drivers-form/drivers-form'

import {
  useDeleteCourier,
  useFetchCourier,
  useUpdateCourier,
} from '../../queries/courierQueries'
import { ICourierBody } from '../../types'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteModal } from '@/shared/ui/delete-modal'

export const DriversEdit = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useFetchCourier(Number(id))

  const initialValues: ICourierBody = {
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    carName: data?.carName || '',
    carNumber: data?.carNumber || '',
    phoneNumber: data?.phoneNumber.slice(3, 12) || '',
    username: data?.username || '',
    password: '',
  }

  const updateMutation = useUpdateCourier()

  const submitFn = async (data: ICourierBody) => {
    delete data.password
    try {
      await updateMutation
        .mutateAsync({ id: Number(id), body: data })
        .then(() => navigate('/drivers'))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMutation = useDeleteCourier()
  const deleteFn = async () => {
    try {
      await deleteMutation.mutateAsync(Number(id)).then(() => {
        navigate('/drivers')
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PageHead
        title="Изменить водителя"
        render={
          <ActionIcon variant="transparent">
            <Trash2
              size={24}
              color="var(--mantine-color-gray-8)"
              onClick={open}
            />
          </ActionIcon>
        }
      />
      {isLoading && (
        <Center mt={30}>
          <Loader />
        </Center>
      )}
      {isLoading || (
        <DriverForm
          submitFn={submitFn}
          loading={updateMutation.isPending}
          initialValues={initialValues}
          isLoading={isLoading}
          title="Изменить водитель"
          isEdit={true}
        />
      )}
      {opened && (
        <DeleteModal
          loading={deleteMutation.isPending}
          opened={opened}
          deleteFunc={deleteFn}
          close={close}
          message="Do you want delete this courier?"
          title="Удалить курьер"
        />
      )}
    </>
  )
}
