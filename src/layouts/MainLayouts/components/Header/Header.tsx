import { ShoppingCartOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import { FC, memo, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../../../assets/logo.svg"
import { CartContext } from "../../../../context/CartContext"
import { Button } from "../../../../shared/components"
import { DrawerWrapper } from "../DrawerWrapper/DrawerWrapper"
import "./Header.scss"

export const Header: FC = memo(() => {
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
        <div className="container wrapper-row">
          <Link to="/">
            <Logo />
          </Link>

          <Button
            onClick={showDrawer}
            className="header__show-drawer"
          >
            <Badge size="small" count={items}>
              <ShoppingCartOutlined className="cart-link-icon" />
            </Badge>
          </Button>
        </div>
      </header>
      <DrawerWrapper open={openDrawer} onClose={onCloseDrawer} />
    </>
  )
})
