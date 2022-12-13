import { CloseCircleOutlined } from "@ant-design/icons"
import { Button, InputNumber } from "antd"
import { PATH_TO_PICTURE } from "../../data/data"
import "./Cart.scss"

export const Cart = () => {
  return (
    <div className="container">
      <div className="cart">
        <div className="cart-list">
          <div className="product">
            <div className="product__img-wrapper">
              <img
                src={
                  PATH_TO_PICTURE.parts +
                  "WISECO_PERFORMANCE_PRODUCTS_WISECO_PISTONS-901545756.jpg"
                }
                alt="WISECO_PERFORMANCE_PRODUCTS_WISECO_PISTONS"
              />
            </div>
            <div className="product__content ">
              <h3 className="product__title">Wiseco Piston Kits</h3>
              <p className="product__description"># 614M06640</p>
              <div className="product__price">Price: $ 66</div>
            </div>
            <div className="control">
              <CloseCircleOutlined className="control__icon" />
              <InputNumber min={1} defaultValue={1} />
            </div>
          </div>
        </div>
        <div className="cart-order">
          <h2 className="cart-order__title">Total price</h2>
          <div className="cart-order__content total">
            <span>Total:</span>
            <span className="total__price">666 $</span>
          </div>
          <Button className="btn-cart btn-cart--large" type="primary">
            Buy
          </Button>
        </div>
      </div>
    </div>
  )
}
