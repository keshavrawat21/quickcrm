import Loader from "@/components/Loader/Loader";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";

import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { loadAllPriority } from "@/redux/rtk/features/priority/prioritySlice";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProject({ drawer, data, onClose }) {
  const projectId = data;
  const dispatch = useDispatch();
  const { list: userList, loading: isLoading } = useSelector(
    (state) => state.users
  );
  const { list: contact, loading: contactLoading } = useSelector(
    (state) => state.contact
  );
  const { list: priority, loading: priorityLoading } = useSelector(
    (state) => state.priority
  );
  const { data: project } = useGetProjectQuery(projectId);
  const [updateSingleProject, { isLoading: addLoading }] =
    useUpdateProjectMutation();
  const [initialState, setInitialState] = useState(null);

  useEffect(() => {
    if (project) {
      setInitialState({
        ...project,
        startDate: dayjs(project.startDate),
        endDate: dayjs(project.endDate),
      });
    }
  }, [project]);

  const { Title } = Typography;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const projectData = {
      ...values,
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await updateSingleProject({
      id: projectId,
      values: projectData,
    });

    if (resp.data) {
      onClose();
    }
  };

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
    dispatch(loadAllContact());
    dispatch(loadAllPriority());
  }, [dispatch]);

  return (
    <>
    <UserPrivateComponent permission={"update-project"} type="update">
      {initialState ? (
        <Form
          form={form}
          style={{ marginBottom: "40px" }}
          eventKey="shift-form"
          name="basic"
          initialValues={initialState}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 12,
          }}
          onFinish={onFinish}
          autoComplete="off">
          <div>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label="Project Manager"
              name="projectManagerId">
              <Select
                loading={isLoading}
                mode="single"
                showSearch
                placeholder="Select Project Manager"
                optionFilterProp="children">
                {userList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.firstName} {item.lastName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label="Project Name"
              name="name">
              <Input placeholder="Enter Project Name" />
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

            <Form.Item
              style={{ marginBottom: "10px" }}
              label="Start Date"
              name="startDate">
              <DatePicker />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "20px" }}
              label="End Date"
              name="endDate">
              <DatePicker />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "20px" }}
              label="Project Description"
              name="description">
              <Input.TextArea placeholder="Enter Project Description" />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              wrapperCol={{
                offset: 8,
                span: 12,
              }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                loading={addLoading}>
                Update Project
              </Button>
            </Form.Item>
          </div>
        </Form>
      ) : (
        <Loader />
      )}
    </UserPrivateComponent>
    </>
  );
}
