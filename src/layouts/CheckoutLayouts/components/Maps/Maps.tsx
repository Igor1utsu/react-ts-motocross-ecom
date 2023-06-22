import "./Maps.scss"
import { FC, memo, useState } from "react"
import { YMaps, Map, Placemark } from "react-yandex-maps"
import { Portal } from "./components/Portal/Portal"
import { BallonComponent } from "./components/BallonComponent/BallonComponent"
import PICKUP_POINT from "../../../../data/PICKUP-POINT.json"
import { PickPointItem } from "./components/PickupPointItem/PickupPointItem"
import { storage } from "../../../../shared/utils"
import { STORAGE_SHOPID } from "../../../../shared/constants"

interface IMapsProps {
  selectedShopID: number
  setSelectedShopID: (arg0: number) => void
}

export const Maps: FC<IMapsProps> = memo((props) => {
  const { selectedShopID, setSelectedShopID } = props

  const [activePortal, setActivePortal] = useState(false)
  const [point, setPoint] = useState<number | null>(null)

  const handleStore = (id: number) => {
    storage.set(STORAGE_SHOPID, id)
    setSelectedShopID(id)
  }

  return (
    <div className="modal-maps__body">
      <ul className="modal-maps__list">
        {PICKUP_POINT.map((data) => (
          <PickPointItem
            point={data}
            selectedShopID={selectedShopID}
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
                selectedShopID={selectedShopID}
                setSelectedShopID={setSelectedShopID}
                handleStore={handleStore}
              />
            </Portal>
          )}
        </Map>
      </YMaps>
    </div>
  )
})
