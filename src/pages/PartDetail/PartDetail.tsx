import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons"
import { InputNumber } from "antd"
import "./PartDetail.scss"
import BRANDS from "../../data/BRANDS.json"
import { useNavigate, useParams } from "react-router-dom"
import { FC, memo, useContext, useEffect, useState } from "react"
import { useStore } from "../../store/context"
import { API } from "../../shared/http/api"
import { FilterOptionsContext } from "../../context/FilterOptionsContext"
import { PageNotFound } from "../PageNotFound/PageNotFound"
import { usePageTitle } from "../../shared/hooks/usePageTitle"
import { PAGE_404_TITLE } from "../../shared/constants/Page.constants"
import { PATH_TO_PICTURE } from "../../shared/constants/Path.constants"
import { Breadcrumbs } from "../../layouts/MainLayouts/components/ProductNavigation/components/Breadcrumb/Breadcrumbs"
import { Button } from "../../shared/components"
import { PartData } from "../../shared/model/Product.model"

export const PartDetail: FC = memo(() => {
  const history = useNavigate()

  const { id: idString } = useParams()
  const id = idString ? parseInt(idString) : null

  const { cart } = useStore()
  const { list, addToCart } = cart

  const { make, model, year } = useContext(FilterOptionsContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [part, setPart] = useState<PartData | null>(null)

  const loadProduct = async () => {
    try {
      const part = await API.loadProduct(id ?? "")
      setPart(part)
      setLoading(false)
    } catch (e) {
      setError(true)
      setLoading(false)
      throw e
    }
  }

  useEffect(() => {
    loadProduct()
  }, [])

  const [qtyInput, setQtyInput] = useState<number>(1)
  usePageTitle(part ? part.name : PAGE_404_TITLE)

  const brandLogo =
    part && BRANDS.find((BRAND) => BRAND.name === part?.brand)?.imageName

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

  const isAdded = list.find((data) => data.id === part?.id)

  return (
    <div className="container content-wrapper flex-col">
      <Breadcrumbs />
      {error && <PageNotFound />}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && (
        <div className="product">
          <section className="product-box">
            <div className="product-container-img">
              <img
                src={PATH_TO_PICTURE.PARTS + part?.image}
                alt="Repair Part"
              />
            </div>

            <div className="product-container-main">
              <div className="product__header">
                <h2 className="product__title">{part?.name}</h2>
                <h3 className="product__number">{"# " + part?.partNumber}</h3>
              </div>

              <div className="product__row price">
                {"$ " + part?.price}
                <div className="company-logo">
                  <img
                    src={PATH_TO_PICTURE.BRAND + brandLogo}
                    alt={part?.brand}
                  />
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
                    color="green"
                    size="large"
                    maxWidth
                    onClick={() => handleAddToCart()}
                  >
                    <ShoppingCartOutlined className="icon" />
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    color="green"
                    size="large"
                    maxWidth
                    onClick={() => history("/checkout")}
                  >
                    View in cart
                  </Button>
                )}
              </div>
              {make && model && year && (
                <div
                  className={
                    fitToBike ? "product__row fit" : "product__row fit no-fit"
                  }
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
              data.year.map((d, index) => {
                return (
                  <span className="details__fit-item" key={index}>
                    {d + " " + data.make + " " + data.model}
                  </span>
                )
              })
            )}
          </section>
        </div>
      )}
    </div>
  )
})
