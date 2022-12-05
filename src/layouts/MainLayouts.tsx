import { Route, Routes } from "react-router-dom"
import { Parts } from "../pages/Parts/Parts"
import { PartDetail } from "../pages/PartDetail/PartDetail"
import { Content } from "../components/Content/Content"
import { Header } from "../components/Header/Header"
import { SideBar } from "../components/SideBar/SideBar"
import { Breadcrumbs } from "../components/Content/components/Breadcrumb/Breadcrumb"

export const MainLayouts = () => {
  return (
    <>
      <Header />
      <main className="main">
        <SideBar />
        <div className="content">
          <Breadcrumbs />
          <Routes>
            <Route path="/*" element={<Content />}></Route>
            <Route path="parts/*" element={<Parts />}></Route>
            <Route path="parts/:number" element={<PartDetail />}></Route>
          </Routes>
        </div>
      </main>
    </>
  )
}
