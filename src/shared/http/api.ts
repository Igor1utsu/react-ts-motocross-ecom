import axios from "axios"
import { Order } from "../../layouts/CheckoutLayouts/model/Order.model"
import { ORDERS_URL, PRODUCTS_URL } from "../constants/Url.constants"
import { IdForReq } from "../model/IdForReq.model"

export const API = {
  loadProducts: async () => {
    const response = await axios.get(PRODUCTS_URL)
    return response.data
  },

  loadProduct: async (productID: IdForReq) => {
    const response = await axios.get(`${PRODUCTS_URL}/${productID}`)
    return response.data
  },

  createOrder: async (order: Order) => {
    return axios.post(ORDERS_URL, order)
  },
}
