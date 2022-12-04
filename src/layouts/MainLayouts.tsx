import { Route, Routes } from "react-router-dom"
import { Parts } from "../components/Content/components/Parts/Parts"
import { RepairPart } from "../components/Content/components/Сategory/components/RepairPart/RepairPart"
import { Content } from "../components/Content/Content"
import { Header } from "../components/Header/Header"
import { SideBar } from "../components/SideBar/SideBar"

export const MainLayouts = () => {
  return (
    <>
      <Header />
      <main className="main">
        <SideBar />
        <div className="content">
          <Routes>
            <Route path="/*" element={<Content />}></Route>
            <Route path="parts/*" element={<Parts />}></Route>
            <Route path="parts/:number" element={<RepairPart />}></Route>
          </Routes>
        </div>
      </main>
    </>
  )
}
