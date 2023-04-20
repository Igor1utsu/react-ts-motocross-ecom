import styles from "./Product.module.scss"
import { FC, memo, useMemo } from "react"
import { getProduct } from "../../../../../../shared/utils/GetProduct.utils"
import { PATH_TO_PICTURE } from "../../../../../../shared/constants/Path.constants"
import clsx from "clsx"

interface IProductProps {
  id: number
  qty: number
}

export const Product: FC<IProductProps> = memo((props) => {
  const { id, qty } = props

  const product = useMemo(() => getProduct(id), [id])
  const productPrice = qty + " x " + product?.price + " $"
  const productPartNumber = "# " + product?.partNumber

  return (
    <li className={clsx(styles["Product"], "wrapper-row")}>
      <div className={styles["Product__img-wrapper"]}>
        <img src={PATH_TO_PICTURE.PARTS + product?.image} alt={product?.name} />
      </div>
      <div className={clsx(styles["Product__content"], "wrapper-colum")}>
        <h3 className={styles["Product__title"]}>{product?.name}</h3>
        <p className={styles["Product__description"]}>{productPartNumber}</p>
        <span className={styles["Product__price"]}>{productPrice}</span>
      </div>
    </li>
  )
})
