import PICKUP_POINT from "../data/PICKUP-POINT.json"
import PARTS from "../data/PARTS.json"
import { IProduct } from "../shared/model/IProduct"

export const storeTitle = (storeID: number) => {
  return PICKUP_POINT.find((data) => data.id === storeID)?.title
}

export const storeCoordinates = (storeID: number) => {
  return PICKUP_POINT.find((data) => data.id === storeID)?.coordinates
}

export const calculateTotalProducts = (shoppingCart: IProduct[]) => {
  let total = 0
  let items = 0

  shoppingCart.forEach((product: IProduct) => {
    // на каждую итерацию ищем продукт в базе данных и приплюсоваем (price x qty) к total
    let currentProduct = PARTS.find((data) => data.id === product.id)
    
    total = currentProduct
    ? total + currentProduct.price * product.qty
    : total
    
    // также высчитываем суммарное колличество товара
    items = currentProduct ? items + product.qty : items
  })

  return {total, items}
}
