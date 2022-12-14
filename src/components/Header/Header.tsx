import { ShoppingCartOutlined } from "@ant-design/icons"
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
      <Link to="/shopcart" className="header__cart">
        <span>{items + " items"}</span>
        <ShoppingCartOutlined />
      </Link>
    </header>
  )
}
