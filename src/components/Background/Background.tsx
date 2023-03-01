import { FC, memo } from "react"
import { PATH_TO_PICTURE } from "../../shared/constants/Path.constants"
import "./Background.scss"

export const Background: FC = memo(() => {
  return (
    <div className="background">
      <img
        className="background-img"
        src={PATH_TO_PICTURE.IMG + "background.jpg"}
        alt="background"
      />
    </div>
  )
})
