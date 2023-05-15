import "./Parts.scss"
import CATEGORIES from "../../data/CATEGORIES.json"
import { Category } from "../../layouts/MainLayouts/components/ProductNavigation/components/Category/Category"
import { usePageTitle } from "../../shared/hooks/usePageTitle"
import { PARTS_PAGE_TITLE } from "../../shared/constants/Page.constants"
import { FC, memo } from "react"
import { ICategories } from "./model/ICategories.model"
import { Breadcrumbs } from "../../layouts/MainLayouts/components/ProductNavigation/components/Breadcrumb/Breadcrumbs"
import { SideBar } from "../../layouts/MainLayouts/components/SideBar/SideBar"

export const Parts: FC = memo(() => {
  usePageTitle(PARTS_PAGE_TITLE)

  return (
    <div className="container content-wrapper flex-row">
      <SideBar />
      <div className="content">
        <Breadcrumbs />
        <ul className="parts-table">
          {CATEGORIES.map((data: ICategories) => (
            <Category
              id={data.id}
              category={data.category}
              title={data.title}
              key={data.id}
            />
          ))}
        </ul>
      </div>
    </div>
  )
})
