import styles from "./CheckoutSession.module.scss"
import { FC, memo } from "react"
import { GettingPickup } from "../../layouts/CheckoutLayouts/components/GettingPickup/GettingPickup"
import { UserContactForm } from "../../layouts/CheckoutLayouts/components/UserContactForm/UserContactForm"
import { CheckoutProductsInfo } from "../../layouts/CheckoutLayouts/components/CheckoutProductsInfo/CheckoutProductsInfo"

export const CheckoutSession: FC = memo(() => {
  return (
    <div className="container content-wrapper">
      <h1 className={styles["CheckoutSession__title"]}>Checkout</h1>
      <div className={styles["CheckoutSession__grid"]}>
        <GettingPickup />
        <CheckoutProductsInfo />
        <UserContactForm />
      </div>
    </div>
  )
})
