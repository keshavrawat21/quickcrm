import Loader from "@/components/Loader/Loader";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";

import { Button, Col, Form, Row, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateStatus() {
  const projectId = useParams("id").id;
  const [initialValues, setInitialValues] = useState(null);
  const { data: project } = useGetProjectQuery(projectId);
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  useEffect(() => {
    if (project) {
      setInitialValues(project);
    }
  }, [project]);

  const { Title } = Typography;
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const resp = await updateProject({ id: projectId, values: values });

    if (resp) {
      form.resetFields();
      navigate(-1);
    }
  };

  return (
    <>
      <Row className="mt-[25px]" justify="center">
        <Col
          xs={22}
          sm={20}
          md={18}
          lg={16}
          xl={14}
          xxl={12}
          className="column-design border rounded card-custom">
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            Update Status
          </Title>
          {initialValues ? (
            <Form
              form={form}
              style={{ marginBottom: "40px", padding: "0 16px" }}
              eventKey="shift-form"
              name="basic"
              initialValues={initialValues}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off">
              <div>
                <Form.Item
                  style={{ marginBottom: "20px" }}
                  label="Project Status"
                  name="projectStatus"
                  rules={[
                    {
                      required: true,
                      message: "Select Status Name",
                    },
                  ]}>
                  <Select placeholder="Select Status Name" size="large">
                    <Select.Option value={"not-started"}>
                      {"Not Started"}
                    </Select.Option>
                    <Select.Option value={"in-progress"}>
                      {"In Progress"}
                    </Select.Option>
                    <Select.Option value={"on-hold"}>{"On Hold"}</Select.Option>
                    <Select.Option value={"cancelled"}>
                      {"Cancelled"}
                    </Select.Option>
                    <Select.Option value={"finished"}>
                      {"Finished"}
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item style={{ marginBottom: "10px" }}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    loading={isLoading}>
                    Update Now
                  </Button>
                </Form.Item>
              </div>
            </Form>
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
    </>
  );
}
