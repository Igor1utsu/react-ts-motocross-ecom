import { Select } from "antd"
import { FC, memo, useContext } from "react"
import { FilterOptionsContext } from "../../../../../../../../context/FilterOptionsContext"

export const SelectModel: FC = memo(() => {
  const { make, model, setModel, setYear, setIsSelectBike, bikeModelArray } =
    useContext(FilterOptionsContext)

  const onChange = (value: string) => {
    setYear(null)
    setModel(value)
    setIsSelectBike(true)
  }

  return (
    <Select
      placeholder="Model"
      value={model}
      disabled={!make && true}
      onChange={onChange}
      className="sidebar__select"
      options={bikeModelArray?.map((model) => {
        return {
          value: model.name,
          label: model.title,
        }
      })}
    />
  )
})
