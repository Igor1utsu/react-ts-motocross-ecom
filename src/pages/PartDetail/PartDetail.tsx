import { CheckOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Button, InputNumber } from "antd"
import "./PartDetail.scss"
import PARTS from "../../data/PARTS.json"
import { useParams } from "react-router-dom"
import { IDataParts } from "../../components/Content/components/Category/model/IDataParts.model"
import { ParamsType } from "./model"
import { PATH_TO_PICTURE } from "../../data/data"

export const PartDetail = () => {
  const params = useParams<ParamsType>()
  const dataRepairPart: IDataParts | undefined = PARTS.find((rp) =>
    params.number ? rp.partNumbers.includes(params.number) : false
  )
  // console.log("dataRP:", dataRepairPart)
  // console.log("params:", params)
const repairPart = (dataRepairPart!.partFor.map((data) =>
    data.models.map((data) =>
      data.series.find((num) => num.number === params.number)
    )
  ))[0][0]
  // console.log("repairPart:", repairPart)

  return (
    <div className="rp">
      <section className="rp__section">
        <div className="rp__header">
          <div className="rp__header__colum">
            <h2>{dataRepairPart?.name}</h2>
            <p># {repairPart?.number}</p>
          </div>
          <div className="rp__header__colum">
            <div className="company-logo">
              <img src="/img/repair-parts/Athena_Complete_Gasket_Kit-903923297.jpg" />
            </div>
          </div>
        </div>
        <div className="rp__img">
          <img
            src={PATH_TO_PICTURE.parts + repairPart?.image}
            alt="Repair Part"
          />
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
              <span className="item-row__span">$</span>
              {repairPart?.price}
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
