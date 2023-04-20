import "./GettingPickup.scss"
import { Button, Modal } from "antd"
import { FC, memo, useState } from "react"
import { YMaps, Map, Placemark } from "react-yandex-maps"
import { Maps } from "../Maps/Maps"
import { useGetAddress } from "../../../../shared/hooks/useGetAddress"
import { useGetStoreData } from "../../../../shared/hooks/useGetStoreData"

export const GettingPickup: FC = memo(() => {
  const [selectedStore, setSelectedStore] = useState<number>(
    Number(localStorage.getItem("Store")) || 1
  )
  const { title, coordinates } = useGetStoreData(selectedStore)
  const address = useGetAddress(coordinates)
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
          <b>{title}</b>
          <span style={{ fontSize: 13 }}>{address}</span>
          <Button onClick={showModal}>Change</Button>
        </div>
        <YMaps>
          <Map
            state={{
              center: coordinates || [55.760641, 37.621031],
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
                  coordinates: coordinates,
                } as any
              }
            />
          </Map>
        </YMaps>
      </div>

      <Modal
        open={openMaps}
        title={<h3 className="modal-maps__head">Moskow</h3>}
        onCancel={handleCancel}
        footer={[]}
        width={"90vw"}
        bodyStyle={{ height: "80vh", marginTop: 20 }}
        centered={true}
        className="modal-maps"
      >
        <Maps
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />
      </Modal>
    </>
  )
})
