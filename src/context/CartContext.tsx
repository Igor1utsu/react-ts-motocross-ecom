import React, { useEffect, useState } from "react"
import { createContext } from "react"
import { ICartContext } from "./model/ICartContext.model"
import { IProduct } from "../context/model/IProduct"
import PARTS from "../data/PARTS.json"

export const CartContext = createContext<ICartContext>({
  shoppingCart: [],
  setShoppingCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  setQTY: () => {},
  total: 0,
  items: 0
})

export const CartContextState = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const getCartStorage = JSON.parse(
    localStorage.getItem("shoppingCart") ?? "[]"
  )
  const [shoppingCart, setShoppingCart] = useState(getCartStorage)
  const [total, setTotal] = useState(0)
  const [items, setItems] = useState(0)

  useEffect(() => {
    let total = 0
    let items = 0

    shoppingCart.forEach((product: IProduct) => {
      // на каждую итерацию ищем продукт в базе данных и приплюсоваем (price x qty) к total
      let currentProduct = PARTS.find((data) => data.id === product.id)
      
      total = currentProduct
      ? total + currentProduct.price * product.qty
      : total
      
      // также высчитываем суммарное колличество товара
      items = currentProduct ? items + product.qty : items
    })
    
    setTotal(total)
    setItems(items)
  }, [shoppingCart])

  const addToCart = (productID: number, value: number) => {
    const cloneShoppingCart: IProduct[] = [...getCartStorage]
    const updateCart = cloneShoppingCart.find((data) => data.id === productID)
      ? cloneShoppingCart.map((product) => {
          if (product.id === productID)
            return { ...product, qty: product.qty + value }
          else return product
        })
      : [...cloneShoppingCart, { id: productID, qty: value }]
    setShoppingCart(updateCart)
    localStorage.setItem("shoppingCart", JSON.stringify(updateCart))
  }

  const removeFromCart = (productID: number) => {
    const cloneShoppingCart: IProduct[] = [...getCartStorage]
    const updateCart = cloneShoppingCart.filter(
      (product) => product.id !== productID
    )
    localStorage.setItem("shoppingCart", JSON.stringify(updateCart))
    setShoppingCart(updateCart)
  }

  const setQTY = (productID: number, value: number) => {
    const cloneShoppingCart: IProduct[] = [...getCartStorage]

    const updateCart = cloneShoppingCart.map((product) => {
      if (product.id === productID) return { ...product, qty: value }
      else return product
    })
    localStorage.setItem("shoppingCart", JSON.stringify(updateCart))
    setShoppingCart(updateCart)
  }

  return (
    <CartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        addToCart,
        removeFromCart,
        setQTY,
        total,
        items,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
