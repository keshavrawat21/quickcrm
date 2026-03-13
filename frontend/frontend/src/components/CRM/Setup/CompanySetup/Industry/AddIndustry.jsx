import {
  addIndustry,
  loadAllIndustry,
  updateIndustry,
} from "@/redux/rtk/features/CRM/industry/industrySlice";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AddIndustry({ edit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const resp = await dispatch(
      edit?.id ? updateIndustry({ id: edit?.id, values }) : addIndustry(values)
    );
    if (resp.payload.message === "success") {
      dispatch(loadAllIndustry());
      if (!edit?.id) {
        form.resetFields();
      }
    }
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
        colon={false}
        layout='vertical'
        initialValues={edit?.id ? { ...edit?.values } : {}}
        form={form}
      >
        <Form.Item
          style={{ width: "350px" }}
          label='Industry Name'
          name='industryName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "Field Required." }]}
        >
          <Input placeholder='Company Type name' />
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
