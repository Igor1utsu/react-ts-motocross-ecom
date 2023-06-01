import { ConfigProvider } from "antd"
import { antDesignThemeConfig } from "./styles/antDesignThemeConfig"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CheckoutLayouts } from "./layouts/CheckoutLayouts/CheckoutLayouts"
import { MainLayouts } from "./layouts/MainLayouts/MainLayouts"
import { observer } from "mobx-react-lite"

const App = observer(() => {
  return (
    <ConfigProvider theme={antDesignThemeConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainLayouts />}></Route>
          <Route path="/checkout" element={<CheckoutLayouts />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
})

export default App
