export interface IOrder {
  id: number
  createdAt: string
  updatedAt: string
  price: number
  status: string
  description: string
  client: IOrderClient
  products: IOrderProduct[]
  courier: IOrderCourier
}

interface IOrderClient {
  id: number
  createdAt: string
  updatedAt: string
  fullName: string
  phoneNumber: string
  streetName: string
  landmark: string
  latitude: string
  longitude: string
}

export interface IOrderProduct {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  price: string
  image: string
}

export interface IOrderProductWithCount extends IOrderProduct {
  count : number
}

interface IOrderCourier {
  id: 0
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  carName: string
  carNumber: string
  username: string
  phoneNumber: string
  roles: IRole[]
}
interface IRole {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  name: string
}

export interface INewClientOrderBody {
  fullName: string
  phoneNumber: string
  streetName: string
  landmark: string
  latitude: string
  longitude: string
  courierId: string | null
  productIds: number[]
}
export interface INewClientOrderTransBody {
  fullName: string
  phoneNumber: string
  streetName: string
  landmark: string
  latitude: string
  longitude: string
  courierId: string | null
  productIds: [
    {
      productId: string | null
      count: number
      price: number
    }
  ]
}

export interface CreateNewOrderBody {
  clientId: string | null
  courierId: string | null
  productIds: number[]
}

export interface CreateNewOrderTransBody {
  clientId: string | null
  courierId: string | null
  productIds: {
    productId: string | null
    count: number
    price: number
  }[]
}

export interface rejectBody {
  description : string
}