import { IProduct } from "./IProduct"

export interface ICartContext {
  shoppingCart: IProduct[]
  setShoppingCart: (data: IProduct[]) => void
  addToCart: (productNum: string) => void
  removeFromCart: (productNum: string) => void
  total: number
}
