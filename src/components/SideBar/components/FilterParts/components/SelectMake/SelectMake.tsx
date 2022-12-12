import MAKE from "../../../../../../data/MAKE.json"
import { Select } from "antd"
import { useContext } from "react"
import { FilterOptionsContext } from "../../../../../../context/FilterOptionsContext"

export const SelectMake: React.FC = () => {
  const { make, setMake, setModel, setYear } = useContext(FilterOptionsContext)

  const onChange = (value: string) => {
    setMake(value)
    setModel(null)
    setYear(null)
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
}
