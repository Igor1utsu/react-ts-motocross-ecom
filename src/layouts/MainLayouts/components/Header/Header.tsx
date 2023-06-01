import { ShoppingCartOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../../../assets/logo.svg"
import { Button } from "../../../../shared/components"
import { useStore } from "../../../../store/context"
import { Drawer } from "../DrawerWrapper/Drawer"
import "./Header.scss"

export const Header: FC = observer(() => {
  const { cart } = useStore()

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
        <div className="container flex-row">
          <Link to="/">
            <Logo />
          </Link>

          <Button
            onClick={showDrawer}
            className="header__show-drawer"
          >
            <Badge size="small" count={cart.items}>
              <ShoppingCartOutlined className="cart-link-icon" />
            </Badge>
          </Button>
        </div>
      </header>
      <Drawer open={openDrawer} onClose={onCloseDrawer} />
    </>
  )
})
