import styles from "./CheckoutSession.module.scss"
import { FC, memo, useState } from "react"
import { GettingPickup } from "../../layouts/CheckoutLayouts/components/GettingPickup/GettingPickup"
import { UserContact } from "../../layouts/CheckoutLayouts/components/UserContact/UserContact"
import { ProductsInfo } from "../../layouts/CheckoutLayouts/components/ProductsInfo/ProductsInfo"
import clsx from "clsx"
import { storage } from "../../shared/utils"
import { STORAGE_SHOPID } from "../../shared/constants"

export const CheckoutSession: FC = memo(() => {
  const [selectedShopID, setSelectedShopID] = useState(
    storage.get<number>(STORAGE_SHOPID) ?? 1
  )

  return (
    <main className={clsx(styles["CheckoutSession"], "container")}>
      <h1 className={styles["CheckoutSession__title"]}>Checkout</h1>
      <div className={styles["CheckoutSession__grid"]}>
        <GettingPickup
          selectedShopID={selectedShopID}
          setSelectedShopID={setSelectedShopID}
        />
        <ProductsInfo />
        <UserContact selectedShopID={selectedShopID} />
      </div>
    </main>
  )
})
