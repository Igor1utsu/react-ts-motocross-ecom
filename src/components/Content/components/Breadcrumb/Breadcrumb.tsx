import { FC, memo } from "react"
import { Breadcrumb } from "antd"
import { Link, useLocation } from "react-router-dom"
import { IBreadCrumbNameMap } from "./model/IBreadCrumbNameMap.model"

export const Breadcrumbs: FC = memo(() => {
  const location = useLocation()

  const detailLink: string[] = location.pathname.split("/") // разбиваем адресную строку на элементы
  const detailTextList = detailLink
    .filter((i, index) => index !== 0 && i)
    .map((link) => link.charAt(0).toUpperCase() + link.slice(1)) // возводим первый симбвол в UpperCase

  const breadcrumbNameMap: IBreadCrumbNameMap[] = detailTextList.map(
    (link) => ({
      path: location.pathname,
      text: link,
    })
  )

  const pathSnippets = location.pathname.split("/").filter((i) => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`
    return (
      <Breadcrumb.Item key={url}>
        {index === pathSnippets.length - 1 ? (
          <span>{breadcrumbNameMap[index].text}</span>
        ) : (
          <Link to={url}>{breadcrumbNameMap[index].text}</Link>
        )}
      </Breadcrumb.Item>
    )
  })

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      {location.pathname === "/" ? null : <Link to="/">Home</Link>}
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)

  return (
    <Breadcrumb className="content__bread-crumbs">{breadcrumbItems}</Breadcrumb>
  )
})
