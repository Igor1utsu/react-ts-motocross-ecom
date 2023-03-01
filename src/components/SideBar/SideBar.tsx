import { FC, memo } from "react"
import { FilterParts } from "./components/FilterParts/FilterParts"
import "./SideBar.scss"

export const SideBar: FC = memo(() => {
  return (
    <div className="sidebar">
      <FilterParts />
    </div>
  )
})
