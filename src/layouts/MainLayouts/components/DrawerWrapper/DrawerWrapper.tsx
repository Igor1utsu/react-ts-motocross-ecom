import styles from "./DrawerWrapper.module.scss"
import clsx from "clsx"
import { Button, Drawer } from "antd"
import { FC, useContext } from "react"
import { CartContext } from "../../../../context/CartContext"
import { Product } from "./components/Product/Product"
import { useNavigate } from "react-router-dom"

interface IDrawerWrapperProps {
  open: boolean
  onClose: () => void
}

export const DrawerWrapper: FC<IDrawerWrapperProps> = (props) => {
  const { open, onClose } = props
  const history = useNavigate()

  const { shoppingCart, items, total } = useContext(CartContext)

  const totalPrice = `$ ${total.toFixed(2)}`

  return (
    <Drawer
      title={`items: ${items}`}
      placement="right"
      onClose={onClose}
      open={open}
      className={styles["DrawerWrapper"]}
      headerStyle={{ textAlign: "center" }}
    >
      <div className={clsx(styles["DrawerWrapper__body"], "wrapper-colum")}>
        <ul className={styles["DrawerWrapper__list"]}>
          {shoppingCart.length ? (
            <>
              {shoppingCart.map((product) => {
                return (
                  <Product
                    id={product.id}
                    qty={product.qty}
                    key={product.id}
                  />
                )
              })}
            </>
          ) : (
            <li>There are no items in your cart.</li>
          )}
        </ul>

        <Button
          type="primary"
          className="btn--large"
          onClick={() => history("/checkout")}
        >
          Сheckout
        </Button>
        <div className={clsx(styles["DrawerWrapper__total"], "wrapper-row")}>
          <span>Total:</span>
          <span>{totalPrice}</span>
        </div>
      </div>
    </Drawer>
  )
}
