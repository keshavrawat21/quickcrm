import Card from "@/UI/Card";
import Modal from "@/UI/Modal";
import Loader from "@/components/Loader/Loader";
import { loadAllContactPaginated } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { useGetLeadSourcesQuery } from "@/redux/rtk/features/leadSource/leadSourceApi";
import {
  useDeleteLeadMutation,
  useUpdateLeadMutation,
} from "@/redux/rtk/features/leads/leadsApi";
import { toastHandler } from "@/utils/functions";
import usePermissions from "@/utils/usePermissions";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConvertLead from "./ConvertLead";

export default function LeadsProfile({ leads, leadsLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [triggerSave, setTriggerSave] = useState(false);

  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users
  );

  const { data: leadSources } = useGetLeadSourcesQuery();

  const [deleteLead] = useDeleteLeadMutation();

  const onDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      try {
        const response = await deleteLead({ id, status: false });
        if (response.data) {
          // toastHandler("Lead Hided successfully", "warning");
          navigate(-1);
          dispatch(loadAllContactPaginated({}));
        }
      } catch (error) {
        toastHandler("Something went wrong, Please try again", "error");
      }
    }
  };

  // contact profile edit form
  const { permissions } = usePermissions();
  const canEdit = permissions?.includes("update-contact");

  const [updateLeads, { isLoading }] = useUpdateLeadMutation();

  const onFinish = async (values) => {
    const formData = {
      ...values,
      leadOwnerId: parseInt(values.leadOwnerId),
      leadSourceId: parseInt(values.leadSourceId),
      leadStatus: values.leadStatus,
    };
    const resp = await updateLeads({ id: leads.id, values: formData });
  };

  const [convert, setConvert] = useState(false);

  const onFinishFailed = (errorInfo) => {
    setTriggerSave(false);
    form.resetFields();
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  return (
    <>
      {leads ? (
        <Card className="border-none">
          <Form
            form={form}
            colon={false}
            disabled={!canEdit}
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 8,
            }}
            layout="inline"
            onFieldsChange={() => setTriggerSave(true)}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              name: leads?.name || "",
              leadOwnerId: leads?.leadOwnerId || "",
              leadSourceId: leads?.leadSourceId || "",
              email: leads?.email || "",
              phone: leads?.phone || "",
              leadStatus: leads?.leadStatus || "",
            }}>
            <div className="w-full">
              <div className="flex justify-between items-center px-5 p-3 border-b">
                <div className="flex items-end gap-5">
                  {/* <ImageUploadCrm
                    data={leads}
                    updateThunk={apiSlice.endpoints.updateLead.initiate}
                    // loadThunk={loadSingleContact}
                  /> */}
                  <div className="flex flex-col dark:text-white">
                    <span className="font-bold">{leads?.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {triggerSave && (
                    <Form.Item>
                      <div className="flex items-center gap-4">
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                        <Button
                          className="text-white"
                          loading={leadsLoading}
                          type="danger"
                          onClick={onFinishFailed}>
                          Cancel
                        </Button>
                      </div>
                    </Form.Item>
                  )}
                  <Button
                    disabled={leads?.isConverted === "true"}
                    onClick={() => setConvert(true)}
                    className={
                      leads?.isConverted === "true"
                        ? "bg-gray-500 text-white"
                        : "bg-primary text-white"
                    }>
                    {leads?.isConverted === "true" ? "Converted" : "Convert"}
                  </Button>
                  <Button danger onClick={onDelete}>
                    Delete
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-3">
                <Form.Item
                  className="flex flex-col"
                  label="Lead Owner"
                  name={"leadOwnerId"}>
                  <Select
                    className="md:ml-5"
                    bordered={false}
                    loading={ownerLoading}>
                    {ownerList?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item?.firstName} {item?.lastName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  className="flex flex-col"
                  label="Lead Source"
                  name={"leadSourceId"}>
                  <Select
                    className="md:ml-5"
                    bordered={false}
                    loading={ownerLoading}>
                    {leadSources?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  className="flex flex-col"
                  label="Lead Status"
                  name={"leadStatus"}>
                  <Select
                    className="md:ml-5"
                    bordered={false}
                    loading={ownerLoading}>
                    <Select.Option value={"new"}>{"New"}</Select.Option>
                    <Select.Option value={"contacted"}>
                      {"Contacted"}
                    </Select.Option>
                    <Select.Option value={"qualified"}>
                      {"Qualified"}
                    </Select.Option>
                    <Select.Option value={"lost"}>{"Lost"}</Select.Option>
                    <Select.Option value={"cancelled"}>
                      {"Cancelled"}
                    </Select.Option>
                    <Select.Option value={"working"}>{"Working"}</Select.Option>
                    <Select.Option value={"customer"}>
                      {"Customer"}
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Name" name="name">
                  <Input
                    bordered={false}
                    suffix={<BsFillPencilFill />}
                    className="md:ml-5 cursor-pointer"
                  />
                </Form.Item>

                <Form.Item label="Phone Number" name={"phone"}>
                  <Input
                    bordered={false}
                    suffix={<BsFillPencilFill />}
                    className="md:ml-5 cursor-pointer"
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
          <Modal
            open={convert}
            onClose={() => setConvert(false)}
            title={"Convert Lead to Contact"}>
            <ConvertLead data={leadSources} onClose={() => setConvert(false)} />
          </Modal>
        </Card>
      ) : (
        <Loader />
      )}
    </>
  );
}
