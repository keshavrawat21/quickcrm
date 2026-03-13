import {
  addTicketComment,
  loadAllTicketCommentByTicketId,
} from "@/redux/rtk/features/CRM/ticketComment/ticketCommentSlice";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const { Dragger } = Upload;

const CreateCommentForm = ({ setIsModalOpen }) => {
  const { loading } = useSelector((state) => state.ticketComment);
  const { id } = useParams("id");

  // const id = 1;

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("ticketId", parseInt(id));
      formData.append("description", values.description);

      if (values.files) {
        for (let i = 0; i < values.files.length; i++) {
          formData.append("files[]", values.files[i].originFileObj);
        }
      }

      const resp = await dispatch(addTicketComment(formData));
      if (resp.payload.message === "success") {
        dispatch(loadAllTicketCommentByTicketId(id));
        form.resetFields();
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleUpload = () => {
    message.success(`File added successfully`);
  };

  return (
    <>
      <div className="max-w-screen-md mx-auto mt-1">
        <Form
          name="ticketForm"
          className="w-full rounded-lg"
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter the description",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="In the ticket" />
          </Form.Item>

          <Form.Item
            name="files"
            label="Attachments"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Dragger
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              multiple={true}
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Drag and drop a files or click to select a files
              </p>
              <p className="ant-upload-hint">
                Supported files types: PNG, JPG, JPEG, PDF
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateCommentForm;
