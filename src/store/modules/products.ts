import { makeAutoObservable, runInAction } from "mobx"
import { API } from "../../shared/http/api"
import { ProductCategories, ProductData, StatusOfReq } from "../../shared/model"

class ProductsStore {
  status: StatusOfReq = "init"
  map = new Map<ProductCategories, ProductData[]>()

  constructor() {
    makeAutoObservable(this)
  }

  load = async () => {
    if (this.status === "success") {
      return
    } else {
      try {
        this.status = "loading"
        this.map.clear()
        const data = await API.loadProducts()
        runInAction(() => {
          data.forEach((prod) => {
            this.map.set(prod.category, [
              ...(this.map.get(prod.category) ?? []),
              prod,
            ])
          })
          this.status = "success"
        })
      } catch (e: any) {
        this.status = "error"
        console.error("Ошибка загрузки товаров:", e)
        throw e
      }
    }
  }
}

export const products = new ProductsStore()
