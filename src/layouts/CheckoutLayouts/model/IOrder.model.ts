import { IProductOrder } from "./IProductOrder.model"
import { IUserContact } from "./IUserContact.model"

export interface IOrder {
  date: () => number
  products: IProductOrder[]
  user: IUserContact
  shopId: number
}
