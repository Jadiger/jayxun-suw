import { http } from '@/shared/config/http'

import { ICourier, ICourierBody } from '../types'

export const couriersApi = {
  getAll: async () => {
    const { data } = await http<ICourier[]>('courier')
    return data
  },
  getOne: async (id: number) => {
    const { data } = await http<ICourier>(`courier/get-by-id/${id}`)
    return data
  },
  create: async (body: ICourierBody) => {
    const { data } = await http.post('courier/create-new-courier', body)
    return data
  },

  update: async ({ id, body }: { id: number; body: ICourierBody }) => {
    const { data } = await http.put(`courier/update-courier-by-id/${id}`, body)
    return data
  },
  delete: async (id: number) => {
    const { data } = await http.delete('courier/delete-courier-by-id', {
      params: { id: id },
    })
    return data
  },
  isActive: async (id: number) => {
    const { data } = await http.patch('courier/is-active', null, {
      params: { courierId: id },
    })
    return data
  },
}
