import React, { useEffect, useState } from "react"
import { Checkbox, MenuProps } from "antd"
import { Menu } from "antd"
import BRANDS from "../../../../data/BRANDS.json"
import MAKE from "../../../../data/MAKE.json"
import { SelectMake } from "./components/SelectMake/SelectMake"
import { SelectModel } from "./components/selectModel/selectModel"
import { SelectYear } from "./components/SelectYear/SelectYear"
import { FilterByPrice } from "./components/FilterByPrice/FilterByPrice"
import { useCookies } from "react-cookie"
import { filtersCookies } from "../../SideBar.const"

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
  const [cookies, setCookie, removeCookie] = useCookies()
  const [make, setMake] = useState<string | null>(cookies._make || null)
  const [model, setModel] = useState<string | null>(cookies._model || null)
  const [year, setYear] = useState<string | null>(cookies._year || null)
  const [checkedBrand, setChekedBrand] = useState<string[]>([])

  useEffect(() => {
    // проверяем session- хранилище на наличие брендов. Если true, добавляем в useState
    const checkedBrandString = sessionStorage.getItem("checkedBrand")
    if (checkedBrandString) {
      setChekedBrand(JSON.parse(checkedBrandString))
    }
  }, [])

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

  const clearSelectBike = () => {
    // очищаем useState
    setMake(null)
    setModel(null)
    setYear(null)
    // очищаем куки
    removeCookie(filtersCookies.make)
    removeCookie(filtersCookies.model)
    removeCookie(filtersCookies.year)
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
        make={make}
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
