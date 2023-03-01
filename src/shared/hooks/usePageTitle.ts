import { useState, useEffect } from "react"
import { MAIN_PAGE_TITLE } from "../constants/Page.constants"

export const usePageTitle = (
  value = MAIN_PAGE_TITLE
): [string, (value: string) => void] => {
  const [title, setTitle] = useState<string>(value)

  useEffect(() => {
    document.title = title
  }, [title, setTitle])

  return [title, setTitle]
}
