import "./Category.scss"
import { Button, Image, InputNumber, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { ShoppingCartOutlined } from "@ant-design/icons"
import REPAIR_PARTS from "../../../../data/REPAIR_PARTS.json"

interface CategoryProps {
  category: string
  title: string
}

interface DataRepairPartsType {
  id: number
  name: string
  company: string
  category: string
  make: {
    repairPartID: number
    brand: string
    models: {
      repairPartID: number
      model: string
      series: {
        id: number
        repairPartID: number
        number: string
        price: number
        image: string
        year: number[]
      }[]
    }[]
  }[]
}

interface RepairPartsType {
  name: string | undefined
  id?: number | undefined
  repairPartID?: number | undefined
  number?: string | undefined
  price?: number | undefined
  image?: string | undefined
  year?: number[] | undefined
}

export const Category = ({ category, title }: CategoryProps) => {
  console.log([category, title])

  // console.log(RepairPatrs)
  const selectedMake: string = "honda" // выбираем марку
  const selectedModel: string = "CR250R" // выбираем модель
  const selectedYear: number = 1993 // выбираем год

  const filterByCategory = REPAIR_PARTS.filter(
    (rp: DataRepairPartsType) => rp.category === category
  )
  console.log(category, filterByCategory)
  const findByMake = filterByCategory.map((rp) =>
    rp.make.find((res) => res.brand === selectedMake)
  )
  console.log("Find.MAKE:", findByMake)
  const findByModel = findByMake.map((rp) =>
    rp?.models.find((res) => res.model === selectedModel)
  )
  console.log("Find.MODEL:", findByModel)
  const findByYear = findByModel.map((rp) =>
    rp?.series.find((res) => res.year.includes(selectedYear))
  )
  console.log("Find.YEAR", findByYear)
  const repairPartsArray = findByYear
    .filter((res) => res != null)
    .map((rp) => ({
      ...rp,
      name: REPAIR_PARTS.find((RP) => RP.id === rp?.repairPartID)?.name,
    }))
  console.log("RP_Array:", repairPartsArray)

  const columns: ColumnsType<RepairPartsType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={"/img/repair-parts/" + image} />,
      width: 64,
      align: "center",
    },
    {
      title: "Part Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <a>{name}</a>,
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
        dataSource={repairPartsArray}
        pagination={false}
        // showHeader={false}
      />
    </div>
  )
}
