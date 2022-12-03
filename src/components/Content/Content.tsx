import { Category } from "./components/Сategory/Category"
import "./Content.scss"
import { Routes, Route } from "react-router-dom"
import CATEGORIES from "../../data/CATEGORIES.json"
import { RepairPart } from "./components/Сategory/components/RepairPart/RepairPart"

interface CategoriesType {
  id: number
  category: string
  title: string
}

export const Content = () => {
  const RepairParts = () => {
    return (
      <>
        {CATEGORIES.map((data: CategoriesType) => (
          <Category category={data.category} title={data.title} key={data.id} />
        ))}
      </>
    )
  }

  return (
    <div className="content">
      <Routes>
        <Route path="/repair-parts/*" element={RepairParts()}></Route>
        <Route path="/repair-parts/:number" element={<RepairPart />}></Route>
      </Routes>
    </div>
  )
}
