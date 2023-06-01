import { createContext, useContext } from "react"
import Store from "."

export const StoreContext = createContext<Store | null>(null)

export const useStore = () => {
  const context = useContext(StoreContext)

  if (context === null) {
    throw new Error("MobX context not found")
  }

  return context
}
