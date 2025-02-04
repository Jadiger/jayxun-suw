import { http } from '@/shared/config/http'
import {
  INewClientOrderBody,
  IOrder,
  rejectBody,
  CreateNewOrderBody,
} from '../types/orders'
import { ListParams } from '@/shared/types/list-params'
import { ResponseWithPagination } from '@/shared/types/http'
import { Product } from '@/types/products'

export const ordersApi = {
  getAllNewOrders: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<IOrder[]>>(
      'order/get-all-new-orders',
      {
        params,
      }
    )
    return data
  },
  getAllOldOrders: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<IOrder[]>>(
      'order/get-all-old-orders',
      {
        params,
      }
    )
    return data
  },
  getOne: async (id: number) => {
    const { data } = await http<IOrder>(`/order/${id}`)
    return data
  },

  createNewClientOrder: async (body: INewClientOrderBody) => {
    const { data } = await http.post(
      'order/create-new-order-for-new-client-with-products',
      body
    )
    return data
  },

  createNewOrder: async (body: CreateNewOrderBody) => {
    const { data } = await http.post('order/create-new-order', body)
    return data
  },

  getProductsList: async () => {
    const { data } = await http<Product[]>(
      'product/get-all-products-without-pagination'
    )
    return data
  },

  doneOrder: async (id: number) => {
    const { data } = await http.put(`order/done/${id}`)
    return data
  },
  rejectOrder: async ({ id, body }: { id: number; body: rejectBody }) => {
    const { data } = await http.put(`order/reject/${id}`, body)
    return data
  },
}
