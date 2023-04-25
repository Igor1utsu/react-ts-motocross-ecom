import { API } from "../../../shared/http/api"
import { IOrder } from "../model/IOrder.model"

export const sendOrder = async (order: IOrder) => {
  try {
    const data = await API.createOrder(order)
    console.log("Заказ успешно оформлен:", data)
  } catch (error) {
    console.error("Ошибка оформления заказа:", error)
  }
}
