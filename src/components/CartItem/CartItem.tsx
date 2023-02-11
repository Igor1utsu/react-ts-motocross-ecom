import './CartItem.scss'
import { CloseOutlined } from '@ant-design/icons'
import { Button, InputNumber } from 'antd'
import { PATH_TO_PICTURE } from '../../data/data'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'
import { getProduct } from '../../utils/helpers'

export enum TypeEnum {
  Drawer = 'item-drawer',
  Other = 'other',
}

interface ICartItemProps {
  id: number
  qty: number
  type?: TypeEnum
}

export const CartItem = ({ id, qty, type }: ICartItemProps) => {
  const { removeFromCart, setQTY } = useContext(CartContext)
  const product = getProduct(id)

  const handleStep = (value: number | null) => {
    if (value) product && setQTY(product.id, value)
    else product && removeFromCart(product.id)
  }

  return (
    <>
      <li className={type ? `cart-item ${type}` : 'cart-item'}>
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
                {'# ' + product?.partNumber}
              </p>
              <div className="cart-item__price">
                <span>{'Price: $' + product?.price}</span>
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
