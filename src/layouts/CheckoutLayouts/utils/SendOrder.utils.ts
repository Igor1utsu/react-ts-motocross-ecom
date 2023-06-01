import { API } from "../../../shared/http/api"
import {
  showErrorModal,
  showSuccessModal,
} from "../../../shared/utils/Modal.utils"
import { Order } from "../model/Order.model"

export const sendOrder = async (order: Order) => {
  try {
    const response = await API.createOrder(order)
    showSuccessModal("Order successfully completed")
    return response
  } catch (e: any) {
    console.error("Ошибка оформления заказа:", e)
    showErrorModal(e)
    throw e
  }
}
