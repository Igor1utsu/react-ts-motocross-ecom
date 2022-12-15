import { ShoppingCartOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import "./Header.scss"

export const Header = () => {
  const { items } = useContext(CartContext)

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title">TypeScript React App</h1>
      </Link>
      <Link to="/shopcart" className="cart-link">
        <Badge size="small" count={items}>
          <ShoppingCartOutlined className="cart-link__icon" />
        </Badge>
      </Link>
    </header>
  )
}
