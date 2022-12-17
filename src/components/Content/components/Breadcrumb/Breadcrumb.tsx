import React from "react"
import { Breadcrumb } from "antd"
import { Link, useLocation } from "react-router-dom"
import { IBreadCrumbNameMap } from "./model/IBreadCrumbNameMap.model"

export const Breadcrumbs: React.FC = () => {
  const location = useLocation()

  const detailLink: string[] = location.pathname.split("/") // разбиваем адресную строку на элементы
  const detailText = detailLink[detailLink.length - 1] // получаем последний элемент

  const breadcrumbNameMap: IBreadCrumbNameMap[] = [
    { path: "/parts", text: "Parts" },
    { path: location.pathname, text: detailText },
  ]

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
}
