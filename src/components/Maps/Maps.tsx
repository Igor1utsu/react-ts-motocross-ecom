import "./Maps.scss"
import { useState } from "react"
import { YMaps, Map, Placemark } from "react-yandex-maps"
import { Portal } from "./components/Portal/Portal"
import { BallonComponent } from "./components/BallonComponent/BallonComponent"
import PICKUP_POINT from "../../data/PICKUP-POINT.json"
import { PickPointItem } from "./components/PickupPointItem/PickupPointItem"

interface IMapsProps {
  selectedStore: number
  setSelectedStore: (arg0: number) => void
}

export const Maps = ({ selectedStore, setSelectedStore }: IMapsProps) => {
  const [activePortal, setActivePortal] = useState(false)
  const [point, setPoint] = useState<number | null>(null)

  const handleStore = (id: number) => {
    localStorage.setItem("Store", id.toString())
    setSelectedStore(id)
  }

  return (
    <div className="modal-maps">
      <ul className="modal-maps__list">
        {PICKUP_POINT.map((data) => (
          <PickPointItem
            point={data}
            selectedStore={selectedStore}
            handleStore={handleStore}
            key={data.id}
          />
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
              key={data.id}
            />
          ))}

          {/* здесь мы активируем портал */}
          {activePortal && point && (
            <Portal getHTMLElementId={"driver-2"}>
              {/* ставим свой компонент */}
              <BallonComponent
                point={point}
                selectedStore={selectedStore}
                setSelectedStore={setSelectedStore}
                handleStore={handleStore}
              />
            </Portal>
          )}
        </Map>
      </YMaps>
    </div>
  )
}
