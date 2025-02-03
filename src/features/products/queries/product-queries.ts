import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products-api'
import { ListParams } from '@/shared/types/list-params'
import { HTTPError, ResponseWithPagination } from '@/shared/types/http'
import { Product, ProductBody } from '../types/products'
import { notifications } from '@mantine/notifications'

export const useFethcProducts = (params: ListParams) => {
  return useQuery<ResponseWithPagination<Product[]>, HTTPError>({
    queryKey: ['products'],
    queryFn: () => productsApi.getAll(params),
    staleTime: 30_000,
  })
}

export const useFethcProduct = (id: number) => {
  return useQuery<Product, HTTPError>({
    queryKey: ['product', id],
    queryFn: () => productsApi.getOne(id),
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, HTTPError, ProductBody>({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })

      notifications.show({
        title: 'Succes',
        message: 'Product created',
        color: 'green',
      })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, HTTPError, { id: number; body: ProductBody }>({
    mutationFn: productsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })

      notifications.show({
        title: 'Succes',
        message: 'Product updated',
        color: 'green',
      })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, HTTPError, number>({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })

      notifications.show({
        title: 'Succes',
        message: 'Product deleted',
        color: 'green',
      })
    },
  })
}
