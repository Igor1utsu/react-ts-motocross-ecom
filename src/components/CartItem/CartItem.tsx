import "./CartItem.scss"
import PARTS from "../../data/PARTS.json"
import { CloseOutlined } from "@ant-design/icons"
import { Button, InputNumber } from "antd"
import { PATH_TO_PICTURE } from "../../data/data"
import { IDataParts } from "../../shared/model/IDataParts"
import { CartContext } from "../../context/CartContext"
import { useContext } from "react"

interface CartItemProps {
  id: number
  qty: number
}

export const CartItem = ({ id, qty }: CartItemProps) => {
  const { removeFromCart, setQTY } = useContext(CartContext)

  const product: IDataParts | undefined = PARTS.find((data) =>
    id ? data.id === id : null
  )

  const handleStep = (value: number | null) => {
    if (value) product && setQTY(product.id, value)
    else product && removeFromCart(product.id)
  }

  return (
    <>
      <li className="cart-item">
        {!product && <span>Product no longer available</span>}
        {product && (
          <>
            <div className="cart-item__img-wrapper">
              <img
                src={PATH_TO_PICTURE.parts + product?.image}
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
          size="small"
          icon={<CloseOutlined />}
          onClick={() => product && removeFromCart(product.id)}
          className="btn-remove-cart-item"
        ></Button>
      </li>
    </>
  )
}
