import "./Category.scss"
import { Button, InputNumber, Table, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import { InfoCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons"

export const Category = () => {
  interface DataType {
    key: string
    partName: string
    price: number
    description: string
    image: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <div className="item__img">
          <img
            className=""
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="Repair Part"
          />
        </div>
      ),
      width: 64,
      align: "center",
    },
    {
      title: "Part Name",
      dataIndex: "partName",
      key: "partName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "INFO",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <Tooltip placement="bottom" title={description}>
          <InfoCircleOutlined style={{ fontSize: "26px" }} />
        </Tooltip>
      ),
      width: 128,
      align: "center",
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

  const data: DataType[] = [
    {
      key: "1",
      partName: "Piston Honda CR 250",
      price: 32,
      description: "Part repair INFO",
      image: "imageX.jpg",
    },
    {
      key: "2",
      partName: "Piston Honda CR 250",
      price: 42,
      description: "Part repair INFO",
      image: "imageX.jpg",
    },
    {
      key: "3",
      partName: "Piston Honda CR 250",
      price: 32,
      description: "Part repair INFO",
      image: "imageX.jpg",
    },
  ]

  return (
    <div className="category">
      <div className="category__header">Engine</div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        // showHeader={false}
      />
    </div>
  )
}
