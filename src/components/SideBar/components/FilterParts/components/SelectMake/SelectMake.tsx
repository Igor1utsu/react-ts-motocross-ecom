import MAKE from "../../../../../../data/MAKE.json"
import { Select } from "antd"
import { FC, memo, useContext } from "react"
import { FilterOptionsContext } from "../../../../../../context/FilterOptionsContext"

export const SelectMake: FC = memo(() => {
  const { make, setMake, setModel, setYear, setIsSelectBike } =
    useContext(FilterOptionsContext)

  const onChange = (value: string) => {
    setMake(value)
    setModel(null)
    setYear(null)
    setIsSelectBike(true)
  }

  return (
    <Select
      placeholder="Make"
      value={make}
      onChange={onChange}
      className="sidebar__select"
      options={MAKE.map((make) => {
        return {
          value: make.name,
          label: make.title,
        }
      })}
    />
  )
})
