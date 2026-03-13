import Card from "@/UI/Card";
import Loader from "@/components/Loader/Loader";
import {
  deleteCompany,
  loadSingleCompany,
  updateCompany,
} from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import usePermissions from "@/utils/usePermissions";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageUploadCrm from "../UI/ImageUploadCrm";

export default function CompanyProfile({ data, loading }) {
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);
  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDelete = async () => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const resp = await dispatch(deleteCompany({ id }));
      if (resp.payload.message === "success") {
        navigate(-1);
      }
    }
  };

  const { permissions } = usePermissions();
  const canEdit = permissions?.includes("update-company");

  const onFinish = async (values) => {
    const formData = {
      ...values,
      companyOwnerId: parseInt(values.companyOwnerId),
    };
    const resp = await dispatch(updateCompany({ id: id, values: formData }));
    if (resp.payload.message === "success") {
      dispatch(loadSingleCompany(id));
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

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        companyOwnerId: data.companyOwnerId,
        companyName: data.companyName,
        website: data.website,
        phone: data.phone,
        email: data.email,
      });
    }
  }, [data, form]);

  if (!data) return <Loader />;

  return (
    <Card className="h-fit lg:sticky lg:top-6 p-3 sm:p-4 md:p-6 border-none w-full">
      <Form
        form={form}
        colon={false}
        disabled={!canEdit}
        layout="vertical"
        onFieldsChange={() => setTriggerSave(true)}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          companyOwnerId: data.companyOwnerId,
          companyName: data?.companyName,
          website: data?.website,
          phone: data?.phone,
          email: data?.email,
        }}>
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start pb-4 sm:pb-6 border-b dark:border-gray-700 gap-4 sm:gap-0">
          <div className="flex flex-col items-start w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full">
              <div className="flex-shrink-0">
                <ImageUploadCrm
                  data={data}
                  updateThunk={updateCompany}
                  loadThunk={loadSingleCompany}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                  {data.companyName}
                </h2>
                {data.website && (
                  <Link
                    target="_blank"
                    to={"https://" + data.website}
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-1 break-all">
                    {data.website}
                  </Link>
                )}
                {data.phone && (
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {data.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto sm:min-w-[120px]">
            {triggerSave ? (
              <>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="small"
                  className="flex-1 sm:flex-none">
                  Save Changes
                </Button>
                <Button
                  loading={loading}
                  onClick={onFinishFailed}
                  size="small"
                  className="flex-1 sm:flex-none">
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                danger
                onClick={onDelete}
                size="small"
                className="w-full sm:w-auto">
                Delete Company
              </Button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
          <Form.Item
            label="Company Owner"
            name="companyOwnerId"
            className="mb-3 sm:mb-4">
            <Select
              bordered={false}
              loading={ownerLoading}
              size="large"
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500 w-full">
              {ownerList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.firstName} {item?.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Company Name"
            name="companyName"
            className="mb-3 sm:mb-4">
            <Input
              bordered={false}
              size="large"
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>

          <Form.Item label="Website" name="website" className="mb-3 sm:mb-4">
            <Input
              bordered={false}
              size="large"
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>

          <Form.Item label="Email" name="email" className="mb-3 sm:mb-4">
            <Input
              bordered={false}
              size="large"
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone" className="mb-3 sm:mb-4">
            <Input
              bordered={false}
              size="large"
              suffix={<BsFillPencilFill className="text-gray-400 text-xs" />}
              className="border-b border-gray-200 dark:border-gray-700 rounded-none hover:border-blue-500"
            />
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
}
