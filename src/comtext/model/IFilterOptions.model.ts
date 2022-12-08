import { IBikeModel } from "./IBikeModel.model"

export interface IFilterOptions {
  make: string | null
  model: string | null
  year: string | null
  setMake: (value: string) => void
  setModel: (value: string | null) => void
  setYear: (value: string | null) => void
  clearSelectBike: () => void
  bikeModelArray?: IBikeModel[]
  bikeYearArray?: number[]
  checkedBrand: string[]
  setChekedBrand: (value: string[]) => void
}
