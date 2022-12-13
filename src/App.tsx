import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartContextState } from "./context/CartContext"
import { CartLayouts } from "./layouts/CartLayouts"
import { MainLayouts } from "./layouts/MainLayouts"

function App() {
  return (
    <>
      <CartContextState>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<MainLayouts />}></Route>
            <Route path="/shopcart" element={<CartLayouts />}></Route>
          </Routes>
        </BrowserRouter>
      </CartContextState>
    </>
  )
}

export default App
