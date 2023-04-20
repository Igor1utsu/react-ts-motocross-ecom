import { Checkbox } from "antd"
import BRANDS from "../../../data/BRANDS.json"
import { IBrand } from "../../../shared/model/IBrand.model"
import { getItem } from "./GetItemMenu"

/**
 * Утилита которая создает список Чекбоксов для бокового меню
 * Принимает список выбранных брендов и функцию для изменения это списка 
 */
export const GetBrandList = (
  checkedBrand: string[],
  setChekedBrand: (value: string[]) => void
) => {
  const brandList = BRANDS.map((brand) => {
    const changeHandler = (brand: IBrand) => {
      // проверем useState на наличие брендов, затем обновляем данные
      if (checkedBrand.includes(brand.name)) {
        const updateCheckedBrand = checkedBrand.filter(
          (checked) => checked !== brand.name
        )
        setChekedBrand(updateCheckedBrand)
        sessionStorage.setItem(
          "checkedBrand",
          JSON.stringify(updateCheckedBrand)
        )
      } else {
        const updateCheckedBrand = [...checkedBrand, brand.name]
        setChekedBrand(updateCheckedBrand)
        sessionStorage.setItem(
          "checkedBrand",
          JSON.stringify(updateCheckedBrand)
        )
      }
    }

    return getItem(
      <Checkbox
        checked={checkedBrand.includes(brand.name)}
        onChange={() => changeHandler(brand)}
      >
        {brand.title}
      </Checkbox>,
      brand.id
    )
  })

  return brandList
}
