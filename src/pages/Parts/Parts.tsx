import CATEGORIES from "../../data/CATEGORIES.json"
import { Category } from "../../components/Content/components/Category/Category"

interface CategoriesType {
  id: number
  category: string
  title: string
}

export const Parts = () => {
  return (
    <>
      {CATEGORIES.map((data: CategoriesType) => (
        <Category category={data.category} title={data.title} key={data.id} />
      ))}
    </>
  )
}