import { IProduct } from "./IProduct"

export interface ICartContext {
  shoppingCart: IProduct[]
  setShoppingCart: (data: IProduct[]) => void
  addToCart: (id: number, value: number) => void
  removeFromCart: (id: number) => void
  setQTY: (id: number, value: number) => void
  total: number
}
