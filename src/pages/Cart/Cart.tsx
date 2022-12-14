import { Button } from "antd"
import { useContext } from "react"
import { CartItem } from "../../components/CartItem/CartItem"
import { CartContext } from "../../context/CartContext"
import "./Cart.scss"

export const Cart = () => {
  const { shoppingCart, total } = useContext(CartContext)

  return (
    <div className="container">
      <div className="cart">
        <div className="cart-list">
          {shoppingCart.map((product, index) => {
            return (
              <CartItem
                productNumber={product.productNumber}
                qty={product.qty}
                key={index}
              />
            )
          })}
        </div>
        <div className="cart-order">
          <h2 className="cart-order__title">Total price</h2>
          <div className="cart-order__content total">
            <span>Total:</span>
            <span className="total__price">{total +  " $"}</span>
          </div>
          <Button className="btn-cart btn-cart--large" type="primary">
            Buy
          </Button>
        </div>
      </div>
    </div>
  )
}
