import { Button } from "antd"
import { FC, memo } from "react"
import { useGetAddress } from "../../../../../../shared/hooks/useGetAddress"
import { useGetStoreData } from "../../../../../../shared/hooks/useGetStoreData"
import "./BallonComponent.scss"

interface IBallonComponentProps {
  point: number
  selectedStore: number
  setSelectedStore: (arg0: number) => void
  handleStore: (arg0: number) => void
}

export const BallonComponent: FC<IBallonComponentProps> = memo((props) => {
  const { point, selectedStore, setSelectedStore, handleStore } = props

  const { title, coordinates } = useGetStoreData(point)
  const address = useGetAddress(coordinates)

  return (
    <div className="ballon">
      <h3>{point && title}</h3>
      <div className="ballon__address">{address}</div>
      <Button
        type={point === selectedStore ? "primary" : "default"}
        onClick={() => point && handleStore(point)}
      >
        {point === selectedStore ? "Selected" : "Select"}
      </Button>
    </div>
  )
})
