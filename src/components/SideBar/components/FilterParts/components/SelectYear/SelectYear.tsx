import { Select } from "antd"
import React, { useContext } from "react"
import { FilterOptionsContext } from "../../../../../../comtext/FilterOptionsContext"
import { filtersCookies } from "../../../../SideBar.const"

export const SelectYear: React.FC = () => {
  const { make, model, year, setYear, bikeYearArray } = useContext(FilterOptionsContext)

  const changeHandler = (value: string) => {
    setYear(value)
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
}
