import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainLayouts } from "./layouts/MainLayouts"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainLayouts />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
