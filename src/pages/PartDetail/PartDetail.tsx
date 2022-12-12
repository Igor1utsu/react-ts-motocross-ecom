import {
  CheckOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons"
import { Button, InputNumber } from "antd"
import "./PartDetail.scss"
import PARTS from "../../data/PARTS.json"
import BRANDS from "../../data/BRANDS.json"
import { useParams } from "react-router-dom"
import { ParamsType } from "./model"
import { PATH_TO_PICTURE } from "../../data/data"
import { IDataParts } from "../../shared/model/IDataParts"
import { useContext } from "react"
import { FilterOptionsContext } from "../../context/FilterOptionsContext"

export const PartDetail = () => {
  const { make, model, year } = useContext(FilterOptionsContext)
  const params = useParams<ParamsType>()
  const part: IDataParts | undefined = PARTS.find((part) =>
    params.number ? part.partNumber === params.number : false
  )
  const brandLogo = BRANDS.find(
    (BRAND) => BRAND.name === part?.brand
  )?.imageName

  return (
    <div className="rp">
      <section className="rp__section">
        <div className="rp__header">
          <div className="rp__header__colum">
            <h2>{part?.name}</h2>
            <p># {part?.partNumber}</p>
          </div>
          <div className="rp__header__colum">
            <div className="company-logo">
              <img src={PATH_TO_PICTURE.brand + brandLogo} alt={part?.brand} />
            </div>
          </div>
        </div>
        <div className="rp__img">
          <img src={PATH_TO_PICTURE.parts + part?.image} alt="Repair Part" />
        </div>
        <div className="rp__content">
          {part?.fits.find(
            (data) =>
              data.make === make &&
              data.model === model &&
              data.year.find((YEAR) => YEAR === year)
          ) ? (
            <div className="rp__content__item fits-model">
              <div className="check-icon">
                <CheckOutlined
                  style={{ fontSize: "48px", color: "rgb(74, 247, 74)" }}
                />
              </div>
              <div className="item-colum">
                <div>This part fits:</div>
                <div>{year + " " + make + " " + model}</div>
              </div>
            </div>
          ) : (
            <div className="rp__content__item fits-model">
              <div className="check-icon">
                <InfoCircleOutlined
                  style={{ fontSize: "48px", color: "red" }}
                />
              </div>
              <div className="item-colum">
                <div>This part does not fit:</div>
                <div>{year + " " + make + " " + model}</div>
              </div>
            </div>
          )}
          <div className="rp__content__item">
            <div className="item-row">
              <span className="item-row__span">Price:</span>
              <span className="item-row__span">$</span>
              {part?.price}
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
          {part?.fits.map((data) =>
            data.year.map((d) => {
              return <div>{d + " " + data.make + " " + data.model}</div>
            })
          )}
          {/* <a href="kkk">+ view complete vehicle fitment information</a> */}
        </div>
      </section>
    </div>
  )
}
