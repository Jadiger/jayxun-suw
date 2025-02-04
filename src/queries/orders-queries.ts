import { HTTPError, ResponseWithPagination } from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  CreateNewOrderBody,
  INewClientOrderBody,
  IOrder,
  rejectBody,
} from '../types/orders'
import { ordersApi } from '../api/orders-api'
import { notifications } from '@mantine/notifications'
import { Product } from '@/types/products'

export const useFetchNewOrders = (params: ListParams) => {
  return useQuery<ResponseWithPagination<IOrder[]>, HTTPError>({
    queryKey: ['newOrders', params],
    queryFn: () => ordersApi.getAllNewOrders(params),
    staleTime: 30_000,
  })
}
export const useFetchOldOrders = (params: ListParams) => {
  return useQuery<ResponseWithPagination<IOrder[]>, HTTPError>({
    queryKey: ['oldOlders', params],
    queryFn: () => ordersApi.getAllOldOrders(params),
    staleTime: 30_000,
  })
}
export const useFetchOrder = (id: number) => {
  return useQuery<IOrder, HTTPError>({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getOne(id),
  })
}

export const useCreateNewClientOrder = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, INewClientOrderBody>({
    mutationFn: ordersApi.createNewClientOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newOrders'] })

      notifications.show({
        title: 'succes',
        message: 'Added new order',
        color: 'green',
      })
    },
  })
}

export const useCreateNewOrder = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, CreateNewOrderBody>({
    mutationFn: ordersApi.createNewOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newOrders'] })

      notifications.show({
        title: 'succes',
        message: 'Added new order',
        color: 'green',
      })
    },
  })
}

export const useFetchProductsList = () => {
  return useQuery<Product[], HTTPError>({
    queryKey: ['productsList'],
    queryFn: () => ordersApi.getProductsList(),
  })
}

export const useDoneOrders = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, number>({
    mutationFn: ordersApi.doneOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newOrders'] })
      queryClient.invalidateQueries({ queryKey: ['oldOrders'] })
      notifications.show({
        title: 'Succes',
        message: 'Order Status : Done!',
        color: 'green',
      })
    },
  })
}

export const useRejectOrders = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, HTTPError, { id: number; body: rejectBody }>({
    mutationFn: ordersApi.rejectOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newOrders'] })
      queryClient.invalidateQueries({ queryKey: ['oldOrders'] })
      notifications.show({
        title: 'Succes',
        message: 'Orders Status : Rejected',
        color: 'green',
      })
    },
  })
}
