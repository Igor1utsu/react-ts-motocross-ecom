import { FC, memo, useContext, useMemo } from "react"
import { Button, Menu, MenuProps } from "antd"
import { SelectMake } from "./components/SelectMake/SelectMake"
import { SelectModel } from "./components/selectModel/selectModel"
import { SelectYear } from "./components/SelectYear/SelectYear"
import { FilterByPrice } from "./components/FilterByPrice/FilterByPrice"
import { FilterOptionsContext } from "../../../../context/FilterOptionsContext"
import { getItem } from "../../../../shared/utils/GetItemMenu"
import { GetBrandList } from "../../../../shared/utils/GetBrandList"

export const FilterParts: FC = memo(() => {
  const {
    isSelectBike,
    setIsSelectBike,
    clearSelectBike,
    checkedBrand,
    setChekedBrand,
  } = useContext(FilterOptionsContext)

  const brandList = useMemo(() => {
    return GetBrandList(checkedBrand, setChekedBrand)
  }, [checkedBrand])

  const formSelectBike = [
    getItem(<SelectMake />, "make", null),
    getItem(<SelectModel />, "model", null),
    getItem(<SelectYear />, "year", null),
  ]

  const menuSelectBike: MenuProps["items"] = [
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
      formSelectBike,
      "group"
    ),
  ]

  const menuOther: MenuProps["items"] = [
    getItem("Brand", "brand", null, brandList),
    getItem("Price: $", "price", null, [
      getItem(<FilterByPrice />, "filterByPrice", null),
    ]),
  ]

  return (
    <>
      <Menu
        mode="inline"
        items={menuSelectBike}
        className="sidebar__menu select-to-bike-group"
      />
      <Menu
        defaultOpenKeys={["brand"]}
        mode="inline"
        items={menuOther}
        className="sidebar__menu"
      />
      {isSelectBike && <div className="overlay"></div>}
    </>
  )
})
