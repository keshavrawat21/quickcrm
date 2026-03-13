import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { updateNote } from "@/redux/rtk/features/CRM/note/noteSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NoteUpdate({ onCancel, onClose, id, note, load }) {
  // selector
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company
  );
  const { list: contactList, loading: contactLoading } = useSelector(
    (state) => state.contact
  );
  const { list: opportunityList, loading: opportunityLoading } = useSelector(
    (state) => state.opportunity
  );

  //   const { list: quoteList, loading: quoteLoading } = useSelector(
  //     (state) => state.quote
  //   );
  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users
  );
  const [loader, setLoader] = useState(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllContact());
    dispatch(loadAllCompany());
    dispatch(loadAllOpportunity());
    // dispatch(loadAllQuote());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  const onFinish = async (values) => {
    setLoader(true);
    const formData = {
      ...values,
      noteOwnerId: parseInt(values.noteOwnerId),
      companyId: parseInt(values.companyId),
      opportunityId: parseInt(values.opportunityId),
      contactId: parseInt(values.contactId),
      quoteId: parseInt(values.quoteId),
    };

    const resp = await dispatch(updateNote({ id, values: formData }));
    if (resp.payload.message === "success") {
      form.resetFields();
      load && load();
      onClose();
    }
    setLoader(false);
  };

  useEffect(() => {
    form.setFieldsValue(note);
  }, [form, note]);

  return (
    <div className="flex justify-center mt-5">
      <UserPrivateComponent permission="update-note" type="update">
        <Form
          className="w-4/5"
          onFinish={onFinish}
          colon={false}
          layout="vertical"
          form={form}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              style={{ width: "100%" }}
              label="Title"
              name="title"
              tooltip="This is a required field"
              rules={[{ required: true, message: "Title is Required." }]}>
              <Input placeholder="Note title" />
            </Form.Item>

            <Form.Item
              label="Note owner"
              name={"noteOwnerId"}
              tooltip="This is a required field"
              rules={[{ required: true, message: "Owner is Required." }]}>
              <Select
                style={{ width: "100%" }}
                loading={staffLoading}
                allowClear
                showSearch
                placeholder="Select note owner name">
                {staffList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item?.firstName} {item?.lastName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Company" name="companyId">
              <Select
                style={{ width: "100%" }}
                loading={companyLoading}
                allowClear
                showSearch
                placeholder="Select company Name">
                {companyList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.companyName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Contact" name="contactId">
              <Select
                style={{ width: "100%" }}
                loading={contactLoading}
                allowClear
                showSearch
                placeholder="Select contact">
                {contactList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.firstName} {item.lastName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Opportunity" name="opportunityId">
              <Select
                style={{ width: "100%" }}
                loading={opportunityLoading}
                allowClear
                showSearch
                placeholder="Select opportunity">
                {opportunityList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.opportunityName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Describe about contact" />
          </Form.Item>

          <Form.Item label="">
            <div className="flex items-center gap-2">
              <Button
                loading={loader}
                size={"large"}
                htmlType="submit"
                type="primary">
                Update
              </Button>
              <Button
                className="text-white"
                size={"large"}
                htmlType="submit"
                type="danger"
                onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </UserPrivateComponent>
    </div>
  );
}
