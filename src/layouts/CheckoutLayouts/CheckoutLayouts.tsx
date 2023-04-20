import { FC, memo } from "react"
import { CheckoutSession } from "../../pages/CheckoutSession/CheckoutSession"
import { Header } from "./components/Header/Header"

export const CheckoutLayouts: FC = memo(() => {
  return (
    <>
      <Header />
      <CheckoutSession />
    </>
  )
})
