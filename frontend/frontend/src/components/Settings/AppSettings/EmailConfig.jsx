import Button from "@/UI/Button";
import {
  loadAllEmailConfig,
  updateEmailConfig,
} from "@/redux/rtk/features/EmailConfig/EmailConfigSlice";
import usePermissions from "@/utils/usePermissions";
import { Form, Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EmailConfig() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.emailConfig);
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();

  const { permissions } = usePermissions();
  const hasPermissionEmailConfig = permissions?.includes("update-emailConfig");
  const handleSubmit = async (values) => {
    setLoader(true);
    try {
      const data = {
        ...values,
        emailConfigId: list?.[0]?.id,
      };
      const response = await dispatch(updateEmailConfig(data));
      if (response.payload.message === "success") {
        dispatch(loadAllEmailConfig());
        form.resetFields();
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  };

  useEffect(() => {
    dispatch(loadAllEmailConfig());
  }, [dispatch]);

  useEffect(() => {
    if (list) {
      form.setFieldsValue(list[0]);
    }
  }, [form, list]);

  return (
    <div className="max-w-[768px] mx-auto mt-5">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className="mt-5"
      >
        <Form.Item name="emailConfigName" label="Email config name">
          <Input type="text" className="input" />
        </Form.Item>
        <Form.Item name="emailHost" label="Host">
          <Input className="input" />
        </Form.Item>
        <Form.Item name="emailPort" label="Port">
          <Input type="number" className="input" />
        </Form.Item>
        <Form.Item name="emailUser" label="User email">
          <Input type="text" className="input" />
        </Form.Item>
        <Form.Item name="emailPass" label="Password">
          <Input type="text" className="input" />
        </Form.Item>
        {hasPermissionEmailConfig ? (
          <Form.Item>
            <Button
              className="w-24"
              loading={loader || loading}
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </Form.Item>
        ) : (
          <div className="flex justify-start mt-[24px]">
            <Tooltip title="Permission denied">
              <button
                disabled
                className="xs:px-3 px-2 flex items-center gap-1 md:gap-2 md:text-base py-[6px] lg:px-5 border bg-gray-500 text-white rounded cursor-not-allowed opacity-70"
              >
                Save
              </button>
            </Tooltip>
          </div>
        )}
      </Form>
    </div>
  );
}
