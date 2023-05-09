import "./Button.scss"
import React from "react"
import clsx from "clsx"
import { Button as ButtonAntd, ButtonProps as ButtonPropsAntd } from "antd"

type ButtonProps = ButtonPropsAntd & {
  color?: "green"
  maxWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  color,
  maxWidth = false,
  className,
  ...otherProps
}) => {
  return (
    <ButtonAntd
      data-color={color}
      data-max-width={maxWidth}
      className={clsx("Button", className)}
      {...otherProps}
    ></ButtonAntd>
  )
}
