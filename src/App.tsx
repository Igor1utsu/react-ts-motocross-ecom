import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartLayouts } from "./layouts/CartLayouts"
import { MainLayouts } from "./layouts/MainLayouts"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainLayouts />}></Route>
          <Route path="/shopcart" element={<CartLayouts />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
