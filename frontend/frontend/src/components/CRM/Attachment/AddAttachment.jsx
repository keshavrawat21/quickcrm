import ImageUploader from "@/UI/ImageUploader";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  addSingleAttachment,
  loadAllAttachmentPaginated,
} from "@/redux/rtk/features/CRM/attachment/attachmentSlice";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllQuote } from "@/redux/rtk/features/quote/quoteSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, Form, Select } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import BigDrawer from "@/components/Drawer/BigDrawer";
import AddCompany from "../Company/AddCompany";
import AddContact from "../Contact/AddContact";
import AddOpportunity from "../Opportunity/AddOpportunity";
import AddQuote from "../Quote/AddQuote";

export default function AddAttachment({ onClose, createAs, drawer }) {
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

  const { loading: attachmentLoading } = useSelector(
    (state) => state.attachment
  );

  const { list: quoteList, loading: quoteLoading } = useSelector(
    (state) => state.quote
  );
  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users
  );
  const { loading: noteLoading } = useSelector((state) => state.note);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [attachment, setAttachment] = useState([]);
  const roleId = localStorage.getItem("roleId");
  useEffect(() => {
    dispatch(loadAllContact());
    dispatch(loadAllCompany());
    dispatch(loadAllOpportunity());
    dispatch(loadAllQuote());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  const onFinish = async (values) => {
    if (attachment.length === 0) {
      toast.error("Please Select Attachment");
      return;
    }
    const data = {
      ...values,
      attachmentPath: attachment[0]?.id,
      attachmentName: attachment[0]?.fileName,
    };
    const resp = await dispatch(addSingleAttachment(data));
    if (resp.payload.message === "success") {
      form.resetFields();
      if (createAs?.name) {
        dispatch(createAs.singleLoadThunk(createAs.value));
      } else {
        dispatch(
          loadAllAttachmentPaginated({
            page: 1,
            count: 10,
          })
        );
      }
      onClose();
    }
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (fileList) => {
    setAttachment(fileList);
  };

  useEffect(() => {
    if (roleId) {
      form.setFieldsValue({
        attachmentOwnerId: parseInt(roleId),
      });
    }
  }, [form, roleId]);
  return (
    <div className="flex justify-center mt-5">
      <UserPrivateComponent permission="create-attachment">
        <Form
          className="w-4/5"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          colon={false}
          layout="vertical"
          form={form}
          initialValues={
            createAs
              ? {
                  [createAs?.name]: createAs?.value,
                }
              : {}
          }>
          <Form.Item label="Attachment path" name={"attachmentPath"} required>
            <ImageUploader images={attachment} setImages={onChange} />
          </Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Attachment owner"
              name={"attachmentOwnerId"}
              tooltip="This is a required field">
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
                disabled={createAs?.name === "companyId"}>
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
                disabled={createAs?.name === "contactId"}>
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
                disabled={createAs?.name === "opportunityId"}>
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
                disabled={createAs?.name === "quoteId"}>
                {quoteList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.quoteName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="">
            <div className="flex items-center gap-2">
              <Button
                size={"large"}
                htmlType="submit"
                type="primary"
                loading={attachmentLoading}>
                Create
              </Button>
              <Button
                className="text-white"
                loading={noteLoading}
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
