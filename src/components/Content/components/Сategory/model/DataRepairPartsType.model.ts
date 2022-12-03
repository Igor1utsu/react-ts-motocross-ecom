export interface DataRepairPartsType {
  id: number
  name: string
  company: string
  category: string
  partNumbers: string[]
  make: {
    repairPartID: number
    brand: string
    models: {
      repairPartID: number
      model: string
      series: {
        id: number
        repairPartID: number
        number: string
        price: number
        image: string
        year: number[]
      }[]
    }[]
  }[]
}
