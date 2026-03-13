import { sendEmail } from "@/redux/rtk/features/hrm/emailConfig/emailConfigSlice";
import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input } from "antd";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import TagInput from "../CommonUi/TagInput";
import { textEditorFormats, textEditorModule } from "../Product/AddProduct";

export default function SendEmail({ setSendEmail, data }) {
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const subject = `Supplier Ledger - ${companyInfo?.companyName}`;
  const body = `
    <div>
      <p>Dear <strong>${data?.name}</strong>,</p>
      <p>Greetings! We trust this message reaches you in great spirits.</p>
    </div>
    <br>
    <p>Here is the summary of your accounts:</p>
    <br>
    <div>
      Total Amount: ${data?.totalAmount}<br>
      Paid Amount: ${data?.totalPaidAmount}<br>
      Return Amount: ${data?.totalReturnAmount}<br>
      Due Amount: ${data?.dueAmount}
    </div>
    <br>
    <div>
      Total invoice count: ${data?.totalPurchaseInvoice}<br>
      Total return invoice count: ${data?.totalReturnPurchaseInvoice}
    </div>
    <br>
    <div >
      Best Regards,<br>
      <strong>${companyInfo?.companyName}</strong><br>
      ${companyInfo?.phone}<br>
      ${companyInfo?.email}
    </div>
  `;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [localBody, setLocalBody] = useState(body);

  const onFinish = async (values) => {
    setLoader(true);

    try {
      let formData = new FormData();
      values.receiverEmail &&
        formData.append("receiverEmail", values.receiverEmail);
      values.subject && formData.append("subject", values.subject);
      localBody && formData.append("body", localBody);

      cc.length > 0 && formData.append("cc[]", cc);
      bcc.length > 0 && formData.append("bcc[]", bcc);

      const resp = await dispatch(sendEmail(formData));
      if (resp.payload.message === "success") {
        setSendEmail(false);
        setLoader(false);
        form.resetFields();
        setCc([]);
        setBcc([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const onFinishFailed = () => {};

  const handleBody = (val) => {
    setLocalBody(val);
  };
  return (
    <>
      <div className={"py-4 px-4 border-t"}>
        <div className='flex justify-between'>
          <p className=''></p>
          <button
            onClick={() => setSendEmail(false)}
            className='bg-red-100 p-1 rounded text-red-500'
          >
            <IoClose size={20} />
          </button>
        </div>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          colon={false}
          layout='vertical'
          form={form}
          initialValues={{
            subject: subject,
            body: body,
            receiverEmail: data.email || "",
          }}
        >
          <Form.Item
            style={{ width: "100%" }}
            label='To'
            rules={[
              { required: true, message: "Please input receiver email!" },
            ]}
            name='receiverEmail'
          >
            <Input placeholder='Receiver Email' />
          </Form.Item>

          <Collapse
            bordered={false}
            defaultActiveKey={["0"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className='site-collapse-custom-collapse mb-4 '
          >
            <Collapse.Panel header='CC & BCC' key='1'>
              <TagInput label={"CC"} tags={cc} setTags={setCc} />

              <TagInput label={"BCC"} tags={bcc} setTags={setBcc} />
            </Collapse.Panel>
          </Collapse>

          <Form.Item style={{ width: "100%" }} label='Subject' name='subject'>
            <Input placeholder='Subject' />
          </Form.Item>
          <Form.Item style={{ marginBottom: "25px" }} label='Body'>
            <ReactQuill
              value={localBody}
              onChange={handleBody}
              modules={textEditorModule}
              formats={textEditorFormats}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loader}
              size={"large"}
              htmlType='submit'
              type='primary'
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
