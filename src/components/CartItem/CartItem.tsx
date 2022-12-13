import PARTS from "../../data/PARTS.json"
import { CloseCircleOutlined } from "@ant-design/icons"
import { InputNumber } from "antd"
import { PATH_TO_PICTURE } from "../../data/data"
import { IDataParts } from "../../shared/model/IDataParts"

interface CartItemProps {
  productNumber: string
  qty: number
}

export const CartItem = ({ productNumber, qty }: CartItemProps) => {

  const part: IDataParts | undefined = PARTS.find((part) =>
    productNumber ? part.partNumber === productNumber : false
  )

  return (
    <div className="product">
      <div className="product__img-wrapper">
        <img
          src={PATH_TO_PICTURE.parts + part?.image}
          alt={part?.name}
        />
      </div>
      <div className="product__content ">
        <h3 className="product__title">{part?.name}</h3>
        <p className="product__description">{"# " + part?.partNumber}</p>
        <div className="product__price">{"Price: $" + part?.price}</div>
      </div>
      <div className="control">
        <CloseCircleOutlined className="control__icon" />
        <InputNumber min={1} defaultValue={qty} />
      </div>
    </div>
  )
}
