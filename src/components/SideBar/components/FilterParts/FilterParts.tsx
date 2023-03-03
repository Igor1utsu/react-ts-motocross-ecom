import { FC, memo, useContext, useMemo } from "react"
import { Button, MenuProps } from "antd"
import { Menu } from "antd"
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
})
