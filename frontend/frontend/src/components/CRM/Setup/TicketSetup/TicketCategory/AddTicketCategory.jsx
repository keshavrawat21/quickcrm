import { addTicketCategory, loadAllTicketCategory, updateTicketCategory } from "@/redux/rtk/features/CRM/ticketCategory/ticketCategorySlice";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddTicketCategory({ edit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ticketCategory);

  const onFinish = async (values) => {
    const resp = await dispatch(
      edit?.id
        ? updateTicketCategory({ id: edit?.id, values })
        : addTicketCategory(values)
    );
    if (resp.payload.message === "success") {
      dispatch(loadAllTicketCategory());
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
          style={{ width: "350px" }}
          label='Ticket Category Name'
          name='ticketCategoryName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "This is a required field." }]}
        >
          <Input placeholder='Ticket Category Name' />
        </Form.Item>

        <Form.Item label=''>
          <div className='flex items-center gap-2'>
            <Button
              size={"large"}
              htmlType='submit'
              type='primary'
              loading={loading}
            >
              {edit?.id ? "Update" : "Create"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
