import { IProduct } from "../../shared/model/IProduct"

export interface ICartContext {
  shoppingCart: IProduct[]
  setShoppingCart: (data: IProduct[]) => void
  addToCart: (id: number, value: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  setQTY: (id: number, value: number) => void
  total: number
  items: number
}
