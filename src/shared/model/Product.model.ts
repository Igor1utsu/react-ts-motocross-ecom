import { IdForReq } from "./IdForReq.model"

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
export type PartData = {
  id: IdForReq
  name: string
  brand: string
  category: string
  partNumber: string
  price: number
  image: string
  fits: BikeData[]
}

export type ProductFromCart = PartData & { qty: number }

export type ProductFromStorage = {
  id: IdForReq
  qty: number
}
