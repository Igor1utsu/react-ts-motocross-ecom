import MAKE from "../../../../../../data/MAKE.json"
import { Select } from "antd"

interface SelectMakeProps {
  setMake: (value: string) => void
  setModel: (value: string) => void
  setYear: (value: string) => void
}

export const SelectMake: React.FC<SelectMakeProps> = ({
  setMake,
  setModel,
  setYear,
}) => {
  const onChange = (value: string) => {
    setMake(value)
    setModel("")
    setYear("")
  }

  return (
    <Select
      placeholder="Make"
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
