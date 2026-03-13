import Button from "@/UI/Button";
import {
  addContactSource,
  loadAllContactSource,
  updateContactSource,
} from "@/redux/rtk/features/CRM/contactSource/contactSourceSlice";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AddContactSource({ edit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const resp = await dispatch(
      edit?.id
        ? updateContactSource({ id: edit?.id, values })
        : addContactSource(values)
    );
    if (resp.payload.message === "success") {
      dispatch(loadAllContactSource());
      if (!edit?.id) {
        form.resetFields();
      }
    }
  };


  useEffect(() => {
    if (edit?.id) {
      form.setFieldsValue(edit?.values);
    }
  }, [edit, form]);

  return (
    <div className='flex justify-center mt-5'>
      <Form
        className='w-4/5'
        onFinish={onFinish}
        colon={false}
        layout='vertical'
        form={form}
      >
        <Form.Item
          label='Contact Source Name'
          name='contactSourceName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "Product Name is Required." }]}
        >
          <Input placeholder='Contact Source name' />
        </Form.Item>

        <Form.Item label=''>
          <div className='flex items-center justify-center gap-2'>
            <Button
              type='submit'
              className='w-auto min-w-[200px]'
              color='primary'
            >
              {edit?.id ? "Update" : "Create"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
