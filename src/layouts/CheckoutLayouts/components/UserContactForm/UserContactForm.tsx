import styles from "./UserContactForm.module.scss"
import { FC, memo } from "react"
import { Button } from "antd"
import clsx from "clsx"

export const UserContactForm: FC = memo(() => {
  return (
    <form className={clsx(styles["UserContactForm"], "wrapper-colum")}>
      <input placeholder="name"></input>
      <input placeholder="email"></input>
      <input placeholder="tel"></input>
      <Button type="ghost" className="btn--gree">
        Buy
      </Button>
    </form>
  )
})
