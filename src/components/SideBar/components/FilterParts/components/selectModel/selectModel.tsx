import { Select } from "antd"

interface BikeModelType {
  id: number
  name: string
  title: string
}

interface SelectModelProps {
  make: string
  model: string
  bikeModelArray: BikeModelType[] | undefined
  setModel: (value: string) => void
  setYear: (value: string) => void
}

export const SelectModel: React.FC<SelectModelProps> = ({
  make,
  model,
  bikeModelArray,
  setModel,
  setYear,
}) => {
  const onChange = (value: string) => {
    setYear("")
    setModel(value)
  }

  return (
    <Select
      placeholder="Model"
      value={model === "" ? null : model}
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
