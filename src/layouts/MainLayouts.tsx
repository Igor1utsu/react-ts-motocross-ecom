import { Content } from "../components/Content/Content"
import { Header } from "../components/Header/Header"
import { SideBar } from "../components/SideBar/SideBar"

export const MainLayouts = () => {
  return (
    <>
      <Header />
      <main className="main">
        <SideBar />
        <Content />
      </main>
    </>
  )
}
