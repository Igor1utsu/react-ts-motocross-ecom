import { ShoppingCartOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { DrawerCart } from "./components/DrawerCart/DrawerCart"
import "./Header.scss"

export const Header = () => {
  const { items } = useContext(CartContext)
  const [openDrawer, setOpenDrawer] = useState(false)

  const showDrawer = () => {
    setOpenDrawer(true)
  }

  const onCloseDrawer = () => {
    setOpenDrawer(false)
  }

  return (
    <>
      <header className="header">
        <Link to="/">
          <h1 className="header__title">TypeScript React App</h1>
        </Link>
        <button className="btn-show-drawer" onClick={showDrawer}>
          <Badge size="small" count={items}>
            <ShoppingCartOutlined className="cart-link-icon" />
          </Badge>
        </button>
      </header>
      <DrawerCart open={openDrawer} onClose={onCloseDrawer} />
    </>
  )
}
