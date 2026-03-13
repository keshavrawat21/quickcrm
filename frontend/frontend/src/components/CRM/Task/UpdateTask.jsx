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
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, DatePicker, Drawer, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPriority } from "@/redux/rtk/features/priority/prioritySlice";
import dayjs from "dayjs";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";

function UpdateTaskForm({ onClose, task, id }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

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

  const { list: priorityList, loading: priorityLoading } = useSelector(
    (state) => state.priority
  );
  const { list: taskTypeList, loading: taskTypeLoading } = useSelector(
    (state) => state.taskType
  );
  const { list: taskStatusList, loading: taskStatusLoading } = useSelector(
    (state) => state.taskStatus
  );

  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(loadAllPriority());
    dispatch(loadAllTaskStatus());
    dispatch(loadAllTaskType());
    dispatch(loadAllContact());
    dispatch(loadAllCompany());
    dispatch(loadAllOpportunity());
    dispatch(loadAllQuote());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);
  const onFinish = async (values) => {
    const formData = {
      ...values,
      assigneeId: parseInt(values.assigneeId),
      companyId: parseInt(values.companyId),
      contactId: parseInt(values.contactId),
      opportunityId: parseInt(values.opportunityId),
      quoteId: parseInt(values.quoteId),
      priorityId: parseInt(values.priorityId),
      crmTaskStatusId: parseInt(values.crmTaskStatusId),
      taskTypeId: parseInt(values.taskTypeId),
    };

    const resp = await dispatch(updateTask({ id, values: formData }));
    if (resp.payload.message === "success") {
      dispatch(loadSingleTask(id));
      onClose();
    }
  };

  const onFinishFailed = (errorInfo) => {
    form.resetFields();
    console.log("Failed:", errorInfo);
    onClose();
  };

  return (
    <>
      <UserPrivateComponent permission={"update-projectTask"}>
        <div className="flex justify-center mt-5">
          <Form
            className="w-4/5"
            form={form}
            colon={false}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              name: task?.name || "",
              assigneeId: task?.assigneeId || "",
              contactId: task?.contactId || "",
              companyId: task?.companyId || "",
              opportunityId: task?.opportunityId || "",
              quoteId: task?.quoteId || "",
              taskTypeId: task?.taskTypeId || "",
              crmTaskStatusId: task?.crmTaskStatusId || "",
              priorityId: task?.priorityId || "",
              description: task?.description || "",
              startDate: dayjs(task?.startDate) || "",
              endDate: dayjs(task?.endDate) || "",
            }}
          >
            <div>
              <Form.Item
                style={{ width: "100%" }}
                label="Task Name"
                name={"name"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                className="flex flex-col"
                label="Assign"
                name={"assigneeId"}
                tooltip="Change the owner of this Task"
              >
                <Select style={{ width: "100%" }} loading={ownerLoading}>
                  {ownerList.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.firstName} {item?.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Start date" name={"startDate"}>
                <DatePicker />
              </Form.Item>
              <Form.Item label="End date" name={"endDate"}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                className="flex flex-col"
                label="Task Type"
                name={"taskTypeId"}
                tooltip="Change the task type of this task"
              >
                <Select style={{ width: "100%" }} loading={taskTypeLoading}>
                  {taskTypeList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.taskTypeName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className="flex flex-col"
                label="Task Priority"
                name={"priorityId"}
                tooltip="Change the task priority of this task"
              >
                <Select style={{ width: "100%" }} loading={priorityList}>
                  {priorityList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className="flex flex-col"
                label="Task Status"
                name={"crmTaskStatusId"}
                tooltip="Change the task status of this task"
              >
                <Select style={{ width: "100%" }} loading={taskStatusLoading}>
                  {taskStatusList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.taskStatusName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="flex flex-col"
                label="Company"
                name={"companyId"}
                tooltip="Change the company of this task"
              >
                <Select style={{ width: "100%" }} loading={companyLoading}>
                  {companyList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.companyName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="flex flex-col"
                label="Contact"
                name={"contactId"}
                tooltip="Change the contact of this task"
              >
                <Select style={{ width: "100%" }} loading={contactLoading}>
                  {contactList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.firstName} {item?.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className="flex flex-col"
                label="Opportunity"
                name={"opportunityId"}
                tooltip="Change the opportunity of this task"
              >
                <Select style={{ width: "100%" }} loading={opportunityLoading}>
                  {opportunityList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.opportunityName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className="flex flex-col"
                label="Quote"
                name={"quoteId"}
                tooltip="Change the quote of this task"
              >
                <Select style={{ width: "100%" }} loading={quoteLoading}>
                  {quoteList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.quoteName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ width: "100%" }}
                label="Description"
                name={"description"}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item>
              <div className="flex items-center justify-evenly gap-3">
                <Button block type="primary" htmlType="submit">
                  Save
                </Button>
                <Button block type="danger" onClick={onFinishFailed}>
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </UserPrivateComponent>
    </>
  );
}

export default function UpdateTask({ open, onClose, id, task }) {
  return (
    <>
      <Drawer
        width={window.innerWidth <= 768 ? "100%" : "35%"}
        title="Update Task"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <UpdateTaskForm onClose={onClose} id={id} task={task} />
      </Drawer>
    </>
  );
}
