import { IFits } from "./IFits"

export interface IDataParts {
  id: number
  name: string
  brand: string
  category: string
  partNumber: string
  price: number
  image: string
  fits: IFits[]
}
