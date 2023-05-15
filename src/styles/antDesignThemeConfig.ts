import { ThemeConfig } from "antd"

export const antDesignThemeConfig: ThemeConfig = {
  token: {
    fontFamily: "Roboto, sans-serif",
    colorText: "#1d1d1d",
    borderRadius: 4,
    borderRadiusSM: 4,
    borderRadiusLG: 0,
    borderRadiusXS: 0,
  },
  components: {
    Button: {
      borderRadius: 4,
      borderRadiusLG: 4,
    },
  },
}
