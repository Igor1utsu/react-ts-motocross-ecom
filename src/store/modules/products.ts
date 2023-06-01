import { makeAutoObservable, runInAction } from "mobx"
import { API } from "../../shared/http/api"
import { showErrorModal } from "../../shared/utils/Modal.utils"

class ProductsStore {
  list = []

  constructor() {
    makeAutoObservable(this)
  }

  async load() {
    try {
      const data = await API.loadProducts()
      runInAction(() => {
        this.list = data
      })
    } catch (e: any) {
      console.error("Ошибка загрузки товаров:", e)
      showErrorModal(e)
      throw e
    }
  }
}

export const products = new ProductsStore()
