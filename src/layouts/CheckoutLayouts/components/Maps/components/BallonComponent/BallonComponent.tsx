
import { FC, memo } from "react"
import { Button } from "../../../../../../shared/components"
import { useGetAddress } from "../../../../hooks/useGetAddress"
import { useGetStoreData } from "../../../../hooks/useGetStoreData"
import "./BallonComponent.scss"

interface IBallonComponentProps {
  point: number
  selectedShopID: number
  setSelectedShopID: (arg0: number) => void
  handleStore: (arg0: number) => void
}

export const BallonComponent: FC<IBallonComponentProps> = memo((props) => {
  const { point, selectedShopID, setSelectedShopID, handleStore } = props

  const { title, coordinates } = useGetStoreData(point)
  const address = useGetAddress(coordinates)

  return (
    <div className="ballon">
      <h3>{point && title}</h3>
      <div className="ballon__address">{address}</div>
      <Button
        type={point === selectedShopID ? "primary" : "default"}
        onClick={() => point && handleStore(point)}
      >
        {point === selectedShopID ? "Selected" : "Select"}
      </Button>
    </div>
  )
})
