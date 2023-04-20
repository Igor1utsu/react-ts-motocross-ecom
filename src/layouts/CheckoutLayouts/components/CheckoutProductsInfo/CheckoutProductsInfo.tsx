import styles from "./CheckoutProductsInfo.module.scss"
import { FC, memo, useContext } from "react"
import { CartContext } from "../../../../context/CartContext"
import { Product } from "./components/Product/Product"

export const CheckoutProductsInfo: FC = memo(() => {
  const { shoppingCart, total } = useContext(CartContext)

  const orderTotal = total.toFixed(2) + " $"

  return (
    <div className={styles["CheckoutProductsInfo"]}>
      <h3 className={styles["CheckoutProductsInfo__title"]}>Products:</h3>
      <ul className={styles["CheckoutProductsInfo__list"]}>
        {shoppingCart.map((product) => {
          return <Product id={product.id} qty={product.qty} key={product.id} />
        })}
      </ul>
      <div className={styles["CheckoutProductsInfo__order"]}>
        <div className="wrapper-row">
          <span>Total:</span>
          <span>{orderTotal}</span>
        </div>
      </div>
    </div>
  )
})
