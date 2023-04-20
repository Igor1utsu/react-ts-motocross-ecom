import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartContextState } from "./context/CartContext"
import { CartLayouts } from "./layouts/CartLayouts"
import { CheckoutLayouts } from "./layouts/CheckoutLayouts/CheckoutLayouts"
import { MainLayouts } from "./layouts/MainLayouts"

function App() {
  return (
    <>
      <CartContextState>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<MainLayouts />}></Route>
            <Route path="/shopcart" element={<CartLayouts />}></Route>
            <Route path="/checkout" element={<CheckoutLayouts />}></Route>
          </Routes>
        </BrowserRouter>
      </CartContextState>
    </>
  )
}

export default App
