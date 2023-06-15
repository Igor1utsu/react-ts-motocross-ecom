import { IdForReq } from "./IdForReq.model"
import { ProductCategories } from "./ProductСategories.model"

/**
 * Модель мотоцикла, к которой подходит запчасть
 */
type BikeData = {
  make: string
  model: string
  year: number[]
}

/**
 * Запчасть для мотоцикла
 */
export type ProductData = {
  id: IdForReq
  name: string
  brand: string
  category: ProductCategories
  partNumber: string
  price: number
  image: string
  fits: BikeData[]
}

export type ProductFromCart = ProductData & { qty: number }

export type ProductFromStorage = {
  id: IdForReq
  qty: number
}
