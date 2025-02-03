export interface Product {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  price: string
  image: string
}

export interface ProductBody {
  price: number | undefined
  name: string
  image: string
}
