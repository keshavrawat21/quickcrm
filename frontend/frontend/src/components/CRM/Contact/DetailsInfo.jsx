import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import {
  loadSingleContact,
  updateContact,
} from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllContactSource } from "@/redux/rtk/features/CRM/contactSource/contactSourceSlice";
import { loadAllContactStage } from "@/redux/rtk/features/CRM/contactStage/contactStageSlice";
import { loadAllIndustry } from "@/redux/rtk/features/CRM/industry/industrySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import usePermissions from "@/utils/usePermissions";
import { Button, Card, DatePicker, Form, Input, Select, Skeleton } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DetailsInfo({ contact, contactLoading }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);

  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company
  );

  const { list: contactSourceList, loading: contactSourceLoading } =
    useSelector((state) => state.contactSource);
  const { list: contactStageList, loading: contactStageLoading } = useSelector(
    (state) => state.contactStage
  );
  const { list: industryList, loading: industryLoading } = useSelector(
    (state) => state.industry
  );

  // contact profile edit form
  const { permissions } = usePermissions();
  const canEdit = permissions?.includes("update-contact");
  const onFinish = async (values) => {
    const formData = {
      ...values,
      dateOfBirth: values.dateOfBirth || undefined,
      companyId: parseInt(values.companyId),
      industryId: parseInt(values.industryId),
      contactSourceId: parseInt(values.contactSourceId),
      contactStageId: parseInt(values.contactStageId),
    };
    const resp = await dispatch(
      updateContact({ id: contact.id, values: formData })
    );
    if (resp.payload.message === "success") {
      dispatch(loadSingleContact(contact.id));
      setTriggerSave(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setTriggerSave(false);
    form.resetFields();
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(loadAllContactSource());
    dispatch(loadAllCompany());
    dispatch(loadAllContactStage());
    dispatch(loadAllIndustry());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  return (
    <>
      <Skeleton loading={contactLoading} active>
        <Card
          headStyle={{ display: "none" }}
          bodyStyle={{
            padding: 0,
          }}
          className="border-none shadow-sm">
          {contact && (
            <Form
              form={form}
              colon={false}
              disabled={!canEdit}
              layout="vertical"
              onFieldsChange={() => setTriggerSave(true)}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                dateOfBirth: undefined,
                companyId: contact?.companyId || "",
                industryId: contact?.industryId || "",
                contactStageId: contact?.contactStageId || "",
                contactSourceId: contact?.contactSourceId || "",
                department: contact?.department || "",
                linkedin: contact?.linkedin || "",
                twitter: contact?.twitter || "",
                presentAddress: contact?.presentAddress || "",
                presentCity: contact?.presentCity || "",
                presentZipCode: contact?.presentZipCode || "",
                presentState: contact?.presentState || "",
                presentCountry: contact?.presentCountry || "",
                permanentAddress: contact?.permanentAddress || "",
                permanentCity: contact?.permanentCity || "",
                permanentZipCode: contact?.permanentZipCode || "",
                permanentState: contact?.permanentState || "",
                permanentCountry: contact?.permanentCountry || "",
                description: contact?.description || "",
              }}>
              <div className="bg-[#fafafa] dark:bg-gray-800 w-full rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className=" border-b border-gray-200 dark:border-gray-600 px-4 sm:px-6 py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        Contact Details
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
                            loading={contactLoading}
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
                          <Form.Item label="Date of birth" name={"dateOfBirth"}>
                            <DatePicker
                              defaultValue={
                                contact?.dateOfBirth
                                  ? moment(contact.dateOfBirth)
                                  : undefined
                              }
                              className="w-full"
                              size="large"
                              placeholder="Select date of birth"
                            />
                          </Form.Item>

                          <Form.Item label="Company" name={"companyId"}>
                            <Select
                              className="w-full"
                              loading={companyLoading}
                              size="large"
                              placeholder="Select company"
                              showSearch
                              optionFilterProp="children">
                              {companyList?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item?.companyName}
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
                            <Form.Item label="Stage" name={"contactStageId"}>
                              <Select
                                className="w-full"
                                loading={contactStageLoading}
                                size="large"
                                placeholder="Select stage">
                                {contactStageList?.map((item) => (
                                  <Select.Option key={item.id} value={item.id}>
                                    {item?.contactStageName}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>

                            <Form.Item label="Source" name={"contactSourceId"}>
                              <Select
                                className="w-full"
                                loading={contactSourceLoading}
                                size="large"
                                placeholder="Select source">
                                {contactSourceList?.map((item) => (
                                  <Select.Option key={item.id} value={item.id}>
                                    {item?.contactSourceName}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>

                          <Form.Item label="Department" name={"department"}>
                            <Input
                              className="w-full"
                              size="large"
                              placeholder="Enter department"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      {/* Social Links Section */}
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 sm:p-5">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          Social Links
                        </h4>
                        <div className="space-y-4">
                          <Form.Item label="LinkedIn" name={"linkedin"}>
                            <Input
                              className="w-full"
                              size="large"
                              placeholder="LinkedIn profile URL"
                            />
                          </Form.Item>
                          <Form.Item label="Twitter" name={"twitter"}>
                            <Input
                              className="w-full"
                              size="large"
                              placeholder="Twitter profile URL"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    {/* Address Information Section */}
                    <div className="space-y-6">
                      {/* Present Address Section */}
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 sm:p-5">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          Present Address
                        </h4>
                        <div className="space-y-4">
                          <Form.Item
                            label="Street Address"
                            name={"presentAddress"}>
                            <Input
                              className="w-full"
                              size="large"
                              placeholder="Enter street address"
                            />
                          </Form.Item>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item label="City" name={"presentCity"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="City"
                              />
                            </Form.Item>
                            <Form.Item label="ZIP Code" name={"presentZipCode"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="ZIP Code"
                              />
                            </Form.Item>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item label="State" name={"presentState"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="State"
                              />
                            </Form.Item>
                            <Form.Item label="Country" name={"presentCountry"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="Country"
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>

                      {/* Permanent Address Section */}
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 sm:p-5">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          Permanent Address
                        </h4>
                        <div className="space-y-4">
                          <Form.Item
                            label="Street Address"
                            name={"permanentAddress"}>
                            <Input
                              className="w-full"
                              size="large"
                              placeholder="Enter street address"
                            />
                          </Form.Item>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item label="City" name={"permanentCity"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="City"
                              />
                            </Form.Item>
                            <Form.Item
                              label="ZIP Code"
                              name={"permanentZipCode"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="ZIP Code"
                              />
                            </Form.Item>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item label="State" name={"permanentState"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="State"
                              />
                            </Form.Item>
                            <Form.Item
                              label="Country"
                              name={"permanentCountry"}>
                              <Input
                                className="w-full"
                                size="large"
                                placeholder="Country"
                              />
                            </Form.Item>
                          </div>

                          <Form.Item label="Description" name={"description"}>
                            <Input.TextArea
                              className="w-full"
                              rows={4}
                              placeholder="Additional notes or description about the contact..."
                            />
                          </Form.Item>
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
