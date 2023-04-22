import styles from "./CheckoutSession.module.scss"
import { FC, memo } from "react"
import { GettingPickup } from "../../layouts/CheckoutLayouts/components/GettingPickup/GettingPickup"
import { UserContactForm } from "../../layouts/CheckoutLayouts/components/UserContactForm/UserContactForm"
import { ProductsInfo } from "../../layouts/CheckoutLayouts/components/ProductsInfo/ProductsInfo"
import clsx from "clsx"

export const CheckoutSession: FC = memo(() => {
  return (
    <main className={clsx(styles["CheckoutSession"], "container")}>
      <h1 className={styles["CheckoutSession__title"]}>Checkout</h1>
      <div className={styles["CheckoutSession__grid"]}>
        <GettingPickup />
        <ProductsInfo />
        <UserContactForm />
      </div>
    </main>
  )
})
