import { ConfigProvider } from "antd"
import { antDesignThemeConfig } from "./styles/antDesignThemeConfig"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartContextState } from "./context/CartContext"
import { CheckoutLayouts } from "./layouts/CheckoutLayouts/CheckoutLayouts"
import { MainLayouts } from "./layouts/MainLayouts/MainLayouts"

function App() {
  return (
    <ConfigProvider theme={antDesignThemeConfig}>
      <CartContextState>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<MainLayouts />}></Route>
            <Route path="/checkout" element={<CheckoutLayouts />}></Route>
          </Routes>
        </BrowserRouter>
      </CartContextState>
    </ConfigProvider>
  )
}

export default App
