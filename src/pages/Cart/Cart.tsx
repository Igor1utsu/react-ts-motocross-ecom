import { Button } from "antd"
import { useContext } from "react"
import { CartItem } from "../../components/CartItem/CartItem"
import { Logo } from "../../components/Logo/Logo"
import { CartContext } from "../../context/CartContext"
import "./Cart.scss"

export const Cart = () => {
  const { shoppingCart, total, items } = useContext(CartContext)

  return (
    <div className="cart-container">
      <div className="cart">
        <header className="cart__header">
          <Logo />
        </header>
        <main className="cart__main">
          <ul className="cart__list">
            {shoppingCart.length === 0 && (
              <li className="cart__message">
                There are no items in your cart.
              </li>
            )}
            {shoppingCart.map((product, index) => {
              return <CartItem id={product.id} qty={product.qty} key={index} />
            })}
          </ul>
          <div className="cart__order order">
            <h2 className="order__title">Total price</h2>
            <div className="order__content total">
              <span>{"Items ( " + items + " )"}</span>
              <span className="total__price">{total + " $"}</span>
            </div>
            <Button type="ghost" className="btn--gree btn--large">
              Buy
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
