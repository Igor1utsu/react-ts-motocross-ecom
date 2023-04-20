import "./PickupPointItem.scss"
import { Button } from "antd"
import { IPoint } from "./model/IPoint.model"
import { useGetAddress } from "../../../../hooks/useGetAddress"
import { FC, memo } from "react"

interface IPickPointItemProps {
  point: IPoint
  selectedStore: number
  handleStore: (pointId: number) => void
}

export const PickPointItem: FC<IPickPointItemProps> = memo((props) => {
  const { point, selectedStore, handleStore } = props

  const address = useGetAddress(point.coordinates)

  return (
    <li className="point-item" key={point.id}>
      <h3 className="point-item__title">{point.title}</h3>
      <div className="point-item__address">{address}</div>
      <Button
        type={point.id === selectedStore ? "primary" : "default"}
        onClick={() => handleStore(point.id)}
      >
        {point.id === selectedStore ? "Selected" : "Select"}
      </Button>
    </li>
  )
})
