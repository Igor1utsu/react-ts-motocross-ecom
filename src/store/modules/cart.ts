import { makeAutoObservable, runInAction, autorun } from "mobx"
import { storage } from "../../shared/utils"
import { STORAGE_CART } from "../../shared/constants"
import { API } from "../../shared/http/api"
import { IdForReq } from "../../shared/model/IdForReq.model"
import { ProductFromCart, ProductFromStorage } from "../../shared/model"

class CartStore {
  list: ProductFromCart[] = []

  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      // При загрузке сайта, автоматически считываем localStorage и отправляем запрос для получения данных
      const dataStorage = storage.get<ProductFromStorage[]>(STORAGE_CART) ?? []

      Promise.all(
        dataStorage.map((prod) => {
          return API.loadProduct(prod.id)
        })
      ).then((data) => {
        const products = data.map((prod, idx) => ({
          ...prod,
          qty: dataStorage[idx].qty,
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

      storage.set<ProductFromStorage[]>(STORAGE_CART, update)
    })
  }

  updateCart = (list: any[]) => {
    this.list = list
  }

  loadProduct = async (id: IdForReq, qty: number = 1) => {
    try {
      const result = await API.loadProduct(id)
      const data = { ...result, qty: qty }
      runInAction(() => {
        this.list.push(data)
      })
    } catch (e: any) {
      throw e
    }
  }

  get total() {
    return this.list.reduce(
      (acc, p) =>
        (acc = {
          items: (acc.items += p.qty),
          price: (acc.price += p.price * p.qty),
        }),
      { items: 0, price: 0 }
    )
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

  inCrement = (productID: IdForReq) => {
    const index = this.list.findIndex((p) => p.id === productID)
    this.list[index].qty = ++this.list[index].qty
  }

  deCrement = (productID: IdForReq) => {
    const index = this.list.findIndex((p) => p.id === productID)
    this.list[index].qty = --this.list[index].qty
  }
}

export const cart = new CartStore()
