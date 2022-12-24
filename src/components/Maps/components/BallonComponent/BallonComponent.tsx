import { Button } from "antd"
import PICKUP_POINT from "../../../../data/PICKUP-POINT.json"

interface IBallonComponentProps {
  point: number | null
  selectedStore: number
  setSelectedStore: (arg0: number) => void
}

export const BallonComponent = ({
  point,
  selectedStore,
  setSelectedStore,
}: IBallonComponentProps) => {
  return (
    <>
      <h3>{PICKUP_POINT.find((data) => data.id === point)?.title}</h3>
      <Button
        type={point === selectedStore ? "primary" : "default"}
        onClick={() => point && setSelectedStore(point)}
      >
        {point === selectedStore ? "Selected" : "Select"}
      </Button>
    </>
  )
}
