import styles from "./Product.module.scss"
import clsx from "clsx"
import { FC, memo, useContext, useMemo } from "react"
import { getProduct } from "../../../../../../shared/utils/GetProduct.utils"
import { PATH_TO_PICTURE } from "../../../../../../shared/constants/Path.constants"
import { CartContext } from "../../../../../../context/CartContext"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Button } from "../../../../../../shared/components"

interface IProductProps {
  id: number
  qty: number
}

export const Product: FC<IProductProps> = memo((props) => {
  const { id, qty } = props

  const { removeFromCart, setQTY } = useContext(CartContext)

  const product = useMemo(() => getProduct(id), [id])
  const productPrice = `${qty} x $${product?.price}`
  const inCrement = (value: number) => product && setQTY(product.id, ++value)
  const deCrement = (value: number) => product && setQTY(product.id, --value)

  return (
    <li className={clsx(styles["Product"], "flex-row")}>
      <div className={styles["Product__img-wrapper"]}>
        <img src={PATH_TO_PICTURE.PARTS + product?.image} alt={product?.name} />
      </div>
      <div className={clsx(styles["Product__content"], "flex-col")}>
        <h3 className={styles["Product__title"]}>{product?.name}</h3>
        <p className={styles["Product__description"]}>{product?.partNumber}</p>
        <span className={styles["Product__price"]}>{productPrice}</span>
      </div>
      <div className={clsx(styles["Product__application"], "flex-col")}>
        <div className={clsx(styles["Product__counter"], "flex-row")}>
          <Button
            disabled={qty === 1}
            onClick={() => deCrement(qty)}
            className={styles.counter__button}
            icon={<MinusOutlined />}
          ></Button>
          <span className={styles.counter__value}>{qty}</span>
          <Button
            onClick={() => inCrement(qty)}
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
