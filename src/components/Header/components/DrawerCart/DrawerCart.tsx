import "./DrawerCart.scss"
import { Button, Drawer } from "antd"
import { useContext } from "react"
import { CartContext } from "../../../../context/CartContext"
import { CartItem } from "../../../CartItem/CartItem"
import { useNavigate } from "react-router-dom"

interface IDrawerCartProps {
  open: boolean
  onClose: () => void
}

export const DrawerCart = ({ open, onClose }: IDrawerCartProps) => {
  const { shoppingCart, items, total } = useContext(CartContext)
  const history = useNavigate()

  return (
    <Drawer
      title={`items: ${items}`}
      placement="right"
      onClose={onClose}
      open={open}
      className="drawer"
      headerStyle={{ textAlign: "center" }}
    >
      <div className="drawer__text">
        Total:<span className="total-price">{`${total} $`}</span>
      </div>
      {shoppingCart.length ? (
        <Button
          type="primary"
          className="btn--large"
          onClick={() => history("/shopcart")}
          style={{ marginBottom: 20 }}
        >
          Сheckout
        </Button>
      ) : (
        <span>There are no items in your cart.</span>
      )}
      {shoppingCart.map((product, index) => {
        return <CartItem id={product.id} qty={product.qty} key={index} />
      })}
    </Drawer>
  )
}
