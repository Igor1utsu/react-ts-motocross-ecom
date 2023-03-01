import "./Content.scss"
import { Link } from "react-router-dom"
import CONTENT from "../../data/CONTENT.json"
import { Card } from "antd"
import { PATH_TO_PICTURE } from "../../data/data"
import { usePageTitle } from "../../shared/hooks/usePageTitle"

export const Content = () => {
  usePageTitle()

  return (
    <div className="content">
      <div className="products">
        {CONTENT.map((data, index) => (
          <Link to={data.name} key={index}>
            <Card
              title={data.title}
              headStyle={{
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: 18,
              }}
              className="products__item"
            >
              <img
                src={PATH_TO_PICTURE.img + data.image}
                alt={data.title}
                style={{ width: "100%", marginBottom: 10 }}
              />
              <ul className="product__text">
                {data.text?.map((item, index) => (
                  <li className="text__item" key={index}>
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
}
