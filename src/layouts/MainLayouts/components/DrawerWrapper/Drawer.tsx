import styles from "./Drawer.module.scss"
import clsx from "clsx"
import { Drawer as DrawerAnt } from "antd"
import { FC } from "react"
import { useStore } from "../../../../store/context"
import { observer } from "mobx-react-lite"
import { Product } from "./components/Product/Product"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../../shared/components"
import { getPrice } from "../../../../shared/utils"

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export const Drawer: FC<IDrawerProps> = observer((props) => {
  const { open, onClose } = props
  const history = useNavigate()

  const { cart } = useStore()
  const { list, total } = cart

  return (
    <DrawerAnt
      title={`items: ${total.items}`}
      placement="right"
      onClose={onClose}
      open={open}
      className={styles["Drawer"]}
      headerStyle={{ textAlign: "center" }}
    >
      <div className={clsx(styles["Drawer__body"], "flex-col")}>
        <ul className={styles["Drawer__list"]}>
          {!list.length && <li>There are no items in your cart.</li>}
          {list?.map((product) => {
            return <Product product={product} key={product.id} />
          })}
        </ul>

        <Button
          type="primary"
          size="large"
          maxWidth
          onClick={() => history("/checkout")}
        >
          Сheckout
        </Button>
        <div className={clsx(styles["Drawer__total"], "flex-row")}>
          <span>Total:</span>
          <span>{getPrice(total.price)}</span>
        </div>
      </div>
    </DrawerAnt>
  )
})
