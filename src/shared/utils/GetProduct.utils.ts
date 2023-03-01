import PARTS from "../../data/PARTS.json"

export const getProduct = (number: number | string | undefined) => {
  return PARTS.find((data) => {
    if (typeof number === "number") return data["id"] === number
    if (typeof number === "string") return data["partNumber"] === number
    return false
  })
}
