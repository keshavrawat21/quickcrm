import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllRole } from "../../redux/rtk/features/hr/role/roleSlice";
import { loadAllDepartment } from "../../redux/rtk/features/hrm/department/departmentSlice";
import { loadAllDesignation } from "../../redux/rtk/features/hrm/designation/designationSlice";
import { loadAllEmployeeStatus } from "../../redux/rtk/features/hrm/employeeStatus/employeeStatusSlice";
import { loadAllShift } from "../../redux/rtk/features/hrm/shift/shiftSlice";
import {
  addStaff,
  loadAllStaff,
} from "../../redux/rtk/features/hrm/user/userSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddDepartment from "../HRM/Department/AddDepartment";
import AddDesignation from "../HRM/Designation/AddDesignation";
import AddEmploymentStatus from "../HRM/EmploymentStatus/AddEmploymentStatus";
import AddShift from "../HRM/Shift/AddShift";
import EmployeeEducationForm from "./EmployeeEducationForm";

const AddStaff = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { list } = useSelector((state) => state.role);
  const { list: department } = useSelector((state) => state.department);
  const { list: designation } = useSelector((state) => state.designations);
  const { list: employmentStatus } = useSelector(
    (state) => state.employmentStatus
  );
  const { list: shift } = useSelector((state) => state.shift);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoader(true);
    try {
      const resp = await dispatch(addStaff(values));

      if (resp.payload?.message === "success") {
        dispatch(loadAllStaff({ status: "true", count: 10, page: 1 }));
      }
      setLoader(false);
      form.resetFields();
    } catch (error) {
      setLoader(false);
    }
  };

  const onFinishFailed = () => {};

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

  useEffect(() => {
    dispatch(loadAllRole());
    dispatch(loadAllDepartment());
    dispatch(loadAllDesignation({ query: "all" }));
    dispatch(loadAllShift());
    dispatch(loadAllEmployeeStatus());
  }, [dispatch]);

  return (
    <>
      <div className="mr-top mt-5 p-5 ant-card " style={{ maxWidth: "100%" }}>
        <Form
          size="small"
          form={form}
          name="basic"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 22,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}>
            <Col span={12} className="gutter-row form-color">
              <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                User Information
              </h2>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="First Name"
                name="firstName">
                <Input placeholder="First" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Last Name"
                name="lastName">
                <Input placeholder="Last" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="User Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input User Name!",
                  },
                ]}>
                <Input placeholder="first_last" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password !",
                  },
                ]}>
                <Input placeholder="Strong Password" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Email"
                name="email">
                <Input placeholder="example@gmail.com" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Phone"
                name="phone">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                Address Information
              </h2>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Street"
                name="street">
                <Input
                  placeholder="123 Main Street"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="City"
                name="city">
                <Input placeholder="Los Angeles" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="State"
                name="state">
                <Input placeholder="CA" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Zip Code"
                name="zipCode">
                <Input placeholder="90211" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Country"
                name="country">
                <Input placeholder="USA" />
              </Form.Item>
            </Col>
          </Row>

          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}>
            <Col span={12} className="gutter-row">
              <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                {" "}
                Employee Information{" "}
              </h2>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Joining Date"
                name="joinDate">
                <DatePicker className="date-picker hr-staffs-date-picker" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Leave Date"
                name="leaveDate">
                <DatePicker className="date-picker hr-staffs-date-picker" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Employee ID"
                name="employeeId">
                <Input placeholder="OE-012" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Blood Group"
                name="bloodGroup">
                <Select
                  placeholder="Select Blood Group"
                  allowClear
                  mode="single"
                  size="middle"
                  style={{
                    width: "100%",
                  }}>
                  {bloodGroups.map((bloodGroup) => (
                    <Option key={bloodGroup} value={bloodGroup}>
                      {bloodGroup}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {/* TODO: Add a Upload Seciton for Image */}
              <Form.Item
                name={"employmentStatusId"}
                style={{ marginBottom: "10px" }}
                label={
                  <>
                    Employee Status
                    <BigDrawer title="new Employee Status">
                      <AddEmploymentStatus drawer="true" />
                    </BigDrawer>
                  </>
                }>
                <Select placeholder="Select Status" allowClear size={"middle"}>
                  {employmentStatus &&
                    employmentStatus.map((employmentStatus) => (
                      <Option
                        key={employmentStatus.id}
                        value={employmentStatus.id}>
                        {employmentStatus.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={"departmentId"}
                style={{ marginBottom: "10px" }}
                label={
                  <>
                    Department
                    <BigDrawer title="new Department">
                      <AddDepartment drawer="true" />
                    </BigDrawer>
                  </>
                }>
                <Select
                  loading={!department}
                  placeholder="Select Department"
                  allowClear
                  size={"middle"}>
                  {department &&
                    department.map((department) => (
                      <Option key={department.id} value={department.id}>
                        {department.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Role"
                rules={[
                  {
                    required: true,
                    message: "Please Select Role",
                  },
                ]}
                name={"roleId"}
                style={{ marginBottom: "10px" }}>
                <Select
                  loading={!list}
                  size="middle"
                  mode="single"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select">
                  {list &&
                    list.map((role) => (
                      <Option key={role.id} value={role.id}>
                        {role.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={
                  <>
                    Shift
                    <BigDrawer title="new Shift">
                      <AddShift drawer="true" />
                    </BigDrawer>
                  </>
                }
                name={"shiftId"}
                style={{ marginBottom: "10px" }}>
                <Select
                  loading={!shift}
                  size="middle"
                  mode="single"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select">
                  {shift &&
                    shift.map((shift) => (
                      <Option key={shift.id} value={shift.id}>
                        {shift.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                Designation & Salary Information
              </h2>

              <div></div>
              <Form.Item
                name={"designationId"}
                style={{ marginBottom: "15px" }}
                label={
                  <>
                    Designation
                    <BigDrawer title="Designation">
                      <AddDesignation drawer={true} />
                    </BigDrawer>
                  </>
                }>
                <Select
                  loading={!designation}
                  size="middle"
                  mode="single"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select Designation">
                  {designation &&
                    designation.map((designation) => (
                      <Option key={designation.id} value={designation.id}>
                        {designation.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Designation Start Date"
                name="designationStartDate">
                <DatePicker className="date-picker hr-staffs-date-picker" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Designation End Date"
                name="designationEndDate">
                <DatePicker className="date-picker hr-staffs-date-picker" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Salary"
                name="salary">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Salary Start Date"
                name="salaryStartDate"
                style={{ marginBottom: "10px" }}>
                <DatePicker className="date-picker hr-staffs-date-picker" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Salary End Date"
                name="salaryEndDate">
                <DatePicker className="date-picker hr-staffs-date-picker" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Salary Comment"
                name="salaryComment">
                <Input />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Commission Type"
                name="commissionType">
                <Select
                  loading={!list}
                  size="middle"
                  mode="single"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select">
                  <Option key={"percentage"} value={"percentage"}>
                    Percentage
                  </Option>
                  <Option key={"flat"} value={"flat"}>
                    Flat
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Commission Value"
                name="commissionValue">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <h2 className="text-center text-xl mt-3 mb-5 txt-color">
            Education Information
          </h2>

          <div className="text-center">
            <p className="text-red-500 text-base mb-4">
              Please add education information using the button below
            </p>
          </div>

          <Form.List name="education">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <EmployeeEducationForm
                    key={key}
                    name={name}
                    remove={remove}
                    restField={restField}
                  />
                ))}
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 4,
                    span: 16,
                  }}>
                  <Button
                    type="dashed"
                    size="middle"
                    style={{ color: "#fff", backgroundColor: "#2c3e50" }}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}>
                    Add Education Information
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            style={{ marginBottom: "10px", marginTop: "10px" }}
            wrapperCol={{
              offset: 4,
              span: 16,
            }}>
            <Button
              className="mt-5"
              size="large"
              block
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loader}>
              Add New Staff
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddStaff;
