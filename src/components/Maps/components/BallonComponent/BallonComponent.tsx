import { Button } from "antd"
import { useGetAddress } from "../../../../shared/hooks/useGetAddress"
import { storeCoordinates, storeTitle } from "../../../../utils/helpers"
import "./BallonComponent.scss"

interface IBallonComponentProps {
  point: number
  selectedStore: number
  setSelectedStore: (arg0: number) => void
  handleStore: (arg0: number) => void
}

export const BallonComponent = ({
  point,
  selectedStore,
  setSelectedStore,
  handleStore,
}: IBallonComponentProps) => {
  const address = useGetAddress(storeCoordinates(point))

  return (
    <div className="ballon">
      <h3>{point && storeTitle(point)}</h3>
      <div className="ballon__address">{address}</div>
      <Button
        type={point === selectedStore ? "primary" : "default"}
        onClick={() => point && handleStore(point)}
      >
        {point === selectedStore ? "Selected" : "Select"}
      </Button>
    </div>
  )
}
