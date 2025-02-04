export interface ICourier {
  id: number
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  carName: string
  carNumber: string
  username: string
  phoneNumber: string
  isActive : boolean 
  roles: IRoles[]
}
interface IRoles {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  name: string
}
export interface ICourierBody {
  username: string
  password?: string
  firstName: string
  lastName: string
  carName: string
  phoneNumber: string
  carNumber: string
}