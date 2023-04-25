import axios from "axios"
import { IOrder } from "../../layouts/CheckoutLayouts/model/IOrder.model"
import { ORDERS_URL } from "../constants/Url.constants"

export const API = {
  createOrder: async (order: IOrder) => {
    return axios.post(ORDERS_URL, order)
  },
}
