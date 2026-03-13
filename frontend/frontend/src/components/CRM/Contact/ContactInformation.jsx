import BigDrawer from "@/components/Drawer/BigDrawer";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContactSource } from "@/redux/rtk/features/CRM/contactSource/contactSourceSlice";
import { loadAllContactStage } from "@/redux/rtk/features/CRM/contactStage/contactStageSlice";
import { loadAllIndustry } from "@/redux/rtk/features/CRM/industry/industrySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { DatePicker, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCompany from "../Company/AddCompany";
import AddIndustry from "../Setup/CompanySetup/Industry/AddIndustry";
import AddContactSource from "../Setup/ContactSetup/ContactSource/AddContactSource";
import AddContactStage from "../Setup/ContactSetup/ContactStage/AddContactStage";
import ContactEmailField from "./ContactEmailField";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// Robust parser: accepts dayjs, Date, or strings in common formats
const toDayjs = (val) => {
  if (!val) return null;
  if (dayjs.isDayjs(val)) return val;

  // Date object
  if (Object.prototype.toString.call(val) === "[object Date]") {
    const d = dayjs(val);
    return d.isValid() ? d : null;
  }

  // Try strict common formats
  const formats = [
    "YYYY-MM-DD HH:mm:ss",
    "YYYY-MM-DD",
    "YYYY/MM/DD",
    "DD-MM-YYYY",
    "DD/MM/YYYY",
    "MM-DD-YYYY",
    "MM/DD/YYYY",
  ];
  for (const f of formats) {
    const d = dayjs(val, f, true);
    if (d.isValid()) return d;
  }

  // Last fallback (non-strict parse)
  const d = dayjs(val);
  return d.isValid() ? d : null;
};

const ContactInformation = ({ createAs, form, data }) => {
  const { contact: singleContact } = useSelector((state) => state.contact);
  const { list: companyList, loading: companyLoading } = useSelector(
    (s) => s.company
  );
  const { list: contactSourceList, loading: contactSourceLoading } =
    useSelector((s) => s.contactSource);
  const { list: contactStageList, loading: contactStageLoading } = useSelector(
    (s) => s.contactStage
  );
  const { list: industryList, loading: industryLoading } = useSelector(
    (s) => s.industry
  );
  const { list: staffList, loading: staffLoading } = useSelector(
    (s) => s.users
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllContactSource());
    dispatch(loadAllCompany());
    dispatch(loadAllContactStage());
    dispatch(loadAllIndustry());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  useEffect(() => {
    if (!singleContact) return;

    const dob = toDayjs(singleContact.dateOfBirth);
    form.setFieldsValue({
      ...singleContact,
      dateOfBirth: dob,
    });
  }, [singleContact, form]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Form.Item
        label="First name"
        name="firstName"
        rules={[{ required: !data, message: "First Name is Required." }]}>
        <Input placeholder="First" />
      </Form.Item>

      <Form.Item label="Last name" name="lastName">
        <Input placeholder="Last" />
      </Form.Item>

      <ContactEmailField
        isUpdate
        form={form}
        name="email"
        className="w-full"
        initialSku={singleContact ? singleContact?.email : ""}
      />

      <Form.Item label="Contact owner" name="contactOwnerId">
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

      <Form.Item
        label="Birthday"
        name="dateOfBirth"
        getValueProps={(val) => ({ value: toDayjs(val) })}
        getValueFromEvent={(val) => (val ? toDayjs(val) : null)}>
        <DatePicker
          placeholder="Select birthday"
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          allowClear
        />
      </Form.Item>

      <Form.Item
        label={
          <>
            Company
            <BigDrawer width={77} title={"Company"}>
              <AddCompany drawer={true} />
            </BigDrawer>
          </>
        }
        name="companyId">
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

      <Form.Item label="Job title" name="jobTitle">
        <Input placeholder="CEO" />
      </Form.Item>

      <Form.Item label="Phone number" name="phone">
        <Input placeholder="+8801700000000" />
      </Form.Item>

      <Form.Item label="Department" name="department">
        <Input placeholder="IT" />
      </Form.Item>

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
          placeholder="Select Industry">
          {industryList?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.industryName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={
          <>
            Contact Source
            <BigDrawer title={"Contact Source"}>
              <AddContactSource drawer={true} />
            </BigDrawer>
          </>
        }
        name="contactSourceId">
        <Select
          style={{ width: "100%" }}
          loading={contactSourceLoading}
          allowClear
          showSearch
          placeholder="Select contact Source">
          {contactSourceList?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.contactSourceName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={
          <>
            Contact Stage
            <BigDrawer title={"Contact Stage"}>
              <AddContactStage drawer={true} />
            </BigDrawer>
          </>
        }
        name="contactStageId">
        <Select
          style={{ width: "100%" }}
          loading={contactStageLoading}
          allowClear
          showSearch
          placeholder="Select contact stage">
          {contactStageList?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.contactStageName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default ContactInformation;
