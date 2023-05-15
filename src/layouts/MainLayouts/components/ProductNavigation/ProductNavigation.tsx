import styles from "./ProductNavigation.module.scss"
import { useNavigate } from "react-router-dom"
import CONTENT from "../../../../data/CONTENT.json"
import { Card } from "antd"
import { usePageTitle } from "../../../../shared/hooks/usePageTitle"
import { PATH_TO_PICTURE } from "../../../../shared/constants/Path.constants"
import { FC, memo } from "react"

export const ProductNavigation: FC = memo(() => {
  const history = useNavigate()

  usePageTitle()

  return (
    <section className={styles.ProductNavigation}>
      <nav className={styles.navigation}>
        {CONTENT.map((data) => (
          <Card
            title={data.title}
            headStyle={{
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: 18,
            }}
            className={styles.product}
            onClick={() => history(data.path)}
            key={data.id}
          >
            <img
              src={PATH_TO_PICTURE.IMG + data.image}
              alt={data.title}
              className={styles["product__img"]}
            />
            <ul className={styles["product__content"]}>
              {data.text?.map((item, index) => (
                <li className={styles["product__item"]} key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </nav>
    </section>
  )
})
