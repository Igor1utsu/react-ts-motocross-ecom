import axios from "axios"
import { useEffect, useState } from "react"

export const useGetAddress = (coordinates: number[] | undefined | null) => {
  const [address, setAddress] = useState("")

  const getAddress = async (coordinates: number[]) => {
    // преобразуем координаты в строковое значение
    const geocode = coordinates[1].toString() + "," + coordinates[0].toString()

    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${process.env.REACT_APP_YANDEX_API_KEY}&geocode=${geocode}&lang=en_US`

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
      geocoderMetaData.GeoObject.description.split(",")[0] +
      ", " +
      geocoderMetaData.GeoObject.name

    setAddress(address)
  }

  useEffect(() => {
    coordinates && getAddress(coordinates)
  }, [coordinates])

  return address
}
