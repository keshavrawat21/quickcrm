import Card from "@/UI/Card";
import Loader from "@/components/Loader/Loader";
import {
  deleteContact,
  loadAllContactPaginated,
  loadSingleContact,
  updateContact,
} from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import usePermissions from "@/utils/usePermissions";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageUploadCrm from "../UI/ImageUploadCrm";

export default function ContactProfile({ contact, contactLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);

  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users
  );

  const onDelete = async () => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const resp = await dispatch(deleteContact({ id }));
      if (resp.payload.message === "success") {
        navigate(-1);
        dispatch(loadAllContactPaginated({}));
      }
    }
  };

  const { permissions } = usePermissions();
  const canEdit = permissions?.includes("update-contact");

  const onFinish = async (values) => {
    const formData = {
      ...values,
      contactOwnerId: parseInt(values.contactOwnerId),
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
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  if (!contact) return <Loader />;

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
          firstName: contact?.firstName || "",
          lastName: contact?.lastName || "",
          contactOwnerId: contact?.contactOwnerId || "",
          email: contact?.email || "",
          phone: contact?.phone || "",
          jobTitle: contact?.jobTitle || "",
        }}>
        <div className="flex justify-between items-start pb-6 border-b dark:border-gray-700">
          <div className="flex flex-col items-start">
            <ImageUploadCrm
              data={contact}
              updateThunk={updateContact}
              loadThunk={loadSingleContact}
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
              {contact?.firstName} {contact?.lastName}
            </h2>
            {contact.jobTitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {contact.jobTitle}
              </p>
            )}
            {contact.company?.companyName && (
              <Link
                to={`/admin/company/${contact.companyId}`}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-1">
                {contact.company?.companyName}
              </Link>
            )}
          </div>

          {/* Action Buttons - Top Right */}
          <div className="flex flex-col gap-2 min-w-[120px]">
            {triggerSave ? (
              <>
                <Button type="primary" htmlType="submit" size="small">
                  Save Changes
                </Button>
                <Button
                  loading={contactLoading}
                  onClick={onFinishFailed}
                  size="small">
                  Cancel
                </Button>
              </>
            ) : (
              <Button danger onClick={onDelete} size="small">
                Delete Contact
              </Button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="pt-6 space-y-4">
          <Form.Item
            label="Contact Owner"
            name="contactOwnerId"
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

          <Form.Item label="First Name" name="firstName" className="mb-4">
            <Input
              bordered={false}
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName" className="mb-4">
            <Input
              bordered={false}
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>

          <Form.Item label="Email" name="email" className="mb-4">
            <Input
              bordered={false}
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>

          <Form.Item label="Phone" name="phone" className="mb-4">
            <Input
              bordered={false}
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>

          <Form.Item label="Job Title" name="jobTitle" className="mb-4">
            <Input
              bordered={false}
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
}
