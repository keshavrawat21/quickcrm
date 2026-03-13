import Loader from "@/components/Loader/Loader";
import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";
import { loadAllContactPaginated } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import {
  deleteTask,
  loadSingleTask,
  updateTask,
} from "@/redux/rtk/features/CRM/task/taskSlice";
import { loadAllTaskStatus } from "@/redux/rtk/features/CRM/taskStatus/taskStatusSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { loadAllPriority } from "@/redux/rtk/features/priority/prioritySlice";
import usePermissions from "@/utils/usePermissions";
import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskProfile({ data, loading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);

  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users
  );
  const { list: priorityList, loading: priorityLoading } = useSelector(
    (state) => state.priority
  );

  const { permissions } = usePermissions();
  const canEdit = permissions?.includes("update-projectTask");

  // delete task
  const onDelete = async () => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const resp = await dispatch(deleteTask({ id }));
      if (resp.payload.message === "success") {
        navigate(-1);
        dispatch(loadAllContactPaginated({}));
      }
    }
  };

  // contact profile edit form

  const onFinish = async (values) => {
    const formData = {
      ...values,
      assigneeId: parseInt(values.assigneeId),
      opportunityId: parseInt(values.opportunityId),
      priorityId: parseInt(values.priorityId),
      taskStatusId: parseInt(values.taskStatusId),
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

  useEffect(() => {
    dispatch(loadAllOpportunity());
    dispatch(loadAllPriority());
    dispatch(loadAllTaskStatus());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  return (
    <>
      {data ? (
        <Card
          bordered={false}
          title={
            <span className="font-bold text-md dark:text-white">
              Task Profile
            </span>
          }
          headStyle={{
            backgroundColor: "transparent",
            borderBottom: "1px solid #d9d9d9",
          }}
          bodyStyle={{
            padding: "16px",
          }}>
          <Form
            form={form}
            colon={false}
            disabled={!canEdit}
            layout="vertical"
            onFieldsChange={() => setTriggerSave(true)}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              name: data?.name || "",
              assigneeId: data?.assigneeId || "",
              opportunityId: data?.opportunityId || "",
              taskStatusId: data?.taskStatusId || "",
              priorityId: data?.priorityId || "",
            }}>
            {/* Task Name Display */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Task Name
                  </span>
                  <span className="font-bold text-lg dark:text-white">
                    {data.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {triggerSave && (
                    <div className="flex items-center gap-2">
                      <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        size="small">
                        Save
                      </Button>
                      <Button
                        type="default"
                        onClick={onFinishFailed}
                        size="small">
                        Cancel
                      </Button>
                    </div>
                  )}
                  <Button danger onClick={onDelete} size="small">
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <Form.Item label="Task Name" name="name">
                <Input
                  placeholder="Enter task name"
                  suffix={<BsFillPencilFill className="text-gray-400" />}
                />
              </Form.Item>

              <Form.Item
                label="Assignee"
                name="assigneeId"
                tooltip="Change the assignee of this Task">
                <Select
                  placeholder="Select assignee"
                  loading={ownerLoading}
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}>
                  {ownerList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.firstName} {item?.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Task Priority" name="priorityId">
                <Select
                  placeholder="Select priority"
                  loading={priorityLoading}
                  suffixIcon={<BsFillPencilFill className="text-gray-400" />}>
                  {priorityList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Form>
        </Card>
      ) : (
        <Loader />
      )}
    </>
  );
}
