import ContactEmailField from "@/components/CRM/Contact/ContactEmailField";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";

import { loadAllContactSource } from "@/redux/rtk/features/CRM/contactSource/contactSourceSlice";
import { loadAllContactStage } from "@/redux/rtk/features/CRM/contactStage/contactStageSlice";
import { loadAllIndustry } from "@/redux/rtk/features/CRM/industry/industrySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import {
  useConvertLeadMutation,
  useGetLeadQuery,
} from "@/redux/rtk/features/leads/leadsApi";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ConvertLead({ onClose, createAs }) {
  const { id } = useParams();
  const roleId = localStorage.getItem("roleId");

  const { data: leads, isLoading: leadsLoading } = useGetLeadQuery(id);
  // selector
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company
  );

  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users
  );
  const { loading: contactLoading } = useSelector((state) => state.contact);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllContactSource());
    dispatch(loadAllCompany());
    dispatch(loadAllContactStage());
    dispatch(loadAllIndustry());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  useEffect(() => {
    // Set initial values when `leads` data is available
    if (leads) {
      form.setFieldsValue({
        email: leads.email || "",
        firstName: leads.name || "",
        lastName: leads.lastName || "",
        dateOfBirth: leads.dateOfBirth ? dayjs(leads.dateOfBirth) : undefined,
        contactOwnerId: parseInt(roleId), // Set roleId for contact owner
        companyId: leads.companyId || undefined,
        jobTitle: leads.jobTitle || "",
        phone: leads.phone || "",
        department: leads.department || "",
        twitter: leads.twitter || "",
        linkedin: leads.linkedin || "",
        presentAddress: leads.presentAddress || "",
        presentCity: leads.presentCity || "",
        presentZipCode: leads.presentZipCode || "",
        presentState: leads.presentState || "",
        presentCountry: leads.presentCountry || "",
        permanentAddress: leads.permanentAddress || "",
        permanentCity: leads.permanentCity || "",
        permanentZipCode: leads.permanentZipCode || "",
        permanentState: leads.permanentState || "",
        permanentCountry: leads.permanentCountry || "",
        industryId: leads.industryId || undefined,
        contactSourceId: leads.contactSourceId || undefined,
        contactStageId: leads.contactStageId || undefined,
        description: leads.description || "",
      });
    }
  }, [leads, form, roleId]);

  const [pageConfig, setPageConfig] = useState({
    query: "changeContactStatus",
    isConverted: true,
  });

  const [convertLead, { isLoading }] = useConvertLeadMutation();

  const onFinish = async (values) => {
    const formData = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
        : undefined,
      contactOwnerId: parseInt(values.contactOwnerId),
      companyId: parseInt(values.companyId),
      industryId: parseInt(values.industryId),
      contactSourceId: parseInt(values.contactSourceId),
      contactStageId: parseInt(values.contactStageId),
    };

    const resp = await convertLead({ data: formData, arg: pageConfig, id });
    if (resp.data) {
      form.resetFields();
      onClose();
    }
  };

  const [showMoreDetails, setShowMoreDetails] = useState(false);

  return (
    <UserPrivateComponent permission="create-contact">
      <Form
        className="px-5"
        onFinish={onFinish}
        colon={false}
        layout="vertical"
        form={form}
        initialValues={
          createAs
            ? {
                [createAs.name]: createAs.value,
              }
            : {}
        }>
        {/* Essential Fields */}
        <div className="flex justify-between gap-5">
          <div className="">
            <div className="flex gap-5">
              <Form.Item
                className="w-1/2"
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "First Name is Required." },
                ]}>
                <Input placeholder="First" />
              </Form.Item>
              <Form.Item className="w-1/2" label="Last Name" name="lastName">
                <Input placeholder="Last" />
              </Form.Item>
            </div>

            <div className="flex gap-5">
              <Form.Item
                className="w-1/2"
                label="Contact Owner"
                name="contactOwnerId">
                <Select
                  style={{ width: "100%" }}
                  loading={staffLoading}
                  allowClear
                  showSearch
                  placeholder="Select contact owner name">
                  {staffList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.username}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item className="w-1/2" label="Phone Number" name="phone">
                <Input placeholder="+8801700000000" />
              </Form.Item>
            </div>

            <ContactEmailField
              isUpdate
              form={form}
              name="email"
              initialSku={leads ? leads?.email : ""}
            />
          </div>
        </div>

        {/* More Details Fields */}
        {showMoreDetails && (
          <div className="flex justify-between gap-5 ">
            <div className="w-1/2">
              <Form.Item label="Birthday" name="dateOfBirth">
                <DatePicker placeholder="Select birthday" />
              </Form.Item>

              <Form.Item label="Company" name="companyId">
                <Select
                  style={{ width: "100%" }}
                  loading={companyLoading}
                  allowClear
                  showSearch
                  placeholder="Select company Name"
                  disabled={createAs?.name === "companyId"}>
                  {companyList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.companyName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Job Title" name="jobTitle">
                <Input placeholder="CEO" />
              </Form.Item>

              <Form.Item label="Department" name="department">
                <Input placeholder="IT" />
              </Form.Item>

              {/* Add remaining fields here */}
            </div>

            <div className="w-1/2">
              <Form.Item label="Present Address" name="presentAddress">
                <Input placeholder="Enter present address" />
              </Form.Item>
              <Form.Item label="Present City" name="presentCity">
                <Input placeholder="Dhaka" />
              </Form.Item>
              <Form.Item label="Present Country" name="presentCountry">
                <Input placeholder="Bangladesh" />
              </Form.Item>
              {/* Add remaining fields here */}
            </div>
          </div>
        )}

        {/* More Details Toggle */}
        <Button
          type="link"
          loading={isLoading}
          onClick={() => setShowMoreDetails(!showMoreDetails)}
          className="text-white bg-[#40a9ff] mt-4">
          {showMoreDetails ? (
            <span className="flex items-center gap-2">
              Show Less Details <IoIosArrowUp />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Show More Details <IoIosArrowDown />
            </span>
          )}
        </Button>
        {/* Submit and Cancel Buttons */}
        <Form.Item>
          <div className="flex items-center mt-3 justify-end gap-2">
            <Button
              size={"large"}
              htmlType="submit"
              type="primary"
              loading={contactLoading}>
              Convert
            </Button>
          </div>
        </Form.Item>
      </Form>
    </UserPrivateComponent>
  );
}
