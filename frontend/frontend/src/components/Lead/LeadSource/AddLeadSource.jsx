import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { addContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { useAddLeadSourceMutation } from "@/redux/rtk/features/leadSource/leadSourceApi";

import { Button, Form, Input } from "antd";

export default function AddLeadSource({ onClose }) {
  const [form] = Form.useForm();

  const [addLeadSource, { isLoading }] = useAddLeadSourceMutation();

  const onFinish = async (values) => {
    const formData = {
      ...values,
    };

    const resp = addLeadSource(formData);
    if (resp.data) {
      form.resetFields();
      onClose();
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <UserPrivateComponent permission="create-leadSource">
        <Form
          className="w-full"
          onFinish={onFinish}
          colon={false}
          layout="vertical"
          form={form}>
          <div className="w-full px-10">
            <Form.Item
              label="Lead Source name"
              name="name"
              rules={[
                { required: true, message: "Lead Source Name is Required." },
              ]}>
              <Input placeholder="Facebook" />
            </Form.Item>
          </div>

          <Form.Item label="" className="px-10">
            <div className="flex items-center gap-2">
              <Button
                size={"large"}
                htmlType="submit"
                type="primary"
                loading={isLoading}>
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </UserPrivateComponent>
    </div>
  );
}
