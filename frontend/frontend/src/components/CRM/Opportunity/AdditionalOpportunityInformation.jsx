import BigDrawer from "@/components/Drawer/BigDrawer";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunitySource } from "@/redux/rtk/features/CRM/opportunitySource/opportunitySourceSlice";
import { loadAllOpportunityStage } from "@/redux/rtk/features/CRM/opportunityStage/opportunityStageSlice";
import { loadAllOpportunityType } from "@/redux/rtk/features/CRM/opportunityType/opportunityTypeSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddCompany from "../Company/AddCompany";
import AddContact from "../Contact/AddContact";
import AddOpportunityType from "../Setup/OpportunitySetup/OpportunityType/AddOpportunityType";
import AddOpportunitySource from "../Setup/OpportunitySetup/OpportunitySource/AddOpportunitySource";
import AddOpportunityStage from "../Setup/OpportunitySetup/OpportunityStage/AddOpportunityStage";

const AdditionalOpportunityInformation = ({
  createAs,
  form,
  opportunity,
  drawer,
}) => {
  const dispatch = useDispatch();
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company
  );
  const { list: opportunitySourceList, loading: opportunitySourceLoading } =
    useSelector((state) => state.opportunitySource);
  const { list: opportunityStageList, loading: opportunityStageLoading } =
    useSelector((state) => state.opportunityStage);
  const { list: opportunityTypeList, loading: opportunityTypeLoading } =
    useSelector((state) => state.opportunityType);

  const { list: contactList, loading: contactLoading } = useSelector(
    (state) => state.contact
  );
  const { loading: opportunityLoading } = useSelector(
    (state) => state.opportunity
  );

  useEffect(() => {
    dispatch(loadAllOpportunitySource());
    dispatch(loadAllOpportunityType());
    dispatch(loadAllCompany());
    dispatch(loadAllOpportunityStage());
    dispatch(loadAllContact());
  }, [dispatch]);

  useEffect(() => {
    if (opportunity) {
      form.setFieldsValue({
        ...opportunity,
      });
    }
  }, [form, opportunity]);
  return (
    <div className="grid grid-cols-2 gap-3">
      <Form.Item
        style={{ flex: "1" }}
        label={
          <>
            Company
            <BigDrawer width={75} title={"Company"}>
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

      <Form.Item
        style={{ flex: "1" }}
        label={
          <>
            Contact
            {!drawer ? (
              <BigDrawer width={75} title={"Contact"}>
                <AddContact drawer={true} />
              </BigDrawer>
            ) : (
              ""
            )}
          </>
        }
        name="contactId">
        <Select
          style={{ width: "100%" }}
          loading={contactLoading}
          allowClear
          showSearch
          placeholder="Select Contact"
          disabled={!!(createAs?.name === "contactId")}>
          {contactList?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item?.firstName} {item?.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item style={{ flex: "1" }} label="Competitors" name="competitors">
        <Input placeholder="Text" />
      </Form.Item>

      <Form.Item
        style={{ flex: "1" }}
        label={
          <>
            Opportunity Type
            <BigDrawer title={"Opportunity Type"}>
              <AddOpportunityType drawer={true} />
            </BigDrawer>
          </>
        }
        name="opportunityTypeId">
        <Select
          style={{ width: "100%" }}
          loading={opportunityTypeLoading}
          allowClear
          showSearch
          placeholder="Select opportunity type">
          {opportunityTypeList?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.opportunityTypeName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        style={{ flex: "1" }}
        label={
          <>
            Opportunity Source
            <BigDrawer title={"Opportunity Source"}>
              <AddOpportunitySource drawer={true} />
            </BigDrawer>
          </>
        }
        name="opportunitySourceId">
        <Select
          style={{ width: "100%" }}
          loading={opportunitySourceLoading}
          allowClear
          showSearch
          placeholder="Select contact Source">
          {opportunitySourceList?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.opportunitySourceName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        style={{ flex: "1" }}
        label={
          <>
            Opportunity Stage
            <BigDrawer title={"Opportunity Stage"}>
              <AddOpportunityStage drawer={true} />
            </BigDrawer>
          </>
        }
        name="opportunityStageId">
        <Select
          style={{ width: "100%" }}
          loading={opportunityStageLoading}
          allowClear
          showSearch
          placeholder="Select contact stage">
          {opportunityStageList?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.opportunityStageName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item style={{ flex: "1" }} label="Description" name="description">
        <Input.TextArea placeholder="Describe about contact" />
      </Form.Item>
    </div>
  );
};

export default AdditionalOpportunityInformation;
