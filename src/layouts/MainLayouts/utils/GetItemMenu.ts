import { MenuProps } from "antd"

type MenuItem = Required<MenuProps>["items"][number]

/**
 * Утилита для создания элемента бокового меню
 */
export function getItem(
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
