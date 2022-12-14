import PARTS from "../../data/PARTS.json"
import { CloseCircleOutlined } from "@ant-design/icons"
import { InputNumber } from "antd"
import { PATH_TO_PICTURE } from "../../data/data"
import { IDataParts } from "../../shared/model/IDataParts"
import { CartContext } from "../../context/CartContext"
import { useContext } from "react"

interface CartItemProps {
  productNumber: string
  qty: number
}

export const CartItem = ({ productNumber, qty }: CartItemProps) => {
  const { removeFromCart, setQTY } = useContext(CartContext)

  const part: IDataParts | undefined = PARTS.find((part) =>
    productNumber ? part.partNumber === productNumber : false
  )

  const handleStep = (value: number | null) => {
    if (value) part && setQTY(value, part?.partNumber)
    else part && removeFromCart(part?.partNumber)
  }

  return (
    <div className="product">
      <div className="product__img-wrapper">
        <img src={PATH_TO_PICTURE.parts + part?.image} alt={part?.name} />
      </div>
      <div className="product__content ">
        <h3 className="product__title">{part?.name}</h3>
        <p className="product__description">{"# " + part?.partNumber}</p>
        <div className="product__price">{"Price: $" + part?.price}</div>
      </div>
      <div className="control">
        <CloseCircleOutlined
          className="control__icon"
          onClick={() => part && removeFromCart(part?.partNumber)}
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
