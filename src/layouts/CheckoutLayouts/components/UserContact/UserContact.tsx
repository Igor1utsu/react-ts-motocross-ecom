import styles from "./UserContact.module.scss"
import clsx from "clsx"
import { FC, memo } from "react"
import { Form, Input } from "antd"
import { Button } from "../../../../shared/components"
import { sendOrder } from "../../utils/SendOrder.utils"
import { User } from "../../model/User.model"
import { useStore } from "../../../../store/context"

interface UserContactProps {
  selectedStore: number
}

export const UserContact: FC<UserContactProps> = memo((props) => {
  const { selectedStore } = props

  const { cart } = useStore()
  const { list, clearCart } = cart

  const [form] = Form.useForm()

  const formItemLayout = {
    wrapperCol: {
      sm: {
        offset: 8,
      },
    },
  }

  const onSubmit = async (values: User) => {
    const order = {
      date: Date.now,
      products: list,
      user: values,
      shopId: selectedStore,
    }

    const response = await sendOrder(order)

    if (response) {
      clearCart()
      form.resetFields(["firstName", "lastName", "phone", "email"])
    }
  }

  return (
    <section className={clsx(styles["UserContact"], "flex-col")}>
      <h2 className={styles["UserContact__title"]}>User contact</h2>
      <Form
        className={styles["UserContact__form"]}
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 8 }}
      >
        <Form.Item label="First Name">
          <Form.Item
            noStyle
            name={["firstName"]}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Last Name">
          <Form.Item
            noStyle
            name={["lastName"]}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Phone Number">
          <Form.Item
            noStyle
            name={["phone"]}
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={"+7"} style={{ width: "100%" }} />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Email">
          <Form.Item
            noStyle
            name={["email"]}
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item {...formItemLayout}>
          <Button
            disabled={!list.length}
            color="green"
            htmlType="submit"
          >
            Buy
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
})
