import { ProductData } from "../../../shared/model"

type FilterParams = {
  make: string | null
  model: string | null
  year: number | null
  minPrice: number
  maxPrice: number
  checkedBrand: string[]
}

/**
 * Утилита для фильтрации списка товаров
 */
export const getFilteredProducts = (
  products: ProductData[],
  params: FilterParams
) => {
  const { make, model, year, minPrice, maxPrice, checkedBrand } = params

  return products
    .filter((prod, idx, sourceArray) => {
      if (checkedBrand.length) {
        return (
          prod.brand === checkedBrand.find((checked) => checked === prod.brand)
        )
      } else return sourceArray
    })
    .filter((prod, idx, sourceArray) => {
      if (make && model && year)
        return prod.fits.find(
          (bike) =>
            bike.make === make &&
            bike.model === model &&
            bike.year.find((YEAR) => YEAR === year)
        )
      else return sourceArray
    })
    .filter((prod, idx, sourceArray) => {
      if (minPrice) return prod.price >= minPrice
      else return sourceArray
    })
    .filter((prod, idx, sourceArray) => {
      if (maxPrice) return prod.price <= maxPrice
      else return sourceArray
    })
}
