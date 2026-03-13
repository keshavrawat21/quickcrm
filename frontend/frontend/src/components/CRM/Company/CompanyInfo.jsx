import {
  loadSingleCompany,
  updateCompany,
} from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllCompanyType } from "@/redux/rtk/features/CRM/companyType/companyTypeSlice";
import { loadAllIndustry } from "@/redux/rtk/features/CRM/industry/industrySlice";
import usePermissions from "@/utils/usePermissions";
import { Button, Card, Form, Input, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CompanyInfo({ data, loading }) {
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);
  const dispatch = useDispatch();

  const { list: companyType, loading: companyTypeLoading } = useSelector(
    (state) => state.companyType
  );

  const { list: industryList, loading: industryLoading } = useSelector(
    (state) => state.industry
  );

  const { permissions } = usePermissions();
  const canEdit = permissions?.includes("update-company");

  const onFinish = async (values) => {
    const formData = {
      ...values,
      companySize: parseInt(values.companySize),
      annualRevenue: parseInt(values.annualRevenue),
    };

    const resp = await dispatch(
      updateCompany({ id: data.id, values: formData })
    );
    if (resp.payload.message === "success") {
      dispatch(loadSingleCompany(data.id));
      setTriggerSave(false);
    }
  };

  const onFinishFailed = () => {
    setTriggerSave(false);
    form.resetFields();
  };

  useEffect(() => {
    dispatch(loadAllCompanyType());
    dispatch(loadAllIndustry());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        companyName: data.companyName || "",
        website: data.website || "",
        phone: data.phone || "",
        email: data.email || "",
        companyOwnerId: data.companyOwnerId || "",
        companyTypeId: data.companyTypeId || "",
        industryId: data.industryId || "",
        companySize: data.companySize || "",
        annualRevenue: data.annualRevenue || "",
        billingStreet: data.billingStreet || "",
        billingCity: data.billingCity || "",
        billingState: data.billingState || "",
        billingCountry: data.billingCountry || "",
        billingZipCode: data.billingZipCode || "",
        shippingStreet: data.shippingStreet || "",
        shippingCity: data.shippingCity || "",
        shippingState: data.shippingState || "",
        shippingCountry: data.shippingCountry || "",
        shippingZipCode: data.shippingZipCode || "",
      });
    }
  }, [data, form]);

  return (
    <>
      <Skeleton loading={loading} active>
        <Card
          headStyle={{ display: "none" }}
          bodyStyle={{
            padding: 0,
          }}
          className="border-none shadow-sm">
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
                companyName: data.companyName || "",
                website: data.website || "",
                phone: data.phone || "",
                email: data.email || "",
                companyOwnerId: data.companyOwnerId || "",
                companyTypeId: data.companyTypeId || "",
                industryId: data.industryId || "",
                companySize: data.companySize || "",
                annualRevenue: data.annualRevenue || "",
                billingStreet: data.billingStreet || "",
                billingCity: data.billingCity || "",
                billingState: data.billingState || "",
                billingCountry: data.billingCountry || "",
                billingZipCode: data.billingZipCode || "",
                shippingStreet: data.shippingStreet || "",
                shippingCity: data.shippingCity || "",
                shippingState: data.shippingState || "",
                shippingCountry: data.shippingCountry || "",
                shippingZipCode: data.shippingZipCode || "",
              }}>
              <div className="bg-[#fafafa] dark:bg-gray-800 w-full rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="border-b border-gray-200 dark:border-gray-600 px-4 sm:px-6 py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        Company Details
                      </h3>
                    </div>
                    {triggerSave && (
                      <Form.Item className="mb-0">
                        <div className="flex items-center gap-2">
                          <Button
                            type="primary"
                            htmlType="submit"
                            size="middle"
                            className="shadow-sm hover:shadow-md transition-shadow">
                            Save Changes
                          </Button>
                          <Button
                            loading={loading}
                            onClick={onFinishFailed}
                            size="middle"
                            className="shadow-sm hover:shadow-md transition-shadow">
                            Cancel
                          </Button>
                        </div>
                      </Form.Item>
                    )}
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Basic Information Section */}
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 sm:p-5">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          Basic Information
                        </h4>
                        <div className="space-y-4">
                          <Form.Item
                            label="Company Type"
                            name={"companyTypeId"}>
                            <Select
                              className="w-full"
                              loading={companyTypeLoading}
                              size="large"
                              placeholder="Select company type"
                              showSearch
                              optionFilterProp="children">
                              {companyType?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item?.companyTypeName}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>

                          <Form.Item label="Industry" name={"industryId"}>
                            <Select
                              className="w-full"
                              loading={industryLoading}
                              size="large"
                              placeholder="Select industry"
                              showSearch
                              optionFilterProp="children">
                              {industryList?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item?.industryName}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item
                              label="Company Size"
                              name={"companySize"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="Enter company size"
                              />
                            </Form.Item>

                            <Form.Item
                              label="Annual Revenue"
                              name={"annualRevenue"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="Enter annual revenue"
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Address Section */}
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 sm:p-5">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          Shipping Address
                        </h4>
                        <div className="space-y-4">
                          <Form.Item
                            label="Street Address"
                            name={"shippingStreet"}>
                            <Input
                              className="w-full"
                              size="large"
                              placeholder="Enter shipping street address"
                            />
                          </Form.Item>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item label="City" name={"shippingCity"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="City"
                              />
                            </Form.Item>
                            <Form.Item
                              label="ZIP Code"
                              name={"shippingZipCode"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="ZIP Code"
                              />
                            </Form.Item>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item label="State" name={"shippingState"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="State"
                              />
                            </Form.Item>
                            <Form.Item label="Country" name={"shippingCountry"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="Country"
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Address Information Section */}
                    <div className="space-y-6">
                      {/* Billing Address Section */}
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 sm:p-5">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          Billing Address
                        </h4>
                        <div className="space-y-4">
                          <Form.Item
                            label="Street Address"
                            name={"billingStreet"}>
                            <Input
                              className="w-full"
                              size="large"
                              placeholder="Enter billing street address"
                            />
                          </Form.Item>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item label="City" name={"billingCity"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="City"
                              />
                            </Form.Item>
                            <Form.Item label="ZIP Code" name={"billingZipCode"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="ZIP Code"
                              />
                            </Form.Item>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item label="State" name={"billingState"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="State"
                              />
                            </Form.Item>
                            <Form.Item label="Country" name={"billingCountry"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="Country"
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Card>
      </Skeleton>
    </>
  );
}
