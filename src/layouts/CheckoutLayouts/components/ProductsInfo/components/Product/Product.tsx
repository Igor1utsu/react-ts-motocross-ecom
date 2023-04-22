import styles from "./Product.module.scss"
import clsx from "clsx"
import { FC, memo, useContext, useMemo } from "react"
import { getProduct } from "../../../../../../shared/utils/GetProduct.utils"
import { PATH_TO_PICTURE } from "../../../../../../shared/constants/Path.constants"
import { Button } from "antd"
import { CartContext } from "../../../../../../context/CartContext"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"

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
    <li className={clsx(styles["Product"], "wrapper-row")}>
      <div className={styles["Product__img-wrapper"]}>
        <img src={PATH_TO_PICTURE.PARTS + product?.image} alt={product?.name} />
      </div>
      <div className={clsx(styles["Product__content"], "wrapper-colum")}>
        <h3 className={styles["Product__title"]}>{product?.name}</h3>
        <p className={styles["Product__description"]}>{product?.partNumber}</p>
        <span className={styles["Product__price"]}>{productPrice}</span>
      </div>
      <div className={clsx(styles["Product__application"], "wrapper-colum")}>
        <div className={clsx(styles["Product__counter"], "wrapper-row")}>
          <Button
            disabled={qty === 1}
            onClick={() => deCrement(qty)}
            style={{
              padding: 0,
              borderLeft: 0,
              borderBottom: 0,
              borderTop: 0,
            }}
          >
            <MinusOutlined />
          </Button>
          <span>{qty}</span>
          <Button
            onClick={() => inCrement(qty)}
            style={{
              padding: 0,
              borderRight: 0,
              borderBottom: 0,
              borderTop: 0,
            }}
          >
            <PlusOutlined />
          </Button>
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
