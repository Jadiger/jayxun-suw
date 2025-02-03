import { IOrder } from '@/features/orders/types/orders'

export interface IClient {
  id: number
  createdAt: string
  updatedAt: string
  fullName: string
  phoneNumber: string
  streetName: string
  landmark: string
  latitude: string
  longitude: string
  orders: IOrder[]
}

export interface IClientBody {
  fullName: string
  phoneNumber: string
  streetName: string
  landmark: string
  latitude: string
  longitude: string
}

export interface IClientAddress {
  house_number?: string | undefined
  road: string | undefined
  residential: string | undefined
}
export interface IClientCoordinate {
  lat: number
  lng: number
}
