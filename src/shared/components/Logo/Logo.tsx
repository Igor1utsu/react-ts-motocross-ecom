import "./Logo.scss"
import { Link } from "react-router-dom"
import { FC, memo } from "react"

export const Logo: FC = memo(() => {
  return (
    <Link to="/" style={{ width: 208 }}>
      <h1 className="mx-logo">
        MX
        <div>
          <span>repair parts.</span>
          <span>com</span>
        </div>
      </h1>
    </Link>
  )
})
