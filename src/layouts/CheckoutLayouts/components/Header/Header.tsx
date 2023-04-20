import styles from "./Header.module.scss"
import { FC, memo } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../../../assets/logo.svg"
import clsx from "clsx"

export const Header: FC = memo(() => {
  return (
    <>
      <header className={clsx(styles["Header"])}>
        <div className="container">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>
    </>
  )
})
