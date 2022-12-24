import PICKUP_POINT from "../data/PICKUP-POINT.json"

export const storeTitle = (storeID: number) => {
  return PICKUP_POINT.find((data) => data.id === storeID)?.title
}

export const storeCoordinates = (storeID: number) => {
  return PICKUP_POINT.find((data) => data.id === storeID)?.coordinates
}
