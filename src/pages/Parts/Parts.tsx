import "./Parts.scss"
import CATEGORIES from "../../data/CATEGORIES.json"
import { Category } from "../../components/Content/components/Category/Category"
import { usePageTitle } from "../../shared/hooks/usePageTitle"
import { PARTS_PAGE_TITLE } from "../../shared/constants/Page.constants"

interface ICategories {
  id: number
  category: string
  title: string
}

export const Parts = () => {
  usePageTitle(PARTS_PAGE_TITLE)

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
