import { PAGE_404_TITLE } from "../../shared/constants/Page.constants"
import { usePageTitle } from "../../shared/hooks/usePageTitle"

export const PageNotFound = () => {
  usePageTitle(PAGE_404_TITLE)

  return <h1>{PAGE_404_TITLE}</h1>
}
