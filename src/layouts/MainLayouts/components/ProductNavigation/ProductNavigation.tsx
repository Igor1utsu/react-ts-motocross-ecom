import "./ProductNavigation.scss"
import { Link } from "react-router-dom"
import CONTENT from "../../../../data/CONTENT.json"
import { Card } from "antd"
import { usePageTitle } from "../../../../shared/hooks/usePageTitle"
import { PATH_TO_PICTURE } from "../../../../shared/constants/Path.constants"
import { FC, memo } from "react"

export const ProductNavigation: FC = memo(() => {
  usePageTitle()

  return (
    <div className="bg">
      <div className="products-nav">
        {CONTENT.map((data) => (
          <Link to={data.name} key={data.id}>
            <Card
              title={data.title}
              headStyle={{
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: 18,
              }}
              className="product-nav__item i-product"
            >
              <img
                src={PATH_TO_PICTURE.IMG + data.image}
                alt={data.title}
                style={{ width: "100%", marginBottom: 10 }}
              />
              <ul className="i-product__content">
                {data.text?.map((item, index) => (
                  <li className="i-product__element" key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
})
