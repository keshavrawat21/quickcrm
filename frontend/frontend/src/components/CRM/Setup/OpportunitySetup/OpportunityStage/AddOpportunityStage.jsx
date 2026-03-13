import {
  addOpportunityStage,
  loadAllOpportunityStage,
  updateOpportunityStage,
} from "@/redux/rtk/features/CRM/opportunityStage/opportunityStageSlice";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AddOpportunityStage({ edit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const resp = await dispatch(
      edit?.id
        ? updateOpportunityStage({ id: edit?.id, values })
        : addOpportunityStage(values)
    );
    if (resp.payload.message === "success") {
      dispatch(loadAllOpportunityStage());
      if (!edit?.id) {
        form.resetFields();
      }
    }
  };

  useEffect(() => {
    if (edit?.id) {
      form.setFieldsValue(edit.values);
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
          label='Opportunity Stage Name'
          name='opportunityStageName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "This is a required field." }]}
        >
          <Input placeholder='Opportunity stage name' />
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
