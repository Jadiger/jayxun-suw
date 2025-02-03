import { http } from '@/shared/config/http'
import { ResponseWithPagination } from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { IClient, IClientBody } from '../types/clients'

export const clientApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<IClient[]>>(
      'client/get-all-search-client',
      {
        params,
      }
    )
    return data
  },
  getOne: async (id: number) => {
    const { data } = await http<IClient>(`client/get-by-id-with-orders/${id}`)
    return data
  },
  create: async (body: IClientBody) => {
    const { data } = await http.post('client', body)
    return data
  },
  update: async ({ id, body }: { id: number; body: IClientBody }) => {
    const { data } = await http.put(`/client/${id}`, body)
    return data
  },
  delete: async (id: number) => {
    const { data } = await http.delete(`/client/${id}`)
    return data
  },
}
