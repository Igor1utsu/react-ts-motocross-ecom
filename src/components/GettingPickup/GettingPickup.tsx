import "./GettingPickup.scss"
import { Modal } from "antd"
import { useState } from "react"
import { YMaps, Map, Button, Placemark } from "react-yandex-maps"
import { Maps } from "../Maps/Maps"
import { storeTitle } from "../../utils/helpers"

export const GettingPickup = () => {
  const [selectedStore, setSelectedStore] = useState<number>(
    Number(localStorage.getItem("Store")) || 1
  )
  const [openMaps, setOpenMaps] = useState(false)

  const showModal = () => {
    setOpenMaps(true)
  }

  const handleCancel = () => {
    setOpenMaps(false)
  }

  return (
    <>
      <div className="getting-pickup">
        <div className="getting-pickup__info">
          <span>Pickup point: </span>
          <b>{storeTitle(selectedStore)}</b>
          {/* <Button onClick={showModal}>Change</Button> */}
        </div>
        <YMaps>
          <Map
            defaultState={{
              center: [55.792933, 37.582331],
              zoom: 17,
              behaviors: ["disable('scrollZoom')"],
            }}
            options={{ suppressMapOpenBlock: true }} // убираем кнопку в карты
            style={{ width: 240, height: 128 }}
            onClick={showModal}
          >
            <Placemark
              geometry={
                {
                  type: "Point",
                  coordinates: [55.792933, 37.582331],
                  // савеловская
                } as any
              }
            />
          </Map>
        </YMaps>
      </div>

      <Modal
        open={openMaps}
        title="Moskow"
        onCancel={handleCancel}
        footer={[]}
        width={"90vw"}
        bodyStyle={{ height: "80vh", marginTop: 20 }}
        centered={true}
      >
        <Maps
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />
      </Modal>
    </>
  )
}
