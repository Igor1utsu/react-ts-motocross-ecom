import { IdForReq } from "../../../shared/model/IdForReq.model"
import { ProductFromStorage } from "../../../shared/model/Product.model"
import { User } from "./User.model"

export type Order = {
  date: () => number
  products: ProductFromStorage[]
  user: User
  shopId: IdForReq
}
