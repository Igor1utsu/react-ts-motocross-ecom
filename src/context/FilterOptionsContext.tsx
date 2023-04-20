import React, { useMemo, useState } from "react"
import { useCookies } from "react-cookie"
import { createContext } from "react"
import MAKE from "../data/MAKE.json"
import { filtersCookies } from "../layouts/MainLayouts/components/SideBar/SideBar.const"
import { IFilterOptions } from "./model/IFilterOptions.model"

export const FilterOptionsContext = createContext<IFilterOptions>({
  make: null,
  model: null,
  year: null,
  isSelectBike: false,
  setMake: () => {},
  setModel: () => {},
  setYear: () => {},
  setIsSelectBike: () => {},
  clearSelectBike: () => {},
  checkedBrand: [""],
  setChekedBrand: () => {},
  minPrice: 0,
  maxPrice: 0,
  setMinPrice: () => {},
  setMaxPrice: () => {},
})

export const FilterOptionsState = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [make, setMake] = useState<string | null>(cookies._make || null)
  const [model, setModel] = useState<string | null>(cookies._model || null)
  const [year, setYear] = useState<number | null>(Number(cookies._year) || null)
  const [isSelectBike, setIsSelectBike] = useState(false)
  const [checkedBrand, setChekedBrand] = useState(
    JSON.parse(sessionStorage.getItem("checkedBrand") ?? "[]")
  )
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  const clearSelectBike = () => {
    // очищаем useState
    setMake(null)
    setModel(null)
    setYear(null)
    // очищаем куки
    removeCookie(filtersCookies.make)
    removeCookie(filtersCookies.model)
    removeCookie(filtersCookies.year)
  }

  // функция поиска массива моделей
  const bikeModelArray = useMemo(() => {
    return MAKE.find((data) => data.name === make)?.models
  }, [make])
  // функция поиска массива: год выуска
  const bikeYearArray = useMemo(() => {
    return bikeModelArray?.find((data) => data.name === model)?.year
  }, [bikeModelArray, model])

  return (
    <FilterOptionsContext.Provider
      value={{
        make,
        model,
        year,
        setMake,
        setModel,
        setYear,
        isSelectBike,
        setIsSelectBike,
        bikeModelArray,
        bikeYearArray,
        clearSelectBike,
        checkedBrand,
        setChekedBrand,
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
      }}
    >
      {children}
    </FilterOptionsContext.Provider>
  )
}
