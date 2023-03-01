import { FC, memo } from "react"
import { PAGE_404_TITLE } from "../../shared/constants/Page.constants"
import { usePageTitle } from "../../shared/hooks/usePageTitle"

export const PageNotFound: FC = memo(() => {
  usePageTitle(PAGE_404_TITLE)

  return <h1>{PAGE_404_TITLE}</h1>
})
