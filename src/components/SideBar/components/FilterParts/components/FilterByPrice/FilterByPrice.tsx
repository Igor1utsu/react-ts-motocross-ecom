import React, { useState } from "react"
import { ArrowRightOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"

export const FilterByPrice: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number>()
  const [maxPrice, setMaxPrice] = useState<number>()

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    console.log([minPrice, maxPrice])
  }

  return (
    <form onSubmit={submitHandler} style={{ display: "flex" }}>
      <Input
        placeholder="min"
        value={minPrice}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMinPrice(Number(e.target.value))
        }
        type="number"
        className="input-price"
      ></Input>
      <Input
        placeholder="max"
        value={maxPrice}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMaxPrice(Number(e.target.value))
        }
        type="number"
        className="input-price"
      ></Input>
      <Button htmlType="submit" className="btn-price">
        <ArrowRightOutlined />
      </Button>
    </form>
  )
}
