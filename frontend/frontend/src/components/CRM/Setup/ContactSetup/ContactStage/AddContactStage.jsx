import {
  addContactStage,
  loadAllContactStage,
  updateContactStage,
} from "@/redux/rtk/features/CRM/contactStage/contactStageSlice";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AddContactStage({ edit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const resp = await dispatch(
      edit?.id
        ? updateContactStage({ id: edit?.id, values })
        : addContactStage(values)
    );
    if (resp.payload.message === "success") {
      dispatch(loadAllContactStage());
      if (!edit?.id) {
        form.resetFields();
      }
    }
  };

  const onCancel = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (edit?.id) {
      form.setFieldsValue({ ...edit?.values });
    }
  }, [edit, form]);

  return (
    <div className='flex justify-center mt-5'>
      <Form
        className='w-4/5'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        colon={false}
        layout='vertical'
        form={form}
      >
        <Form.Item
          style={{ width: "350px" }}
          label='Contact Stage Name'
          name='contactStageName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "Product Name is Required." }]}
        >
          <Input placeholder='Contact stage name' />
        </Form.Item>

        <Form.Item label=''>
          <div className='flex items-center gap-2'>
            <Button size={"large"} htmlType='submit' type='primary'>
              {edit?.id ? "Update" : "Create"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
