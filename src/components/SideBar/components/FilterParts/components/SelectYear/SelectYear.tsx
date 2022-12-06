import { Select } from "antd"

interface SelectYearProps {
  model: string | null
  year: string | null
  bikeYearArray: number[] | undefined
  setYear: (value: string | null) => void
}

export const SelectYear: React.FC<SelectYearProps> = ({
  model,
  year,
  bikeYearArray,
  setYear,
}) => {
  return (
    <Select
      placeholder="Year"
      value={year}
      disabled={!model && true}
      onChange={(value) => setYear(value)}
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
