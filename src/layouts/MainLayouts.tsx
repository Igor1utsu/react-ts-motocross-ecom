import { Route, Routes } from "react-router-dom"
import { Parts } from "../pages/Parts/Parts"
import { PartDetail } from "../pages/PartDetail/PartDetail"
import { ProductNavigation } from "../components/ProductNavigation/ProductNavigation"
import { Header } from "../components/Header/Header"
import { FilterOptionsState } from "../context/FilterOptionsContext"
import { PageNotFound } from "../pages/PageNotFound/PageNotFound"
import { FC, memo } from "react"

export const MainLayouts: FC = memo(() => {
  return (
    <>
      <Header />
      <FilterOptionsState>
        <Routes>
          <Route path="/" element={<ProductNavigation />}></Route>
          <Route path="parts/" element={<Parts />}></Route>
          <Route path="parts/:number" element={<PartDetail />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </FilterOptionsState>
    </>
  )
})
