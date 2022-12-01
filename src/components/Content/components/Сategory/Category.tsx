import "./Category.scss"
import { Button, Image, InputNumber, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { ShoppingCartOutlined } from "@ant-design/icons"
import RepairPatrs from "../../../../data/repairParts.json"

export const Category = () => {
  interface RepairPartsType {
    id: string
    name: string
    number: string
    category: string
    models: {
      make: string
      model: string
      year: number[]
    }[]
    image: string
    price: number
  }

  console.log(RepairPatrs)

  const columns: ColumnsType<RepairPartsType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image src={"/img/repair-parts/" + image}/>
      ),
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
      <div className="category__header">Engine</div>
      <Table
        columns={columns}
        dataSource={RepairPatrs}
        pagination={false}
        // showHeader={false}
      />
    </div>
  )
}
