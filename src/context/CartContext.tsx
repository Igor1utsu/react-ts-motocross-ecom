import React, { useEffect, useState } from "react"
import { createContext } from "react"
import { ICartContext } from "./model/ICartContext.model"
import { IProduct } from "../shared/model/IProduct"
import { calculateTotalProducts } from "../shared/utils/CalculateTotalProduct.utils"

export const CartContext = createContext<ICartContext>({
  shoppingCart: [],
  setShoppingCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  setQTY: () => {},
  total: 0,
  items: 0,
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
    const { total, items } = calculateTotalProducts(shoppingCart)
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

  const clearCart = () => {
    setShoppingCart([])
    localStorage.removeItem("shoppingCart")
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
        clearCart,
        setQTY,
        total,
        items,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
