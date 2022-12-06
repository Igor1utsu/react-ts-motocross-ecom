import { Select } from "antd"

interface BikeModelType {
  id: number
  name: string
  title: string
}

interface SelectModelProps {
  make: string  | null
  model: string | null
  bikeModelArray: BikeModelType[] | undefined
  setModel: (value: string | null) => void
  setYear: (value: string | null) => void
}

export const SelectModel: React.FC<SelectModelProps> = ({
  make,
  model,
  bikeModelArray,
  setModel,
  setYear,
}) => {
  const onChange = (value: string) => {
    setYear(null)
    setModel(value)
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
}
