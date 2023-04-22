import styles from "./CheckoutSession.module.scss"
import { FC, memo } from "react"
import { GettingPickup } from "../../layouts/CheckoutLayouts/components/GettingPickup/GettingPickup"
import { UserContactForm } from "../../layouts/CheckoutLayouts/components/UserContactForm/UserContactForm"
import { ProductsInfo } from "../../layouts/CheckoutLayouts/components/ProductsInfo/ProductsInfo"

export const CheckoutSession: FC = memo(() => {
  return (
    <div className="container content-wrapper">
      <h1 className={styles["CheckoutSession__title"]}>Checkout</h1>
      <div className={styles["CheckoutSession__grid"]}>
        <GettingPickup />
        <ProductsInfo />
        <UserContactForm />
      </div>
    </div>
  )
})
