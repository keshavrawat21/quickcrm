import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import {
  addEmail,
  loadAllEmailPaginated,
} from "@/redux/rtk/features/email/emailSlice";
import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { loadAllQuote } from "../../redux/rtk/features/quote/quoteSlice";
import TagInput from "../CommonUi/TagInput";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { textEditorFormats, textEditorModule } from "../Product/AddProduct";
import { loadAllEmailConfig } from "./../../redux/rtk/features/EmailConfig/EmailConfigSlice";
import { loadAllStaff } from "../../redux/rtk/features/hrm/user/userSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddCompany from "../CRM/Company/AddCompany";
import AddContact from "../CRM/Contact/AddContact";
import AddOpportunity from "../CRM/Opportunity/AddOpportunity";
import AddQuote from "../CRM/Quote/AddQuote";

// in this props data is coming from detailContact data
export default function AddEmail({ onClose, createAs, drawer, data }) {
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [body, setBody] = useState("");
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

  const { loading: emailLoading } = useSelector((state) => state.email);

  const { list: emailConfigList } = useSelector((state) => state.emailConfig);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const roleId = localStorage.getItem("roleId");

  useEffect(() => {
    dispatch(loadAllContact());
    dispatch(loadAllCompany());
    dispatch(loadAllOpportunity());
    dispatch(loadAllQuote());
    dispatch(loadAllStaff({ query: "all" }));
    dispatch(loadAllEmailConfig({}));
  }, [dispatch]);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      emailOwnerId: parseInt(values.emailOwnerId),
      companyId: parseInt(values.companyId),
      opportunityId: parseInt(values.opportunityId),
      contactId: parseInt(values.contactId),
      quoteId: parseInt(values.quoteId),
      cc,
      bcc,
      body,
    };

    const resp = await dispatch(addEmail(formData));
    if (resp.payload.message === "success") {
      form.resetFields();
      if (createAs?.name) {
        dispatch(createAs.singleLoadThunk(createAs.value));
      } else {
        dispatch(loadAllEmailPaginated({}));
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

  useEffect(() => {
    if (roleId) {
      form.setFieldsValue({
        emailOwnerId: parseInt(roleId),
      });
    }
  }, [form, roleId]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        receiverEmail: data?.email ? data?.email : "",
      });
    }
  }, [data, form]);

  return (
    <div className="flex justify-center mt-5">
      <UserPrivateComponent permission="create-email">
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
          <Form.Item
            style={{ width: "100%" }}
            label="From"
            name="emailConfigName"
            tooltip="This is a required field"
            rules={[{ required: true, message: "From Email is Required." }]}>
            <Select style={{ width: "100%" }} placeholder="From Email">
              {emailConfigList?.map((item) => (
                <Select.Option
                  key={item.emailConfigName}
                  value={item.emailConfigName}>
                  {item.emailUser}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            label="To"
            name="receiverEmail"
            tooltip="This is a required field"
            rules={[
              { required: true, message: "Receiver Email is Required." },
            ]}>
            <Input placeholder="Receiver Email" />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            label="Subject"
            name="subject"
            tooltip="This is a required field"
            rules={[{ required: true, message: "Subject is Required." }]}>
            <Input placeholder="Subject" />
          </Form.Item>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse mb-4">
            <Collapse.Panel header="CC & BCC" key="1">
              <TagInput label={"CC"} tags={cc} setTags={setCc} />

              <TagInput label={"BCC"} tags={bcc} setTags={setBcc} />
            </Collapse.Panel>
          </Collapse>

          <Form.Item style={{ marginBottom: "25px" }} label="Body" name="body">
            <ReactQuill
              value={body}
              onChange={(value) => setBody(value)}
              modules={textEditorModule}
              formats={textEditorFormats}
            />
          </Form.Item>
          <Form.Item label="Email owner" name={"emailOwnerId"}>
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

          <Form.Item label="">
            <div className="flex items-center gap-2">
              <Button
                size={"large"}
                htmlType="submit"
                type="primary"
                loading={emailLoading}>
                Create
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
