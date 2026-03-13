import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { useAddProjectMutation } from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { loadAllPriority } from "@/redux/rtk/features/priority/prioritySlice";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddProject() {
  const dispatch = useDispatch();
  const { list, loading: listLoading } = useSelector((state) => state.users);
  const { list: contact, loading: contactLoading } = useSelector(
    (state) => state.contact
  );
  const { list: priority, loading: priorityLoading } = useSelector(
    (state) => state.priority
  );
  const [addSingleProject, { isLoading }] = useAddProjectMutation();
  const [form] = Form.useForm();
  const roleId = localStorage.getItem("roleId");

  const onFinish = async (values) => {
    const projectData = {
      ...values,
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await addSingleProject(projectData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
    dispatch(loadAllContact());
    dispatch(loadAllPriority());
  }, [dispatch]);

  useEffect(() => {
    if (roleId) {
      form.setFieldsValue({
        projectManagerId: parseInt(roleId),
      });
    }
  }, [form, roleId]);
  return (
    <>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="mx-4">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Project Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Enter Project Name",
              },
            ]}>
            <Input placeholder="Enter Project Name" />
          </Form.Item>

          <Form.Item label="Project Manager" name="projectManagerId">
            <Select
              loading={listLoading}
              mode="single"
              showSearch
              placeholder="Select Contact"
              optionFilterProp="children">
              {list?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.firstName} {item.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Contact" name="contactId">
            <Select
              loading={contactLoading}
              mode="single"
              showSearch
              placeholder="Select Contact"
              optionFilterProp="children">
              {contact?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.firstName} {item.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Project Status" name={"projectStatus"}>
            <Select
              style={{ width: "100%" }}
              allowClear
              showSearch
              placeholder="Status">
              <Select.Option value={"not-started"}>
                {"Not Started"}
              </Select.Option>
              <Select.Option value={"in-progress"}>
                {"In Progress"}
              </Select.Option>
              <Select.Option value={"on-hold"}>{"On Hold"}</Select.Option>
              <Select.Option value={"cancelled"}>{"Cancelled"}</Select.Option>
              <Select.Option value={"finished"}>{"Finished"}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Priority" name="priorityId">
            <Select
              loading={priorityLoading}
              mode="single"
              showSearch
              placeholder="Select Project Priority"
              optionFilterProp="children">
              {priority?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Project Value" name="projectValue">
            <InputNumber size="small" />
          </Form.Item>

          <Form.Item label="Start Date" name="startDate">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Deadline" name="endDate">
            <DatePicker />
          </Form.Item>
        </div>
        <Form.Item label="Project Description" name="description">
          <Input.TextArea placeholder="Enter Project Description" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 12,
          }}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            loading={isLoading}>
            Add Project
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
