import React, { useContext } from "react"
import { Button, Checkbox, MenuProps } from "antd"
import { Menu } from "antd"
import BRANDS from "../../../../data/BRANDS.json"
import { SelectMake } from "./components/SelectMake/SelectMake"
import { SelectModel } from "./components/selectModel/selectModel"
import { SelectYear } from "./components/SelectYear/SelectYear"
import { FilterByPrice } from "./components/FilterByPrice/FilterByPrice"
import { FilterOptionsContext } from "../../../../context/FilterOptionsContext"

interface IBrand {
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
  const {
    isSelectBike,
    setIsSelectBike,
    clearSelectBike,
    checkedBrand,
    setChekedBrand,
  } = useContext(FilterOptionsContext)

  const brandList = BRANDS.map((brand) => {
    const changeHandler = (brand: IBrand) => {
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

  const itemsSelectBike: MenuProps["items"] = [
    getItem(
      <h3 className="menu__select">
        <span>Select to Bike</span>
        <Button
          type="link"
          onClick={() => {
            clearSelectBike()
            setIsSelectBike(false)
          }}
          style={{ padding: 0, lineHeight: "150%", height: 22 }}
        >
          remove
        </Button>
      </h3>,
      "bike",
      null,
      selectBike,
      "group"
    ),
  ]
  
  const itemsOther: MenuProps["items"] = [
    getItem("Brand", "brand", null, brandList),
    getItem("Price: $", "price", null, [
      getItem(<FilterByPrice />, "filterByPrice", null),
    ]),
  ]

  return (
    <>
      <Menu
        mode="inline"
        items={itemsSelectBike}
        className="sidebar__menu select-to-bike-group"
      />
      <Menu
        defaultOpenKeys={["brand"]}
        mode="inline"
        items={itemsOther}
        className="sidebar__menu"
      />
      {isSelectBike && <div className="overlay"></div>}
    </>
  )
}
