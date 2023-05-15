import styles from "./ProductsInfo.module.scss"
import clsx from "clsx"
import { FC, memo, useContext } from "react"
import { CartContext } from "../../../../context/CartContext"
import { Product } from "./components/Product/Product"

export const ProductsInfo: FC = memo(() => {
  const { shoppingCart, total } = useContext(CartContext)

  const totalPrice = `$ ${total.toFixed(2)}`

  return (
    <section className={clsx(styles["ProductsInfo"], "flex-col")}>
      <h3 className={styles["ProductsInfo__title"]}>Products:</h3>
      <ul className={styles["ProductsInfo__list"]}>
        {!shoppingCart.length && <li>There are no items in your cart.</li>}
        {shoppingCart?.map((product) => {
          return <Product id={product.id} qty={product.qty} key={product.id} />
        })}
      </ul>
      <div className={clsx(styles["ProductsInfo__footer"], "flex-row")}>
        <span>Total:</span>
        <span>{totalPrice}</span>
      </div>
    </section>
  )
})
