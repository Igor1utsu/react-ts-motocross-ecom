import { ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import "./Header.scss"

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title">TypeScript React App</h1>
      </Link>
      <Link to="/shopcart" className="header__cart">
        <span>1 items</span>
        <ShoppingCartOutlined />
      </Link>
    </header>
  )
}
