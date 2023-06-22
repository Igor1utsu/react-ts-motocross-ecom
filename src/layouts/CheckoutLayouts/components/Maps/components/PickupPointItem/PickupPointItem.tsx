import "./PickupPointItem.scss"
import { IPoint } from "./model/IPoint.model"
import { useGetAddress } from "../../../../hooks/useGetAddress"
import { FC, memo } from "react"
import { Button } from "../../../../../../shared/components"

interface IPickPointItemProps {
  point: IPoint
  selectedShopID: number
  handleStore: (pointId: number) => void
}

export const PickPointItem: FC<IPickPointItemProps> = memo((props) => {
  const { point, selectedShopID, handleStore } = props

  const address = useGetAddress(point.coordinates)

  return (
    <li className="point-item" key={point.id}>
      <h3 className="point-item__title">{point.title}</h3>
      <div className="point-item__address">{address}</div>
      <Button
        type={point.id === selectedShopID ? "primary" : "default"}
        onClick={() => handleStore(point.id)}
      >
        {point.id === selectedShopID ? "Selected" : "Select"}
      </Button>
    </li>
  )
})
