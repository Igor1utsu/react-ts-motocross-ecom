import { Image, notification } from "antd"
import { NotificationPlacement } from "antd/es/notification/interface"
import axios from "axios"
import { useEffect, useState } from "react"
import { PATH_TO_PICTURE } from "../data/data"
import { IDataParts } from "../shared/model/IDataParts"

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (
    placement: NotificationPlacement,
    data: IDataParts
  ) => {
    api.success({
      message: `${data.name} added to cart`,
      description: (
        <Image src={PATH_TO_PICTURE.parts + data.image} width={50} />
      ),
      placement,
    })
  }

  return { openNotification, contextHolder }
}

export const useGetAddress = (coordinates: number[] | undefined) => {
  const [address, setAddress] = useState("")

  const getAddress = async (coordinates: number[]) => {
    // преобразуем координаты в строковое значение
    const geocode = coordinates[1].toString() + "," + coordinates[0].toString()

    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${process.env.REACT_APP_YANDEX_API_KEY}&geocode=${geocode}`

    const response = await axios.get(url) // отправляем запросс

    // получаем массив с GeoObject
    const geoObjectList =
      response.data.response.GeoObjectCollection.featureMember
    // поиск адреса
    const geocoderMetaData = geoObjectList.find(
      (data: any) =>
        data.GeoObject.metaDataProperty.GeocoderMetaData.kind === "house"
    )
    // преобразование адресса в строку
    const address =
      geocoderMetaData.GeoObject.description +
      ", " +
      geocoderMetaData.GeoObject.name

    setAddress(address)
  }

  useEffect(() => {
    coordinates && getAddress(coordinates)
  }, [coordinates])

  return address
}
