import { Content } from "../components/Content/Content"
import { SideBar } from "../components/SideBar/SideBar"

export const MainLayouts = () => {
  return (
    <main className="main">
      <SideBar />
      <Content />
    </main>
  )
}
