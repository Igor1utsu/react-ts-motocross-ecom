import React, { useContext, useState } from "react"
import { Checkbox, MenuProps } from "antd"
import { Menu } from "antd"
import BRANDS from "../../../../data/BRANDS.json"
import { SelectMake } from "./components/SelectMake/SelectMake"
import { SelectModel } from "./components/selectModel/selectModel"
import { SelectYear } from "./components/SelectYear/SelectYear"
import { FilterByPrice } from "./components/FilterByPrice/FilterByPrice"
import { FilterOptionsContext } from "../../../../comtext/FilterOptionsContext"

interface BrandType {
  id: number
  name: string
  title: string
  imageName: string
}

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

export const FilterParts: React.FC = () => {
  const { make, model, year, clearSelectBike } =
    useContext(FilterOptionsContext)
  const [checkedBrand, setChekedBrand] = useState<string[]>(
    JSON.parse(sessionStorage.getItem("checkedBrand") ?? "[]") || []
  )

  const brandList = BRANDS.map((brand) => {
    const changeHandler = (brand: BrandType) => {
      // проверем useState на наличие брендов, затем обновляем данные
      if (checkedBrand.includes(brand.name)) {
        const updateCheckedBrand = checkedBrand.filter(
          (checked) => checked !== brand.name
        )
        setChekedBrand(updateCheckedBrand)
        sessionStorage.setItem(
          "checkedBrand",
          JSON.stringify(updateCheckedBrand)
        )
      } else {
        const updateCheckedBrand = [...checkedBrand, brand.name]
        setChekedBrand(updateCheckedBrand)
        sessionStorage.setItem(
          "checkedBrand",
          JSON.stringify(updateCheckedBrand)
        )
      }
    }

    return getItem(
      <Checkbox
        checked={checkedBrand.includes(brand.name)}
        onChange={() => changeHandler(brand)}
      >
        {brand.title}
      </Checkbox>,
      brand.id
    )
  })

  const selectBike = [
    getItem(<SelectMake />, "make", null),
    getItem(<SelectModel />, "model", null),
    getItem(<SelectYear />, "year", null),
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
    getItem("Price: $", "price", null, [
      getItem(<FilterByPrice />, "filterByPrice", null),
    ]),
  ]

  return (
    <Menu
      defaultOpenKeys={["brand"]}
      mode="inline"
      items={items}
      className="sidebar__menu"
    />
  )
}
