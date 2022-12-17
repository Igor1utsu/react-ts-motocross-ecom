import React, { useContext, useState } from "react"
import { ArrowRightOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { FilterOptionsContext } from "../../../../../../context/FilterOptionsContext"

export const FilterByPrice: React.FC = () => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } =
    useContext(FilterOptionsContext)
  const [min, setMin] = useState<number>(0 || minPrice)
  const [max, setMax] = useState<number>(0 || maxPrice)

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    setMinPrice(min)
    setMaxPrice(max)
  }

  return (
    <form onSubmit={submitHandler} style={{ display: "flex" }}>
      <Input
        placeholder="min"
        value={min}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMin(Number(e.target.value))
        }
        type="number"
        className="input-price"
      ></Input>
      <span className="price-dash">-</span>
      <Input
        placeholder="max"
        value={max}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMax(Number(e.target.value))
        }
        type="number"
        className="input-price"
      ></Input>
      <Button htmlType="submit" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <ArrowRightOutlined />
      </Button>
    </form>
  )
}
