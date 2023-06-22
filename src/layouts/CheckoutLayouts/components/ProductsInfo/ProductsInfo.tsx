import styles from "./ProductsInfo.module.scss"
import clsx from "clsx"
import { FC } from "react"
import { useStore } from "../../../../store/context"
import { observer } from "mobx-react-lite"
import { Product } from "./components/Product/Product"
import { getPrice } from "../../../../shared/utils"

export const ProductsInfo: FC = observer(() => {
  const { cart } = useStore()
  const { list, total } = cart

  return (
    <section className={clsx(styles["ProductsInfo"], "flex-col")}>
      <h3 className={styles["ProductsInfo__title"]}>Products:</h3>
      <ul className={styles["ProductsInfo__list"]}>
        {!list.length && <li>There are no items in your cart.</li>}
        {list?.map((product) => {
          return <Product product={product} key={product.id} />
        })}
      </ul>
      <div className={clsx(styles["ProductsInfo__footer"], "flex-row")}>
        <span>Total:</span>
        <span>{getPrice(total.price)}</span>
      </div>
    </section>
  )
})
