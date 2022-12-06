import MAKE from "../../../../../../data/MAKE.json"
import { Select } from "antd"

interface SelectMakeProps {
  make: string | null
  setMake: (value: string) => void
  setModel: (value: string | null) => void
  setYear: (value: string | null) => void
}

export const SelectMake: React.FC<SelectMakeProps> = ({
  make,
  setMake,
  setModel,
  setYear,
}) => {
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
