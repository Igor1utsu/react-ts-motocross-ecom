import { Image, notification } from "antd"
import { NotificationPlacement } from "antd/es/notification/interface"
import { PATH_TO_PICTURE } from "../data/data"
import { IDataParts } from "../shared/model/IDataParts"

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (
    placement: NotificationPlacement,
    data: IDataParts
  ) => {
    api.success({
      message: `${data.name} added to cart`,
      description: (
        <Image src={PATH_TO_PICTURE.parts + data.image} width={50} />
      ),
      placement,
    })
  }

  return { openNotification, contextHolder }
}
