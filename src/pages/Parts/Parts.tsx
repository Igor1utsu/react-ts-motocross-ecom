import "./Parts.scss"
import CATEGORIES from "../../data/CATEGORIES.json"
import { Category } from "../../components/Content/components/Category/Category"

interface ICategories {
  id: number
  category: string
  title: string
}

export const Parts = () => {
  return (
    <ul className="parts">
      {CATEGORIES.map((data: ICategories) => (
        <Category
          id={data.id}
          category={data.category}
          title={data.title}
          key={data.id}
        />
      ))}
    </ul>
  )
}
