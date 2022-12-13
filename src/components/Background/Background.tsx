import { PATH_TO_PICTURE } from "../../data/data"
import "./Background.scss"

export const Background = () => {
  return (
    <div className="background">
      <img
        className="background-img"
        src={PATH_TO_PICTURE.img + "background.jpg"}
        alt="background"
      />
    </div>
  )
}
