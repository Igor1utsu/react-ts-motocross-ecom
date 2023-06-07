import styles from "./Product.module.scss"
import clsx from "clsx"
import { CloseOutlined } from "@ant-design/icons"
import { FC } from "react"
import { useStore } from "../../../../../../store/context"
import { observer } from "mobx-react-lite"
import { PATH_TO_PICTURE } from "../../../../../../shared/constants/Path.constants"
import { Button } from "../../../../../../shared/components"
import { ProductFromCart } from "../../../../../../shared/model/Product.model"
import { getPrice } from "../../../../../../shared/utils"

interface IProductProps {
  product: ProductFromCart
}

export const Product: FC<IProductProps> = observer((props) => {
  const { product } = props

  const { cart } = useStore()
  const { removeFromCart } = cart

  return (
    <li className={clsx(styles["Product"], "flex-row")}>
      <div className={styles["Product__img-wrapper"]}>
        <img src={PATH_TO_PICTURE.PARTS + product.image} alt={product.name} />
      </div>
      <div className={clsx(styles["Product__content"], "flex-col")}>
        <h3 className={styles["Product__title"]}>{product.name}</h3>
        <p className={styles["Product__description"]}>{product.partNumber}</p>
        <span>{getPrice(product.price, product.qty)}</span>
      </div>

      <Button
        size="small"
        icon={<CloseOutlined />}
        onClick={() => product && removeFromCart(product.id)}
        className={styles.Product__remove}
      ></Button>
    </li>
  )
})
