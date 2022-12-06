import React from "react"
import { Checkbox, MenuProps } from "antd"
import { Menu } from "antd"
import BRANDS from "../../../../data/BRANDS.json"

interface BrandType {
  id: number
  name: string
  title: string
  imageName: string
}

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const brandList = BRANDS.map((brand: BrandType) => {
  return getItem(<Checkbox>{brand.title}</Checkbox>, brand.id)
})

const items: MenuProps["items"] = [
  getItem("Brand", "brand", null, brandList),
]


export const FilterParts: React.FC = () => {
  return (
      <Menu
        style={{ width: 256 }}
        defaultOpenKeys={["brand"]}
        mode="inline"
        items={items}
      />
  )
}

