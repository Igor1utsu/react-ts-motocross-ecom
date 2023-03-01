import "./Parts.scss"
import CATEGORIES from "../../data/CATEGORIES.json"
import { Category } from "../../components/Content/components/Category/Category"
import { usePageTitle } from "../../shared/hooks/usePageTitle"
import { PARTS_PAGE_TITLE } from "../../shared/constants/Page.constants"
import { FC, memo } from "react"
import { ICategories } from "./model/ICategories.model"

export const Parts: FC = memo(() => {
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
})
