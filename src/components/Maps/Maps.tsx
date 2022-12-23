import "./Maps.scss"
import { useState } from "react"
import { YMaps, Map, Placemark } from "react-yandex-maps"
import { Portal } from "./components/Portal/Portal"
import { BallonComponent } from "./components/BallonComponent/BallonComponent"
import { PointEnum } from "../../shared/model/PointEnum.model"

interface IMapsProps {
  selectedStore: PointEnum | null
  setSelectedStore: (arg0: PointEnum) => void
}

export const Maps = ({ selectedStore, setSelectedStore }: IMapsProps) => {
  const [activePortal, setActivePortal] = useState(false)
  const [point, setPoint] = useState<PointEnum | null>(null)

  return (
    <>
      <YMaps>
        <Map
          defaultState={{ center: [55.75, 37.57], zoom: 9 }}
          modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
          className="maps"
        >
          <Placemark
            geometry={
              {
                type: "Point",
                coordinates: [55.735221, 37.650352],
                // таганская
              } as any
            }
            properties={{
              hintContent: "Stack Overflow",
              balloonContent:
                '<div id="driver-2" className="driver-card"></div>',
            }}
            onClick={() => {
              // ставим в очередь промисов, чтобы сработало после отрисовки балуна
              setTimeout(() => {
                setPoint(PointEnum.taganskaya)
                setActivePortal(true)
              }, 0)
            }}
          />
          {/* <Placemark
            geometry={
              {
                type: "Point",
                coordinates: [55.792933, 37.582331],
                // савеловская
              } as any
            }
          /> */}
          {/* <Placemark
            geometry={
              {
                type: "Point",
                coordinates: [55.760641, 37.621031],
                // кузнецкий мост
              } as any
            }
          /> */}

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
    </>
  )
}
