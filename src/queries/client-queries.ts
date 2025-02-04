import { HTTPError, ResponseWithPagination } from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { IClient, IClientBody } from '../types/clients'
import { clientApi } from '../api/clients-api'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'

import { notifications } from '@mantine/notifications'

export const useFethcClients = (params: ListParams) => {
  return useQuery<ResponseWithPagination<IClient[]>, HTTPError>({
    queryKey: ['clients', params],
    queryFn: () => clientApi.getAll(params),
    staleTime: 30_000,
  })
}

export const useFethcClient = (
  id: number,
  options: UseQueryOptions<IClient, HTTPError>
) => {
  return useQuery<IClient, HTTPError>({
    queryFn: () => clientApi.getOne(id),
    ...options,
  })
}

export const useCreateClients = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, IClientBody>({
    mutationFn: clientApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      notifications.show({
        title: 'Succes',
        message: 'Client created',
        color: 'green',
      })
    },
  })
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, { id: number; body: IClientBody }>({
    mutationFn: clientApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      notifications.show({
        title: 'Succes',
        message: 'Client Updated',
        color: 'green',
      })
    },
  })
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, number>({
    mutationFn: clientApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      notifications.show({
        title: 'succes',
        message: 'Client deleted',
        color: 'green',
      })
    },
  })
}
