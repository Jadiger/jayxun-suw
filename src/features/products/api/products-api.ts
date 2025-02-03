import { http } from '@/shared/config/http'
import { ResponseWithPagination } from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { Product, ProductBody } from '../types/products'

export const productsApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Product[]>>('product', {
      params,
    })

    return data
  },

  getOne: async (id: number) => {
    const { data } = await http<Product>(`product/${id}`)

    return data
  },

  create: async (body: ProductBody) => {
    const { data } = await http.post('product', body)

    return data
  },

  update: async ({ id, body }: { id: number; body: ProductBody }) => {
    const { data } = await http.put(`product/${id}`, body)

    return data
  },

  delete: async (id: number) => {
    const { data } = await http.delete(`product/${id}`)

    return data
  },
}
