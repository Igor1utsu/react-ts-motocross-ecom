import { IPartFor } from "./IPartFor.model"

export interface IDataParts {
  id: number
  name: string
  brand: string
  category: string
  partNumbers: string[]
  partFor: IPartFor[]
}
