import "./Parts.scss"
import { Category } from "../../layouts/MainLayouts/components/ProductNavigation/components/Category/Category"
import { usePageTitle } from "../../shared/hooks/usePageTitle"
import { PARTS_PAGE_TITLE } from "../../shared/constants/Page.constants"
import { FC, useEffect } from "react"
import { Breadcrumbs } from "../../layouts/MainLayouts/components/ProductNavigation/components/Breadcrumb/Breadcrumbs"
import { SideBar } from "../../layouts/MainLayouts/components/SideBar/SideBar"
import { useStore } from "../../store/context"
import { observer } from "mobx-react-lite"

export const Parts: FC = observer(() => {
  const { products } = useStore()
  const { map, status, load } = products

  usePageTitle(PARTS_PAGE_TITLE)

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="container content-wrapper flex-row">
      <SideBar />
      <div className="content">
        <Breadcrumbs />
        <ul className="parts-table">
          {status === "loading" && <h3>Loading...</h3>}
          {status === "error" && <h3>Products loading error</h3>}
          {status === "success" &&
            Array.from(map.keys()).map((cat, idx) => (
              <Category
                category={cat}
                list={map.get(cat) ?? []}
                key={cat}
                showHeader={idx === 0 && true}
              />
            ))}
        </ul>
      </div>
    </div>
  )
})
