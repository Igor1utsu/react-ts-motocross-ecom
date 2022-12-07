import { Select } from "antd"
import React from "react"
import { filtersCookies } from "../../../../SideBar.const"

interface SelectYearProps {
  make: string | null
  model: string | null
  year: string | null
  bikeYearArray: number[] | undefined
  setYear: (value: string | null) => void
}

export const SelectYear: React.FC<SelectYearProps> = ({
  make,
  model,
  year,
  bikeYearArray,
  setYear,
}) => {
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
