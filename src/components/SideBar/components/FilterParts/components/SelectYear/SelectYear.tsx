import { Select } from "antd"
import { FC, memo, useContext } from "react"
import { FilterOptionsContext } from "../../../../../../context/FilterOptionsContext"
import { filtersCookies } from "../../../../SideBar.const"

export const SelectYear: FC = memo(() => {
  const { make, model, year, setYear, setIsSelectBike, bikeYearArray } =
    useContext(FilterOptionsContext)

  const changeHandler = (value: number) => {
    setYear(value)
    setIsSelectBike(false)

    // добавляем выбранный мотоцикл в куки
    document.cookie = `${filtersCookies.make}=${make}`
    document.cookie = `${filtersCookies.model}=${model}`
    document.cookie = `${filtersCookies.year}=${value}`
  }

  return (
    <Select
      placeholder="Year"
      value={year}
      disabled={!model && true}
      onChange={changeHandler}
      className="sidebar__select"
      options={bikeYearArray?.map((year) => {
        return {
          value: year,
          label: year,
        }
      })}
    />
  )
})
