import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { addContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import {
  useAddLeadMutation,
  useGetLeadQuery,
  useUpdateLeadMutation,
} from "@/redux/rtk/features/leads/leadsApi";
import { useGetLeadSourcesQuery } from "@/redux/rtk/features/leadSource/leadSourceApi";

import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function UpdateLead({ data, onClose }) {
  const { id } = data;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users
  );

  const { data: leadSources, isLoading: leadSourceLoading } =
    useGetLeadSourcesQuery();

  const { data: singleLead, isLoading: leadLoading } = useGetLeadQuery(id);

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  useEffect(() => {
    if (singleLead) {
      form.setFieldsValue({
        ...singleLead,
      });
    }
  }, [form, singleLead]);

  const [updateLeads, { isLoading }] = useUpdateLeadMutation();
  const onFinish = async (values) => {
    const formData = {
      ...values,
    };

    const resp = await updateLeads({ id, values: formData });
    if (resp.data) {
      form.resetFields();
      onClose();
    }
  };

  return (
    <div className="mt-5">
      <UserPrivateComponent permission="update-lead" comment={"You don't have permission to update this action. To update this action you need ReadSingle Lead and Update Lead permissions."} type="update">
        <Form
          className="w-full"
          onFinish={onFinish}
          colon={false}
          layout="vertical"
          initialValues={singleLead}
          form={form}>
          <div className="w-full">
            {/* Row 1: First Name and Email */}
            <div className="flex gap-4">
              <Form.Item
                label="Name"
                name="name"
                className="flex-1"
                rules={[
                  { required: true, message: "First Name is Required." },
                ]}>
                <Input placeholder="First" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="flex-1"
                rules={[{ type: "email", message: "Invalid email address." }]}>
                <Input placeholder="example@email.com" />
              </Form.Item>
            </div>

            {/* Row 2: Phone Number and Lead Owner */}
            <div className="flex gap-4">
              <Form.Item label="Phone Number" name="phone" className="flex-1">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Lead Owner"
                name="leadOwnerId"
                className="flex-1">
                <Select
                  loading={staffLoading}
                  allowClear
                  showSearch
                  placeholder="Select lead owner">
                  {staffList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.username}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Row 3: Lead Value and Lead Status */}
            <div className="flex gap-4">
              <Form.Item label="Lead Value" name="leadValue" className="flex-1">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Lead Status"
                name="leadStatus"
                className="flex-1">
                <Select allowClear showSearch placeholder="Select lead status">
                  <Select.Option value={"new"}>{"New"}</Select.Option>
                  <Select.Option value={"contacted"}>
                    {"Contacted"}
                  </Select.Option>
                  <Select.Option value={"qualified"}>
                    {"Qualified"}
                  </Select.Option>
                  <Select.Option value={"lost"}>{"Lost"}</Select.Option>
                  <Select.Option value={"cancelled"}>
                    {"Cancelled"}
                  </Select.Option>
                  <Select.Option value={"working"}>{"Working"}</Select.Option>
                  <Select.Option value={"customer"}>{"Customer"}</Select.Option>
                </Select>
              </Form.Item>
            </div>

            {/* Row 4: Lead Source and Contact Status */}
            <div className="flex gap-4">
              <Form.Item
                label="Lead Source"
                name="leadSourceId"
                className="flex-1">
                <Select
                  loading={leadSourceLoading}
                  allowClear
                  showSearch
                  placeholder="Select lead source">
                  {leadSources?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* Action Buttons */}
          <Form.Item>
            <div className="flex items-center gap-2">
              <Button
                size="large"
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
