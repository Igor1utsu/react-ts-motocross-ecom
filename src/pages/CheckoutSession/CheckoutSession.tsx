import styles from "./CheckoutSession.module.scss"
import { FC, memo, useState } from "react"
import { GettingPickup } from "../../layouts/CheckoutLayouts/components/GettingPickup/GettingPickup"
import { UserContact } from "../../layouts/CheckoutLayouts/components/UserContact/UserContact"
import { ProductsInfo } from "../../layouts/CheckoutLayouts/components/ProductsInfo/ProductsInfo"
import clsx from "clsx"

export const CheckoutSession: FC = memo(() => {
  const [selectedStore, setSelectedStore] = useState<number>(
    Number(localStorage.getItem("Store")) || 1
  )

  return (
    <main className={clsx(styles["CheckoutSession"], "container")}>
      <h1 className={styles["CheckoutSession__title"]}>Checkout</h1>
      <div className={styles["CheckoutSession__grid"]}>
        <GettingPickup
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />
        <ProductsInfo />
        <UserContact selectedStore={selectedStore} />
      </div>
    </main>
  )
})
