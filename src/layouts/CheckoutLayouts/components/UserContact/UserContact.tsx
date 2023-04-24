import styles from "./UserContact.module.scss"
import { FC, memo } from "react"
import { Button, Form, Input } from "antd"
import clsx from "clsx"

export const UserContact: FC = memo(() => {
  const [form] = Form.useForm()

  const formItemLayout = {
    wrapperCol: {
      sm: {
        offset: 8,
      },
    },
  }

  const onSubmit = (values: any) => {
    console.log("Received values of form: ", values)
  }

  return (
    <section className={clsx(styles["UserContact"], "wrapper-colum")}>
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
            name={["user", "firstName"]}
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
            name={["user", "lastName"]}
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
            name={["user", "phone"]}
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
            name={["user", "email"]}
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
          <Button type="ghost" className="btn--gree" htmlType="submit">
            Buy
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
})
