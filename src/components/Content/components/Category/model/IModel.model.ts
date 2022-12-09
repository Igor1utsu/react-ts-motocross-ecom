import { ISeries } from "./ISeries.model"

export interface IModel {
  partID: number
  model: string
  series: ISeries[]
}
