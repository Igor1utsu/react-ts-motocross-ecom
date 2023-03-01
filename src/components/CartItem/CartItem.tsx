import "./CartItem.scss"
import { CloseOutlined } from "@ant-design/icons"
import { Button, InputNumber } from "antd"
import { CartContext } from "../../context/CartContext"
import { useContext, useMemo } from "react"
import { PATH_TO_PICTURE } from "../../shared/constants/Path.constants"
import { getProduct } from "../../shared/utils/GetProduct.utils"

export enum TypeEnum {
  Drawer = "item-drawer",
  Other = "other",
}

interface ICartItemProps {
  id: number
  qty: number
  type?: TypeEnum
}

export const CartItem = ({ id, qty, type }: ICartItemProps) => {
  const { removeFromCart, setQTY } = useContext(CartContext)
  const product = useMemo(() => getProduct(id), [id])

  const handleStep = (value: number | null) => {
    if (value) product && setQTY(product.id, value)
    else product && removeFromCart(product.id)
  }

  return (
    <>
      <li className={type ? `cart-item ${type}` : "cart-item"}>
        {!product && <span>Product no longer available</span>}
        {product && (
          <>
            <div className="cart-item__img-wrapper">
              <img
                src={PATH_TO_PICTURE.PARTS + product?.image}
                alt={product?.name}
              />
            </div>
            <div className="cart-item__content">
              <h3 className="cart-item__title">{product?.name}</h3>
              <p className="cart-item__description">
                {"# " + product?.partNumber}
              </p>
              <div className="cart-item__price">
                <span>{"Price: $" + product?.price}</span>
                <div className="cart-item__qty">
                  <span>QTY:</span>
                  <InputNumber
                    min={0}
                    value={qty}
                    onStep={(value) => handleStep(value)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <Button
          type="ghost"
          size="small"
          icon={<CloseOutlined />}
          onClick={() => product && removeFromCart(product.id)}
          className="btn--remove-cart-item"
        ></Button>
      </li>
    </>
  )
}
