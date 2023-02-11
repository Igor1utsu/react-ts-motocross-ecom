import { Image, notification } from 'antd'
import { NotificationPlacement } from 'antd/es/notification/interface'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { PATH_TO_PICTURE } from '../data/data'
import { IDataParts } from '../shared/model/IDataParts'
import PARTS from '../data/PARTS.json'

export const useGetProductList = (
  make: string | null,
  model: string | null,
  year: number | null,
  minPrice: number,
  maxPrice: number,
  category: string,
  checkedBrand: string[]
) => {
  // фильтруем данные по категориям
  const dataByCategory = PARTS.filter((data) => data.category === category)

  // фильтруем данные по выбранным брендам
  const dataByBrand = useMemo(() => {
    if (!checkedBrand.length) return dataByCategory
    else
      return dataByCategory.filter((data) => {
        let selectBrand = data.brand
        return (
          data.brand === checkedBrand.find((checked) => checked === selectBrand)
        )
      })
  }, [checkedBrand, dataByCategory])

  // фильтруем данные по выбранной марке
  const dataBySelectBike = useMemo(() => {
    if (make && model && year) {
      return dataByBrand.filter((data) =>
        data.fits.find(
          (bike) =>
            bike.make === make &&
            bike.model === model &&
            bike.year.find((YEAR) => YEAR === year)
        )
      )
    } else return dataByBrand
  }, [dataByBrand, make, model, year])

  // получаем полные данные о продукте
  const partsDataArray = dataBySelectBike
    // фильтруем товар по минимальной цене
    .filter((data) => {
      if (minPrice && data?.price) return data?.price >= minPrice
      return data
    })
    // фильтруем товар по максимальной цене
    .filter((data) => {
      if (maxPrice && data?.price) return data?.price <= maxPrice
      return data
    })
    .map((part, index) => ({ ...part, key: index }))

  return partsDataArray
}

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
  const [address, setAddress] = useState('')

  const getAddress = async (coordinates: number[]) => {
    // преобразуем координаты в строковое значение
    const geocode = coordinates[1].toString() + ',' + coordinates[0].toString()

    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${process.env.REACT_APP_YANDEX_API_KEY}&geocode=${geocode}&lang=en_US`

    const response = await axios.get(url) // отправляем запросс

    // получаем массив с GeoObject
    const geoObjectList =
      response.data.response.GeoObjectCollection.featureMember
    // поиск адреса
    const geocoderMetaData = geoObjectList.find(
      (data: any) =>
        data.GeoObject.metaDataProperty.GeocoderMetaData.kind === 'house'
    )
    // преобразование адресса в строку
    const address =
      geocoderMetaData.GeoObject.description.split(',')[0] +
      ', ' +
      geocoderMetaData.GeoObject.name

    setAddress(address)
  }

  useEffect(() => {
    coordinates && getAddress(coordinates)
  }, [coordinates])

  return address
}
