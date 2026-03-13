import Card from "@/UI/Card";
import Loader from "@/components/Loader/Loader";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import {
  deleteOpportunity,
  loadSingleOpportunity,
  updateOpportunity,
} from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import usePermissions from "@/utils/usePermissions";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function OpportunityProfile({ data, loading }) {
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users
  );
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company
  );
  const { list: contactList, loading: contactLoading } = useSelector(
    (state) => state.contact
  );

  const onDelete = async () => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const resp = await dispatch(deleteOpportunity({ id }));
      if (resp.payload.message === "success") {
        navigate(-1);
      }
    }
  };

  const { permissions } = usePermissions();
  const canEdit = permissions?.includes("update-opportunity");

  const onFinish = async (values) => {
    const formData = {
      ...values,
      opportunityOwnerId: parseInt(values.opportunityOwnerId),
      contactId: parseInt(values.contactId),
      companyId: parseInt(values.companyId),
    };
    const resp = await dispatch(
      updateOpportunity({ id: data.id, values: formData })
    );
    if (resp.payload.message === "success") {
      dispatch(loadSingleOpportunity(data.id));
      setTriggerSave(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setTriggerSave(false);
    form.resetFields();
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
    dispatch(loadAllCompany());
    dispatch(loadAllContact());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        opportunityName: data.opportunityName,
        amount: data.amount,
        opportunityOwnerId: data.opportunityOwnerId,
        contactId: data.contactId,
        companyId: data.companyId,
      });
    }
  }, [data, form]);

  if (!data) return <Loader />;

  // Find related data for display
  const owner = ownerList?.find(
    (owner) => owner.id === data.opportunityOwnerId
  );
  const contact = contactList?.find((contact) => contact.id === data.contactId);
  const company = companyList?.find((company) => company.id === data.companyId);

  return (
    <Card className="h-fit sticky top-6 p-3 border-none">
      <Form
        form={form}
        colon={false}
        disabled={!canEdit}
        layout="vertical"
        onFieldsChange={() => setTriggerSave(true)}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          opportunityName: data.opportunityName,
          amount: data.amount,
          opportunityOwnerId: data.opportunityOwnerId,
          contactId: data.contactId,
          companyId: data.companyId,
        }}>
        {/* Profile Header */}
        <div className="flex justify-between items-start pb-6 border-b dark:border-gray-700">
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {data.opportunityName}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${data.amount?.toLocaleString() || "0"}
              </span>
            </div>
            {company && (
              <Link
                to={`/admin/crm/company/${company.id}`}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-1">
                {company.companyName}
              </Link>
            )}
            {contact && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {contact.firstName} {contact.lastName}
              </p>
            )}
          </div>

          {/* Action Buttons - Top Right */}
          <div className="flex flex-col gap-2 min-w-[120px]">
            {triggerSave ? (
              <>
                <Button type="primary" htmlType="submit" size="small">
                  Save Changes
                </Button>
                <Button loading={loading} onClick={onFinishFailed} size="small">
                  Cancel
                </Button>
              </>
            ) : (
              <Button danger onClick={onDelete} size="small">
                Delete Opportunity
              </Button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="pt-6 space-y-4">
          <Form.Item
            label="Opportunity Owner"
            name="opportunityOwnerId"
            className="mb-4">
            <Select
              bordered={false}
              loading={ownerLoading}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500 w-full">
              {ownerList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.firstName} {item?.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Opportunity Name"
            name="opportunityName"
            className="mb-4">
            <Input
              bordered={false}
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>

          <Form.Item label="Contact" name="contactId" className="mb-4">
            <Select
              bordered={false}
              loading={contactLoading}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500 w-full">
              {contactList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.firstName} {item?.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Company" name="companyId" className="mb-4">
            <Select
              bordered={false}
              loading={companyLoading}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500 w-full">
              {companyList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.companyName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Amount ($)" name="amount" className="mb-4">
            <Input
              bordered={false}
              type="number"
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
}
