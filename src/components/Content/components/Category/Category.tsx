import "./Category.scss"
import { Button, Image, InputNumber, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import PARTS from "../../../../data/PARTS.json"
import { IDataParts } from "../../../../shared/model/IDataParts"
import { PATH_TO_PICTURE } from "../../../../data/data"
import { useContext, useMemo } from "react"
import { FilterOptionsContext } from "../../../../context/FilterOptionsContext"
import { CartContext } from "../../../../context/CartContext"
import { useNotification } from "../../../../utils/hooks"

interface CategoryProps {
  id: number
  category: string
  title: string
}

export const Category = ({ id, category, title }: CategoryProps) => {
  const { make, model, year, checkedBrand, minPrice, maxPrice } =
    useContext(FilterOptionsContext)
  const { addToCart } = useContext(CartContext)
  const { openNotification, contextHolder } = useNotification()

  // фильтруем данные по категориям
  const dataByCategory = PARTS.filter((data) => data.category === category)

  // фильтруем данные по выбранным брендам
  const dataByBrand = useMemo(() => {
    if (checkedBrand.length === 0) return dataByCategory
    else
      return dataByCategory.filter((data) => {
        let selectBrand = data.brand
        return (
          data.brand === checkedBrand.find((checked) => checked === selectBrand)
        )
      })
  }, [checkedBrand, dataByCategory])

  // фильтруем данные по выбранной марке
  const dataBySelectBike = useMemo(() => {
    if (make && model && year) {
      return dataByBrand.filter((data) =>
        data.fits.find(
          (bike) =>
            bike.make === make &&
            bike.model === model &&
            bike.year.find((YEAR) => YEAR === year)
        )
      )
    } else return dataByBrand
  }, [dataByBrand, make, model, year])

  // получаем полные данные о продукте
  const PartsDataArray = dataBySelectBike
    // фильтруем товар по минимальной цене
    .filter((data) => {
      if (minPrice && data?.price) return data?.price >= minPrice
      return data
    })
    // фильтруем товар по максимальной цене
    .filter((data) => {
      if (maxPrice && data?.price) return data?.price <= maxPrice
      return data
    })
    .map((part, index) => ({ ...part, key: index }))

  const columns: ColumnsType<IDataParts> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={PATH_TO_PICTURE.parts + image} />,
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
          {" for "}
          {data.fits.map(
            (data) =>
              data.make +
              " " +
              data.model +
              " " +
              (data.year.length > 2
                ? data.year[0] + " - " + data.year[data.year.length - 1] + " "
                : data.year[0] + " " + data.year[1] + " ")
          )}
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
              className="btn-cart"
              type="primary"
              onClick={() => handleAddToCart()}
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
    <div className="category">
      <div className="category__header">{title}</div>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={PartsDataArray}
        pagination={false}
        showHeader={id === 1 && true}
      />
    </div>
  )
}
