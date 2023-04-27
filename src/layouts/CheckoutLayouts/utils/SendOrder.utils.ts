import { API } from "../../../shared/http/api"
import {
  showErrorModal,
  showSuccessModal,
} from "../../../shared/utils/Modal.utils"
import { IOrder } from "../model/IOrder.model"

export const sendOrder = async (order: IOrder) => {
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
