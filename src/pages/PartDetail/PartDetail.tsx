import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Button, InputNumber } from 'antd'
import './PartDetail.scss'
import BRANDS from '../../data/BRANDS.json'
import { useNavigate, useParams } from 'react-router-dom'
import { IParams } from './model'
import { PATH_TO_PICTURE } from '../../data/data'
import { useContext, useState } from 'react'
import { FilterOptionsContext } from '../../context/FilterOptionsContext'
import { CartContext } from '../../context/CartContext'
import { PageNotFound } from '../PageNotFound/PageNotFound'
import { getProduct } from '../../utils/helpers'

export const PartDetail = () => {
  const { make, model, year } = useContext(FilterOptionsContext)
  const params = useParams<IParams>()
  const part = getProduct(params.number)
  const { shoppingCart, addToCart } = useContext(CartContext)
  const [qtyInput, setQtyInput] = useState<number>(1)
  const history = useNavigate()

  const brandLogo = BRANDS.find(
    (BRAND) => BRAND.name === part?.brand
  )?.imageName

  const fitToBike = part?.fits.find(
    (bike) =>
      bike.make === make &&
      bike.model === model &&
      bike.year.find((YEAR) => YEAR === year)
  )

  const handleAddToCart = () => {
    part && addToCart(part.id, qtyInput)
    setQtyInput(1)
  }

  const isAdded = shoppingCart.find((data) => data.id === part?.id)

  return !part ? (
    <PageNotFound />
  ) : (
    <div className="product">
      <section className="product-box">
        <div className="product-container-img">
          <img src={PATH_TO_PICTURE.parts + part?.image} alt="Repair Part" />
        </div>

        <div className="product-container-main">
          <div className="product__header">
            <h2 className="product__title">{part?.name}</h2>
            <h3 className="product__number">{'# ' + part?.partNumber}</h3>
          </div>

          <div className="product__row price">
            {'$ ' + part?.price}
            <div className="company-logo">
              <img src={PATH_TO_PICTURE.brand + brandLogo} alt={part?.brand} />
            </div>
          </div>
          <hr />
          <br />
          <div className="product__row">
            <div className="product__qty">
              <span>QTY:</span>
              <InputNumber
                min={1}
                value={qtyInput}
                className="product__cart-input"
                onChange={(val) => val && setQtyInput(val)}
              />
            </div>
            {!isAdded ? (
              <Button
                type="ghost"
                onClick={() => handleAddToCart()}
                className="btn--gree btn--large"
              >
                <ShoppingCartOutlined className="icon" />
                Add to Cart
              </Button>
            ) : (
              <Button
                type="ghost"
                onClick={() => history('/shopcart')}
                className="btn--gree btn--large"
              >
                View in cart
              </Button>
            )}
          </div>
          {make && model && year && (
            <div
              className={
                fitToBike ? 'product__row fit' : 'product__row fit no-fit'
              }
            >
              {fitToBike ? (
                <CheckCircleOutlined className="icon" />
              ) : (
                <ExclamationCircleOutlined className="icon" />
              )}
              <span>
                {fitToBike ? 'This part fits:' : 'This part does not fits:'}
              </span>
              <span>{year + ' ' + make + ' ' + model}</span>
            </div>
          )}
        </div>
      </section>
      <hr />
      <section className="product-box details">
        <h3 className="details__title">Details:</h3>
        <span className="details__fit-text">
          This item fits the following models:
        </span>
        {part?.fits.map((data) =>
          data.year.map((d, index) => {
            return (
              <span className="details__fit-item" key={index}>
                {d + ' ' + data.make + ' ' + data.model}
              </span>
            )
          })
        )}
      </section>
    </div>
  )
}
