import { Category } from "./components/Сategory/Category"
import "./Content.scss"
import CATEGORIES from "../../data/CATEGORIES.json"

interface CategoriesType {
  id: number
  category: string
  title: string
}

export const Content = () => {
  return (
    <div className="content">
      {CATEGORIES.map((data) => (
        <Category category={data.category} title={data.title} key={data.id} />
      ))}
    </div>
  )
}
