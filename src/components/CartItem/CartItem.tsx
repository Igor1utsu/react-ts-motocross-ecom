import PARTS from "../../data/PARTS.json"
import { CloseCircleOutlined } from "@ant-design/icons"
import { InputNumber } from "antd"
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
    <div className="product">
      <div className="product__img-wrapper">
        <img src={PATH_TO_PICTURE.parts + product?.image} alt={product?.name} />
      </div>
      <div className="product__content ">
        <h3 className="product__title">{product?.name}</h3>
        <p className="product__description">{"# " + product?.partNumber}</p>
        <div className="product__price">{"Price: $" + product?.price}</div>
      </div>
      <div className="control">
        <CloseCircleOutlined
          className="control__icon"
          onClick={() => product && removeFromCart(product.id)}
        />
        <InputNumber
          min={0}
          value={qty}
          onStep={(value) => handleStep(value)}
        />
      </div>
    </div>
  )
}
