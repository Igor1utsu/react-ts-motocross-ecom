import "./Category.scss"
import { Button, Image, InputNumber, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import PARTS from "../../../../data/PARTS.json"
import { IDataParts } from "./model/IDataParts.model"
import { PATH_TO_PICTURE } from "../../../../data/data"
import { useContext } from "react"
import { FilterOptionsContext } from "../../../../comtext/FilterOptionsContext"

interface CategoryProps {
  category: string
  title: string
}

interface RepairPartsType {
  name: string | undefined
  id?: number | undefined
  partID?: number | undefined
  number?: string | undefined
  price?: number | undefined
  image?: string | undefined
  year?: number[] | undefined[] | undefined
}

export const Category = ({ category, title }: CategoryProps) => {
  const { make, model, year, checkedBrand, minPrice, maxPrice } =
    useContext(FilterOptionsContext)

  // фильтруем данные по категориям
  const dataByCategory = PARTS.filter(
    (data: IDataParts) => data.category === category
  )
  // фильтруем данные по выбранным брендам
  const dataByBrand =
    checkedBrand.length === 0
      ? dataByCategory
      : dataByCategory.filter((data) => {
          let selectBrand = data.brand
          return (
            data.brand ===
            checkedBrand.find((checked) => checked === selectBrand)
          )
        })
  // фильтруем данные по производителю
  const dataByMake = dataByBrand.map((data) =>
    data.partFor.find((searchData) => searchData.make === make)
  )
  // фильтруем по модели
  const dataByModel = dataByMake.map((data) =>
    data?.models.find((searchData) => searchData.model === model)
  )
  // фильтруем по году выпуска
  const dataByYear = dataByModel.map((data) =>
    data?.series.find((searchData) =>
      year ? searchData.year.includes(year) : null
    )
  )
  // получаем полные данные о продукте
  const PartsDataArray = dataByYear
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
    // .filter((data) => data != null)
    .filter(Boolean)
    .map((data, index) => ({
      ...data,
      name: PARTS.find((DATA) => DATA.id === data?.partID)?.name,
      key: index,
    }))

  const columns: ColumnsType<RepairPartsType> = [
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
      render: (name, data) => <Link to={`${data.number}`}>{name}</Link>,
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
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <div className="item__buy">
          <InputNumber min={1} defaultValue={1} className="buy__input" />
          <Button>
            <ShoppingCartOutlined />
          </Button>
        </div>
      ),
      width: 140,
      align: "center",
    },
  ]

  return (
    <div className="category">
      <div className="category__header">{title}</div>
      <Table
        columns={columns}
        dataSource={PartsDataArray}
        pagination={false}
        // showHeader={false}
      />
    </div>
  )
}
