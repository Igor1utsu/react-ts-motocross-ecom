import { Image, notification } from "antd"
import { NotificationPlacement } from "antd/es/notification/interface"
import { PATH_TO_PICTURE } from "../constants/Path.constants"
import { PartData } from "../model/Product.model"

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (
    placement: NotificationPlacement,
    data: PartData
  ) => {
    api.success({
      message: `${data.name} added to cart`,
      description: (
        <Image src={PATH_TO_PICTURE.PARTS + data.image} width={50} />
      ),
      placement,
    })
  }

  return { openNotification, contextHolder }
}
