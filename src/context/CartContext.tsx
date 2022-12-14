import React, { useEffect, useState } from "react"
import { createContext } from "react"
import { ICartContext } from "./model/ICartContext.model"
import { IProduct } from "../context/model/IProduct"
import PARTS from "../data/PARTS.json"

export const CartContext = createContext<ICartContext>({
  shoppingCart: [],
  setShoppingCart: () => {},
  addToCart: (data) => {},
  removeFromCart: (data) => {},
  setQTY: (value) => {},
  total: 0,
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

  useEffect(() => {
    let total = 0

    shoppingCart.forEach((product: IProduct) => {
      // на каждую итерацию ищем продукт в базе данных и приплюсоваем (price x qty) к total
      let currentProduct = PARTS.find(
        (part) => part.partNumber === product.productNumber
      )

      total = currentProduct
        ? total + currentProduct.price * product.qty
        : total
    })

    setTotal(total)
  }, [shoppingCart])

  const addToCart = (productNum: string) => {
    const cloneShoppingCart = [...getCartStorage]
    const updateCart = cloneShoppingCart.find(
      (DATA) => DATA.productNumber === productNum
    )
      ? cloneShoppingCart.map((product) => {
          if (product.productNumber === productNum)
            return { ...product, qty: product.qty + 1 }
          else return product
        })
      : [...cloneShoppingCart, { productNumber: productNum, qty: 1 }]
    setShoppingCart(updateCart)
    localStorage.setItem("shoppingCart", JSON.stringify(updateCart))
  }

  const removeFromCart = (productNum: string) => {
    const cloneShoppingCart = [...getCartStorage]
    const updateCart = cloneShoppingCart.filter(
      (product) => product.productNumber !== productNum
    )
    localStorage.setItem("shoppingCart", JSON.stringify(updateCart))
    setShoppingCart(updateCart)
  }

  const setQTY = (value: number, productNum: string) => {
    const cloneShoppingCart = [...getCartStorage]

    const updateCart = cloneShoppingCart.map((product) => {
      if (product.productNumber === productNum)
        return { ...product, qty: value }
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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
