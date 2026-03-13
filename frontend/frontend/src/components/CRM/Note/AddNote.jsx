import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import {
  addNote,
  loadAllNotePaginated,
} from "@/redux/rtk/features/CRM/note/noteSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllQuote } from "@/redux/rtk/features/quote/quoteSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BigDrawer from "@/components/Drawer/BigDrawer";
import AddCompany from "../Company/AddCompany";
import AddContact from "../Contact/AddContact";
import AddOpportunity from "../Opportunity/AddOpportunity";
import AddQuote from "../Quote/AddQuote";

export default function AddNote({ createAs, drawer }) {
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

  const { list: quoteList, loading: quoteLoading } = useSelector(
    (state) => state.quote
  );
  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const roleId = localStorage.getItem("roleId");

  useEffect(() => {
    dispatch(loadAllContact());
    dispatch(loadAllCompany());
    dispatch(loadAllOpportunity());
    dispatch(loadAllQuote());
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

    const resp = await dispatch(addNote(formData));
    if (resp.payload.message === "success") {
      form.resetFields();
      if (createAs) {
        dispatch(createAs.singleLoadThunk(createAs.id));
      } else {
        dispatch(loadAllNotePaginated({}));
      }
      setLoader(false);
    }
  };

  useEffect(() => {
    if (roleId) {
      form.setFieldsValue({
        noteOwnerId: parseInt(roleId),
      });
    }
  }, [form, roleId]);
  return (
    <div className="flex justify-center mt-5">
      <UserPrivateComponent permission="create-note">
        <Form
          className="w-4/5"
          onFinish={onFinish}
          layout="vertical"
          form={form}
          initialValues={createAs?.values}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              style={{ width: "100%" }}
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is Required." }]}>
              <Input placeholder="Note title" />
            </Form.Item>

            <Form.Item label="Note owner" name={"noteOwnerId"}>
              <Select
                style={{ width: "100%" }}
                loading={staffLoading}
                allowClear
                showSearch
                placeholder="Select note owner name">
                {staffList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item?.username}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <>
                  Company
                  <BigDrawer width={70} title={"Company"}>
                    <AddCompany drawer={true} />
                  </BigDrawer>
                </>
              }
              name="companyId">
              <Select
                style={{ width: "100%" }}
                loading={companyLoading}
                allowClear
                showSearch
                placeholder="Select company Name"
                disabled={!!(createAs?.name === "companyId")}>
                {companyList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.companyName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <>
                  Contact
                  {!drawer ? (
                    <BigDrawer width={70} title={"Contact"}>
                      <AddContact drawer={true} />
                    </BigDrawer>
                  ) : (
                    ""
                  )}
                </>
              }
              name="contactId">
              <Select
                style={{ width: "100%" }}
                loading={contactLoading}
                allowClear
                showSearch
                placeholder="Select contact"
                disabled={!!(createAs?.name === "contactId")}>
                {contactList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.fullName
                      ? item.fullName
                      : item.firstName + " " + item.lastName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <>
                  Opportunity
                  <BigDrawer title={"Opportunity"}>
                    <AddOpportunity drawer={true} />
                  </BigDrawer>
                </>
              }
              name="opportunityId">
              <Select
                style={{ width: "100%" }}
                loading={opportunityLoading}
                allowClear
                showSearch
                placeholder="Select opportunity"
                disabled={!!(createAs?.name === "opportunityId")}>
                {opportunityList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.opportunityName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <>
                  Quote
                  <BigDrawer width={70} title={"Quote"}>
                    <AddQuote drawer={true} />
                  </BigDrawer>
                </>
              }
              name="quoteId">
              <Select
                style={{ width: "100%" }}
                loading={quoteLoading}
                allowClear
                showSearch
                placeholder="Select quote"
                disabled={!!(createAs?.name === "quoteId")}>
                {quoteList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.quoteName}
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
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </UserPrivateComponent>
    </div>
  );
}
