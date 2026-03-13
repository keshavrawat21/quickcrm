import {
  addCompanyType,
  loadAllCompanyType,
  updateCompanyType,
} from "@/redux/rtk/features/CRM/companyType/companyTypeSlice";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AddCompanyType({ edit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const resp = await dispatch(
      edit?.id
        ? updateCompanyType({ id: edit?.id, values })
        : addCompanyType(values)
    );
    if (resp.payload.message === "success") {
      form.resetFields();
      dispatch(loadAllCompanyType());
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
        form={form}
      >
        <Form.Item
          style={{ width: "350px" }}
          label='Company Type Name'
          name='companyTypeName'
          tooltip='This is a required field'
          rules={[
            { required: true, message: "Company Type Name is Required." },
          ]}
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
