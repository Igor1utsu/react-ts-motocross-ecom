import styles from "./Product.module.scss"
import clsx from "clsx"
import { FC } from "react"
import { useStore } from "../../../../../../store/context"
import { observer } from "mobx-react-lite"
import { PATH_TO_PICTURE } from "../../../../../../shared/constants/Path.constants"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Button } from "../../../../../../shared/components"
import { ProductFromCart } from "../../../../../../shared/model/Product.model"
import { getPrice } from "../../../../../../shared/utils"

interface IProductProps {
  product: ProductFromCart
}

export const Product: FC<IProductProps> = observer((props) => {
  const { product } = props

  const { cart } = useStore()
  const { removeFromCart, inCrement, deCrement } = cart

  return (
    <li className={clsx(styles["Product"], "flex-row")}>
      <div className={styles["Product__img-wrapper"]}>
        <img src={PATH_TO_PICTURE.PARTS + product.image} alt={product.name} />
      </div>
      <div className={clsx(styles["Product__content"], "flex-col")}>
        <h3 className={styles["Product__title"]}>{product.name}</h3>
        <p className={styles["Product__description"]}>{product.partNumber}</p>
        <span className={styles["Product__price"]}>
          {getPrice(product.price, product.qty)}
        </span>
      </div>
      <div className={clsx(styles["Product__application"], "flex-col")}>
        <div className={clsx(styles["Product__counter"], "flex-row")}>
          <Button
            disabled={product.qty === 1}
            onClick={() => deCrement(product.id)}
            className={styles.counter__button}
            icon={<MinusOutlined />}
          ></Button>
          <span className={styles.counter__value}>{product.qty}</span>
          <Button
            onClick={() => inCrement(product.id)}
            className={styles.counter__button}
            icon={<PlusOutlined />}
          ></Button>
        </div>
        <Button
          onClick={() => product && removeFromCart(product.id)}
          type="link"
          style={{ padding: 0 }}
        >
          Remove item
        </Button>
      </div>
    </li>
  )
})
