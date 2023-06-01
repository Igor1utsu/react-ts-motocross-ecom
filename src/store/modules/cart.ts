import { makeAutoObservable, runInAction, autorun } from "mobx"
import { API } from "../../shared/http/api"
import { IdForReq } from "../../shared/model/IdForReq.model"
import {
  ProductFromCart,
  ProductFromStorage,
  PartData,
} from "../../shared/model/Product.model"

class CartStore {
  list: ProductFromCart[] = []

  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      // При загрузке сайта, автоматически считываем localStorage и отправляем запрос для получения данных
      const storage = JSON.parse(localStorage.getItem("cart") ?? "[]")

      Promise.all(
        storage.map((prod: ProductFromStorage) => {
          return API.loadProduct(prod.id)
        })
      ).then((data) => {
        const products = data.map((prod, idx) => ({
          ...prod,
          qty: storage[idx].qty,
        }))

        this.updateCart(products)
      })
    })
    autorun(() => {
      // Автоматически обновляет localStorage при изменение store
      const update = this.list.map((product) => ({
        id: product.id,
        qty: product.qty,
      }))

      localStorage.setItem("cart", JSON.stringify(update))
    })
  }

  updateCart = (list: any[]) => {
    this.list = list
  }

  loadProduct = async (id: IdForReq, qty: number = 1) => {
    try {
      const result: PartData = await API.loadProduct(id)
      const data = { ...result, qty: qty }
      runInAction(() => {
        this.list.push(data)
      })
    } catch (e: any) {
      throw e
    }
  }

  get total() {
    return this.list.reduce((acc, p) => (acc += p.price * p.qty), 0)
  }

  get items() {
    return this.list.reduce((acc, p) => (acc += p.qty), 0)
  }

  addToCart = (productID: IdForReq, value: number) => {
    const product = this.list.find((p) => p.id === productID)
    product ? (product.qty += value) : this.loadProduct(productID, value)
  }

  removeFromCart = (productID: IdForReq) => {
    this.list = this.list.filter((p) => p.id !== productID)
  }

  clearCart = () => {
    this.list = []
  }

  inCrement = (productID: IdForReq, value: number) => {
    const index = this.list.findIndex((p) => p.id === productID)
    this.list[index].qty = ++value
  }

  deCrement = (productID: IdForReq, value: number) => {
    const index = this.list.findIndex((p) => p.id === productID)
    this.list[index].qty = --value
  }
}

export const cart = new CartStore()
