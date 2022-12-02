import { CheckOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Button, InputNumber } from "antd"
import "./RepairParts.scss"

export const RepairParts = () => {
  return (
    <div className="rp">
      <section className="rp__section">
        <div className="rp__header">
          <div className="rp__header__colum">
            <h2>Wiseco Piston Kits</h2>
            <p># 666.666.00</p>
          </div>
          <div className="rp__header__colum">
            <div className="company-logo">
              <img src="/img/repair-parts/Athena_Complete_Gasket_Kit-903923297.jpg" />
            </div>
          </div>
        </div>
        <div className="rp__img">
          <img src="/img/repair-parts/Athena_Complete_Gasket_Kit-903923297.jpg" />
        </div>
        <div className="rp__content">
          <div className="rp__content__item fits-model">
            <div className="check-icon">
              <CheckOutlined
                style={{ fontSize: "48px", color: "rgb(74, 247, 74)" }}
              />
            </div>
            <div className="item-colum">
              <div>This part fits:</div>
              <div>1993 Honda CR250R</div>
            </div>
          </div>
          <div className="rp__content__item">
            <div className="item-row">
              <span className="item-row__span">Price:</span>
              <span className="item-row__span">$</span> 999
            </div>
            <div className="item-row">
              <span className="item-row__span">QTY:</span>
              <InputNumber
                min={1}
                defaultValue={1}
                className="buy__input"
                style={{ width: 60, marginRight: 5 }}
              />
              <Button
                className="btn-buy"
                type="primary"
                icon={<ShoppingCartOutlined />}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="rp__section details">
        <h3 className="details__title">Details:</h3>
        <div className="rp__content__item details__content">
          <p className="details__text">This item fits the following models:</p>
          <a href="kkk">+ view complete vehicle fitment information</a>
        </div>
      </section>
    </div>
  )
}
