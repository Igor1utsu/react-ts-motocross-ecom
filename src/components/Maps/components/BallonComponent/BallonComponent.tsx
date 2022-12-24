import { Button } from "antd"
import { storeTitle } from "../../../../utils/helpers"

interface IBallonComponentProps {
  point: number | null
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
  return (
    <>
      <h3>{point && storeTitle(point)}</h3>
      <Button
        type={point === selectedStore ? "primary" : "default"}
        onClick={() => point && handleStore(point)}
      >
        {point === selectedStore ? "Selected" : "Select"}
      </Button>
    </>
  )
}
