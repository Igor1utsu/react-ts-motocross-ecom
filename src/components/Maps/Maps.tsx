import "./Maps.scss"
import { useState } from "react"
import { YMaps, Map, Placemark } from "react-yandex-maps"
import { Portal } from "./components/Portal/Portal"
import { BallonComponent } from "./components/BallonComponent/BallonComponent"
import { Button } from "antd"
import PICKUP_POINT from "../../data/PICKUP-POINT.json"

interface IMapsProps {
  selectedStore: number
  setSelectedStore: (arg0: number) => void
}

export const Maps = ({ selectedStore, setSelectedStore }: IMapsProps) => {
  const [activePortal, setActivePortal] = useState(false)
  const [point, setPoint] = useState<number | null>(null)

  return (
    <div className="modal-maps">
      <ul className="modal-maps__list">
        {PICKUP_POINT.map((data) => (
          <li className="item" key={data.id}>
            <h3 className="item__title">{data.title}</h3>
            <Button
              type={data.id === selectedStore ? "primary" : "default"}
              onClick={() => setSelectedStore(data.id)}
            >
              {data.id === selectedStore ? "Selected" : "Select"}
            </Button>
          </li>
        ))}
      </ul>
      <YMaps>
        <Map
          defaultState={{ center: [55.760641, 37.621031], zoom: 12 }}
          modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
          className="maps"
        >
          {PICKUP_POINT.map((data) => (
            <Placemark
              geometry={
                {
                  type: "Point",
                  coordinates: data.coordinates,
                } as any
              }
              properties={{
                hintContent: data.title,
                balloonContent:
                  '<div id="driver-2" className="driver-card"></div>',
              }}
              onClick={() => {
                // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                setTimeout(() => {
                  setPoint(data.id)
                  setActivePortal(true)
                }, 0)
              }}
            />
          ))}

          {/* здесь мы активируем портал */}
          {activePortal && (
            <Portal getHTMLElementId={"driver-2"}>
              {/* ставим свой компонент */}
              <BallonComponent
                point={point}
                selectedStore={selectedStore}
                setSelectedStore={setSelectedStore}
              />
            </Portal>
          )}
        </Map>
      </YMaps>
    </div>
  )
}
