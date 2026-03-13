import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { addContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import {
  useAddLeadSourceMutation,
  useGetLeadSourceQuery,
  useUpdateLeadSourceMutation,
} from "@/redux/rtk/features/leadSource/leadSourceApi";

import { Button, Form, Input } from "antd";
import { useEffect } from "react";

export default function UpdateLeadSource({ data, onClose }) {
  const { id } = data;
  const [form] = Form.useForm();

  const { data: leadSources, isLoading: leadSourceLoading } =
    useGetLeadSourceQuery(id);

  const [updateLeadSource, { isLoading }] = useUpdateLeadSourceMutation();

  const onFinish = async (values) => {
    const formData = {
      ...values,
    };

    const resp = await updateLeadSource({ id, values: formData });
    if (resp.data) {
      form.resetFields();
      onClose();
    }
  };

  useEffect(() => {
    if (leadSources) {
      form.setFieldsValue({
        ...leadSources,
      });
    }
  }, [form, leadSources]);

  return (
    <div className="flex justify-center mt-5">
      <UserPrivateComponent permission="create-leadSource" type="update">
        <Form
          className="w-full"
          onFinish={onFinish}
          colon={false}
          layout="vertical"
          initialValues={leadSources}
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
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </UserPrivateComponent>
    </div>
  );
}
