import { useMemo } from "react"
import PARTS from "../../data/PARTS.json"

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
  const dataByCategory = useMemo(() => {
    return PARTS.filter((data) => data.category === category)
  }, [category])

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
  const partsDataArray = useMemo(() => {
    return (
      dataBySelectBike
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
    )
  }, [dataBySelectBike, minPrice, maxPrice])

  return partsDataArray
}
