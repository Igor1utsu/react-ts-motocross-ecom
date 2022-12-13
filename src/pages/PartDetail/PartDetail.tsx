import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
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

  const fitToBike = part?.fits.find(
    (bike) =>
      bike.make === make &&
      bike.model === model &&
      bike.year.find((YEAR) => YEAR === year)
  )

  return (
    <div className="product">
      <section className="product-box">
        <div className="product-container-img">
          <img src={PATH_TO_PICTURE.parts + part?.image} alt="Repair Part" />
        </div>

        <div className="product-container-main">
          <div className="product__header">
            <h2 className="product__title">{part?.name}</h2>
            <h3 className="product__number">{"# " + part?.partNumber}</h3>
          </div>

          <div className="product__row price">
            {"$ " + part?.price}
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
                defaultValue={1}
                className="product__cart-input"
              />
            </div>
            <Button className="btn-addcart btn-cart--large" type="primary">
              <ShoppingCartOutlined className="icon" />
              Add to Cart
            </Button>
          </div>
          {make && model && year && (
            <div
              className={fitToBike ? "product__row fit" : "product__row fit no-fit"}
            >
              {fitToBike ? (
                <CheckCircleOutlined className="icon" />
              ) : (
                <ExclamationCircleOutlined className="icon" />
              )}
              <span>
                {fitToBike ? "This part fits:" : "This part does not fits:"}
              </span>
              <span>{year + " " + make + " " + model}</span>
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
          data.year.map((d) => {
            return (
              <span className="details__fit-item">
                {d + " " + data.make + " " + data.model}
              </span>
            )
          })
        )}
      </section>
    </div>
  )
}
