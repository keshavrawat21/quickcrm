import React, { useEffect } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadAllIndustry } from "@/redux/rtk/features/CRM/industry/industrySlice";
import { loadAllCompanyType } from "@/redux/rtk/features/CRM/companyType/companyTypeSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import BigDrawer from "@/components/Drawer/BigDrawer";
import AddIndustry from "../Setup/CompanySetup/Industry/AddIndustry";
import AddCompanyType from "../Setup/CompanySetup/CompanyType/AddCompanyType";

const CompanyInformation = ({ company, form }) => {
  const { list: industryList, loading: industryLoading } = useSelector(
    (state) => state.industry
  );
  const { list: companyTypeList, loading: companyTypeLoading } = useSelector(
    (state) => state.companyType
  );
  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllIndustry());
    dispatch(loadAllCompanyType());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  useEffect(() => {
    if (company) {
      form.setFieldsValue({
        ...company,
      });
    }
  }, [company, form]);
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Company name"
            name="companyName"
            tooltip="This is a required field"
            rules={[{ required: true, message: "Company name is Required." }]}>
            <Input placeholder="XYZ Limited" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Company owner" name="companyOwnerId">
            <Select
              style={{ width: "100%" }}
              loading={ownerLoading}
              allowClear
              showSearch
              placeholder="Select company owner name">
              {ownerList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={
              <>
                Industry
                <BigDrawer title={"Industry"}>
                  <AddIndustry drawer={true} />
                </BigDrawer>
              </>
            }
            name="industryId">
            <Select
              style={{ width: "100%" }}
              loading={industryLoading}
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              placeholder="Select Industry">
              {industryList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.industryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={
              <>
                Company Type
                <BigDrawer title={"Company Type"}>
                  <AddCompanyType drawer={true} />
                </BigDrawer>
              </>
            }
            name="companyTypeId">
            <Select
              style={{ width: "100%" }}
              loading={companyTypeLoading}
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              placeholder="Select Company Type">
              {companyTypeList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.companyTypeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Add more rows for other fields */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Company size" name="companySize">
            <Input placeholder="10" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Annual revenue" name="annualRevenue">
            <Input placeholder="100000" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Phone" name="phone">
            <Input placeholder="+01 454884657" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" name="email">
            <Input placeholder="xyz@xyz.com" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Website" name="website">
            <Input placeholder="https://xyz.com" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Linkedin" name="linkedin">
            <Input placeholder="https://linkedin.com/in/xyz" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Twitter" name="twitter">
            <Input placeholder="https://twitter.com/xyz" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Instagram" name="instagram">
            <Input placeholder="https://instagram.com/xyz" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Facebook" name="facebook">
            <Input placeholder="https://facebook.com/xyz" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CompanyInformation;
