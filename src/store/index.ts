import { createContext, useContext } from "react"
import { cart, products } from "./modules"

class Store {
  products = products
  cart = cart
}

export default Store
