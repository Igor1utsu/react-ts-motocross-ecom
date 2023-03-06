import "./Category.scss"
import { Button, Image, InputNumber, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { IDataParts } from "../../../../shared/model/IDataParts"
import { FC, useContext } from "react"
import { FilterOptionsContext } from "../../../../context/FilterOptionsContext"
import { CartContext } from "../../../../context/CartContext"
import { useGetProductList } from "../../../../shared/hooks/useGetProductList"
import { useNotification } from "../../../../shared/hooks/useNotification"
import { PATH_TO_PICTURE } from "../../../../shared/constants/Path.constants"

interface ICategoryProps {
  id: number
  category: string
  title: string
}

export const Category: FC<ICategoryProps> = (props) => {
  const { id, category, title } = props

  const { make, model, year, checkedBrand, minPrice, maxPrice } =
    useContext(FilterOptionsContext)
  const { addToCart } = useContext(CartContext)

  const { openNotification, contextHolder } = useNotification()
  const PartsDataArray = useGetProductList(
    make,
    model,
    year,
    minPrice,
    maxPrice,
    category,
    checkedBrand
  )

  const columns: ColumnsType<IDataParts> = [
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
        <Link to={`${data.partNumber}`}>
          {name}
          <span className="part-number">{` #${data.partNumber}`}</span>
        </Link>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <>
          <span>$</span>
          <span>{price}</span>
        </>
      ),
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
          openNotification("bottomRight", data)
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
              type="ghost"
              onClick={() => handleAddToCart()}
              className="btn--gree"
            >
              <ShoppingCartOutlined />
            </Button>
          </div>
        )
      },
      width: 140,
      align: "center",
    },
  ]

  return (
    <li className="category">
      <h2 className="category__header">{title}</h2>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={PartsDataArray}
        pagination={false}
        showHeader={id === 1 && true}
      />
    </li>
  )
}
