import "./Category.scss"
import { Image, InputNumber, Table } from "antd"
import { Button } from "../../../../../../shared/components"
import type { ColumnsType } from "antd/es/table"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { FC, useContext } from "react"
import { FilterOptionsContext } from "../../../../../../context/FilterOptionsContext"
import { useNotification } from "../../../../../../shared/hooks/useNotification"
import { PATH_TO_PICTURE } from "../../../../../../shared/constants/Path.constants"
import { observer } from "mobx-react-lite"
import { useStore } from "../../../../../../store/context"
import { getPrice } from "../../../../../../shared/utils"
import { getFilteredProducts } from "../../../../utils"
import {
  productCategoryNames,
  ProductCategories,
  ProductData,
} from "../../../../../../shared/model"

interface ICategoryProps {
  category: ProductCategories
  list: ProductData[]
  showHeader?: boolean
}

export const Category: FC<ICategoryProps> = observer((props) => {
  const { category, list, showHeader = false } = props

  const { cart } = useStore()
  const { addToCart } = cart

  const filterParams = useContext(FilterOptionsContext)

  // const { openNotification, contextHolder } = useNotification()

  const products = getFilteredProducts(list, filterParams)

  const columns: ColumnsType<ProductData> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={PATH_TO_PICTURE.PARTS + image} />,
      width: 64,
      align: "center",
    },
    {
      title: "Part Name",
      dataIndex: "name",
      key: "name",
      render: (name, data) => (
        <Link to={`${data.id}`}>
          {name}
          <span className="part-number">{` #${data.partNumber}`}</span>
        </Link>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => getPrice(price),
      width: 64,
      align: "center",
    },
    {
      title: "Buy",
      dataIndex: "byy",
      key: "buy",
      render: (_, data) => {
        let value: number = 1
        const handleAddToCart = () => {
          // Уведомления
          // openNotification("bottomRight", data)
          addToCart(data.id, value)
        }

        return (
          <div className="item__buy">
            <InputNumber
              defaultValue={1}
              min={1}
              onChange={(val) => (val ? (value = val) : null)}
              className="buy__input"
            />
            <Button
              color="green"
              onClick={() => handleAddToCart()}
              icon={<ShoppingCartOutlined />}
            ></Button>
          </div>
        )
      },
      width: 140,
      align: "center",
    },
  ]

  return (
    <li className="category">
      <h2 className="category__header">{productCategoryNames[category]}</h2>
      {/* {contextHolder} */}
      <Table
        columns={columns}
        dataSource={products}
        pagination={false}
        showHeader={showHeader}
        rowKey={(product) => product.id}
      />
    </li>
  )
})
