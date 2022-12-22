import { Route, Routes, useLocation } from "react-router-dom"
import { Parts } from "../pages/Parts/Parts"
import { PartDetail } from "../pages/PartDetail/PartDetail"
import { Content } from "../components/Content/Content"
import { Header } from "../components/Header/Header"
import { SideBar } from "../components/SideBar/SideBar"
import { Breadcrumbs } from "../components/Content/components/Breadcrumb/Breadcrumb"
import { FilterOptionsState } from "../context/FilterOptionsContext"
import { Background } from "../components/Background/Background"
import { PageNotFound } from "../pages/PageNotFound/PageNotFound"

export const MainLayouts = () => {
  const { pathname } = useLocation()

  return (
    <>
      <Header />
      <FilterOptionsState>
        <main className="main">
          {pathname === "/" && <Background />}
          {pathname === "/parts" && <SideBar />}
          <div className="content">
            <Breadcrumbs />
            <Routes>
              <Route path="/" element={<Content />}></Route>
              <Route path="parts/" element={<Parts />}></Route>
              <Route path="parts/:number" element={<PartDetail />}></Route>
              <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
          </div>
        </main>
      </FilterOptionsState>
    </>
  )
}
