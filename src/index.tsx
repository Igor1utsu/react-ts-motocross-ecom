import ReactDOM from "react-dom/client"
import App from "./App"
import { StoreContext } from "./store/context"
import Store from "./store"
import "antd/dist/reset.css"
import "./styles/index.scss"
import "./styles/global.scss"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <StoreContext.Provider value={new Store()}>
    <App />
  </StoreContext.Provider>
)
