import React, { useState } from "react"
import { createContext } from "react"
import { ICartContext } from "./model/ICartContext.model"

export const CartContext = createContext<ICartContext>({
  shoppingCart: [],
  setShoppingCart: () => {},
  addToCart: (data) => {},
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

  return (
    <CartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
