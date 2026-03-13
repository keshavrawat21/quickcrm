import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import {
  loadSingleTask,
  updateTask,
} from "@/redux/rtk/features/CRM/task/taskSlice";
import { loadAllTaskStatus } from "@/redux/rtk/features/CRM/taskStatus/taskStatusSlice";
import { loadAllTaskType } from "@/redux/rtk/features/CRM/taskType/taskTypeSlice";
import { loadAllQuote } from "@/redux/rtk/features/quote/quoteSlice";
import usePermissions from "@/utils/usePermissions";
import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export default function DetailsInfo({ data, loading }) {
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);
  const dispatch = useDispatch();
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
  const { list: taskTypeList, loading: taskTypeLoading } = useSelector(
    (state) => state.taskType
  );
  const { list: taskStatusList, loading: taskStatusLoading } = useSelector(
    (state) => state.taskStatus
  );

  const { permissions } = usePermissions();
  const canEdit = permissions?.includes("update-projectTask");

  // company profile edit form

  useEffect(() => {
    dispatch(loadAllTaskStatus());
    dispatch(loadAllTaskType());
    dispatch(loadAllContact());
    dispatch(loadAllCompany());
    dispatch(loadAllOpportunity());
    dispatch(loadAllQuote());
  }, [dispatch]);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      companyId: parseInt(values.companyId),
      contactId: parseInt(values.contactId),
      opportunityId: parseInt(values.opportunityId),
      quoteId: parseInt(values.quoteId),
      crmTaskStatusId: parseInt(values.crmTaskStatusId),
      taskTypeId: parseInt(values.taskTypeId),
    };

    const resp = await dispatch(updateTask({ id: data.id, values: formData }));
    if (resp.payload.message === "success") {
      dispatch(loadSingleTask(data.id));
      dispatch(apiSlice.util.invalidateTags(["Tasks"]));
      setTriggerSave(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setTriggerSave(false);
    form.resetFields();
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Card
        bordered={false}
        title={
          <span className="font-bold text-md dark:text-white">
            Task Details
          </span>
        }
        headStyle={{
          backgroundColor: "transparent",
          borderBottom: "1px solid #d9d9d9",
        }}
        bodyStyle={{
          padding: "16px",
        }}>
        {data && (
          <Form
            form={form}
            colon={false}
            disabled={!canEdit}
            layout="vertical"
            onFieldsChange={() => setTriggerSave(true)}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              contactId: data?.contactId || "",
              companyId: data?.companyId || "",
              opportunityId: data?.opportunityId || "",
              quoteId: data?.quoteId || "",
              taskTypeId: data?.taskTypeId || "",
              crmTaskStatusId: data?.crmTaskStatusId || "",
              description: data?.description || "",
              startDate: dayjs(data?.startDate) || "",
              endDate: dayjs(data?.endDate) || "",
            }}>
            {triggerSave && (
              <div className="flex items-center gap-4 mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
                <Button
                  loading={loading}
                  type="default"
                  onClick={onFinishFailed}>
                  Cancel
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Task Type" name="taskTypeId">
                <Select
                  placeholder="Select task type"
                  loading={taskTypeLoading}
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}>
                  {taskTypeList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.taskTypeName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Task Status" name="crmTaskStatusId">
                <Select
                  placeholder="Select task status"
                  loading={taskStatusLoading}
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}>
                  {taskStatusList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.taskStatusName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Company" name="companyId">
                <Select
                  placeholder="Select company"
                  loading={companyLoading}
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}>
                  {companyList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.companyName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Contact" name="contactId">
                <Select
                  placeholder="Select contact"
                  loading={contactLoading}
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}>
                  {contactList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.firstName} {item?.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Opportunity" name="opportunityId">
                <Select
                  placeholder="Select opportunity"
                  loading={opportunityLoading}
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}>
                  {opportunityList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.opportunityName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Quote" name="quoteId">
                <Select
                  placeholder="Select quote"
                  loading={quoteLoading}
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}>
                  {quoteList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.quoteName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Start Date" name="startDate">
                <DatePicker
                  className="w-full"
                  placeholder="Select start date"
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}
                />
              </Form.Item>

              <Form.Item label="End Date" name="endDate">
                <DatePicker
                  className="w-full"
                  placeholder="Select end date"
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}
                />
              </Form.Item>
            </div>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={3} placeholder="Enter task description" />
            </Form.Item>
          </Form>
        )}
      </Card>
    </>
  );
}
