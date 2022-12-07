import React, { useState } from "react"
import { Checkbox, MenuProps } from "antd"
import { Menu } from "antd"
import BRANDS from "../../../../data/BRANDS.json"
import MAKE from "../../../../data/MAKE.json"
import { SelectMake } from "./components/SelectMake/SelectMake"
import { SelectModel } from "./components/selectModel/selectModel"
import { SelectYear } from "./components/SelectYear/SelectYear"
import { FilterByPrice } from "./components/FilterByPrice/FilterByPrice"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const brandList = BRANDS.map((brand) => {
  return getItem(<Checkbox>{brand.title}</Checkbox>, brand.id)
})

export const FilterParts: React.FC = () => {
  const [make, setMake] = useState<string | null>(null)
  const [model, setModel] = useState<string | null>(null)
  const [year, setYear] = useState<string | null>(null)

  const clearSelectBike = () => {
    setMake(null)
    setModel(null)
    setYear(null)
  }

  console.log([make, model, year])

  const bikeModelArray = MAKE.find((data) => data.name === make)?.models
  const bikeYearArray = bikeModelArray?.find(
    (data) => data.name === model
  )?.year

  const selectBike = [
    getItem(
      <SelectMake
        make={make}
        setMake={setMake}
        setModel={setModel}
        setYear={setYear}
      />,
      "make",
      null
    ),
    getItem(
      <SelectModel
        make={make}
        model={model}
        bikeModelArray={bikeModelArray}
        setModel={setModel}
        setYear={setYear}
      />,
      "model",
      null
    ),
    getItem(
      <SelectYear
        model={model}
        year={year}
        bikeYearArray={bikeYearArray}
        setYear={setYear}
      />,
      "year",
      null
    ),
  ]

  const items: MenuProps["items"] = [
    getItem(
      <div className="menu__select">
        <span>Select to Bike</span>
        {make && model && year && (
          <a onClick={() => clearSelectBike()}>remove</a>
        )}
      </div>,
      "bike",
      null,
      selectBike,
      "group"
    ),
    getItem("Brand", "brand", null, brandList),
    getItem("Price: $", "price", null, [getItem(<FilterByPrice/>, 'min', null )], ),
  ]

  return (
    <Menu
      defaultOpenKeys={["price"]}
      mode="inline"
      items={items}
      className="sidebar__menu"
    />
  )
}
