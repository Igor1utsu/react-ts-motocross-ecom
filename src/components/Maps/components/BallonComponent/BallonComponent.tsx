import { Button } from "antd"
import { PointEnum } from "../../../../shared/model/PointEnum.model"

interface IBallonComponentProps {
    point: PointEnum | null
    selectedStore: PointEnum | null
    setSelectedStore: (arg0: PointEnum) => void
}

export const BallonComponent = ({point, selectedStore, setSelectedStore}: IBallonComponentProps) => {
  return (
    <>
      <h3>{point}</h3>
      <Button
        type={point === selectedStore ? "primary" : "default"}
        onClick={() => setSelectedStore(PointEnum.taganskaya)}
      >
        {point === selectedStore ? "Selected" : "Select"}
      </Button>
    </>
  )
}
