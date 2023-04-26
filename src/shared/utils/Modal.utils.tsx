import { Modal } from "antd"
import { AxiosError } from "axios"

export const showSuccessModal = (message: string) => {
  Modal.success({
    content: message,
  })
}

export const showErrorModal = (error: AxiosError) => {
  Modal.error({
    title: error.name,
    content: (
      <>
        {error.code && <p>{`code: ${error.code}`}</p>}
        {error.message && <p>{`message: ${error.message}`}</p>}
      </>
    ),
  })
}
