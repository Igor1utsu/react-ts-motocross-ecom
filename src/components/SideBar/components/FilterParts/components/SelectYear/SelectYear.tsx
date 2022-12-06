import { Select } from "antd"

interface SelectYearProps {
  model: string
  year: string
  bikeYearArray: number[] | undefined
  setYear: (value: string) => void
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
      value={year === "" ? null : year}
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
