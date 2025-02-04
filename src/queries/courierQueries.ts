import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ICourier, ICourierBody } from '../types/drivers'
import { couriersApi } from '../api/couriersApi'
import { HTTPError } from '@/shared/types/http'
import { notifications } from '@mantine/notifications'

export const useFetchCouriers = () => {
  return useQuery<ICourier[], HTTPError>({
    queryKey: ['couriers'],
    queryFn: couriersApi.getAll,
    staleTime: 30_000,
  })
}
export const useFetchCourier = (id: number) => {
  return useQuery<ICourier, HTTPError>({
    queryKey: ['courier', id],
    queryFn: () => couriersApi.getOne(id),
  })
}
export const useCreateCourier = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, ICourierBody>({
    mutationFn: couriersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['couriers'] })
      notifications.show({
        title: 'succes',
        message: 'Created New Courier',
        color: 'green',
      })
    },
  })
}
export const useUpdateCourier = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, { id: number; body: ICourierBody }>({
    mutationFn: couriersApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['couriers'] })
      notifications.show({
        title: 'Succes',
        message: 'Courier Updated',
        color: 'green',
      })
    },
  })
}
export const useDeleteCourier = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, number>({
    mutationFn: couriersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['couriers'] })
      notifications.show({
        title: 'Succes',
        message: 'Courier deleted',
        color: 'green',
      })
    },
  })
}
export const useActiveCourier = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, number>({
    mutationFn: couriersApi.isActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['couriers'] })
      notifications.show({
        title: 'Succes',
        message: 'Courier status edited',
        color: 'green',
      })
    },
  })
}
