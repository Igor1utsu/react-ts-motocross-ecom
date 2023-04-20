import { useEffect, useState } from "react"
import PICKUP_POINT from "../../../data/PICKUP-POINT.json"
import { IStoreData } from "../../../shared/model/IStoreData"
import { IPickupPoint } from '../../../shared/model/IPickupPoint'


export const useGetStoreData = (storeID: number) => {
  const [storeData, setStoreData] = useState<IStoreData>({
    title: null,
    coordinates: null,
  })

  useEffect(() => {
    let data = PICKUP_POINT.find((data: IPickupPoint) => data.id === storeID)

    data && setStoreData({ title: data.title, coordinates: data.coordinates })
  }, [storeID])

  return storeData
}
