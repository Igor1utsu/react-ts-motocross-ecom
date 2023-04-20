import { FC, memo } from "react"
import { PAGE_404_TITLE } from "../../shared/constants/Page.constants"
import { usePageTitle } from "../../shared/hooks/usePageTitle"
import "./PageNotFound.scss"

export const PageNotFound: FC = memo(() => {
  usePageTitle(PAGE_404_TITLE)

  return (
    <div className="container">
      <h2 className="page-not-found-message">{PAGE_404_TITLE}</h2>
    </div>
  )
})
