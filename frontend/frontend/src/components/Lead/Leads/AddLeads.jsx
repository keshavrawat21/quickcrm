import BigDrawer from "@/components/Drawer/BigDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { useAddLeadMutation } from "@/redux/rtk/features/leads/leadsApi";
import { useGetLeadSourcesQuery } from "@/redux/rtk/features/leadSource/leadSourceApi";
import Button from "@/UI/Button";
import Card from "@/UI/Card";
import { Form, Input, InputNumber, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddLeadSource from "../LeadSource/AddLeadSource";
import LeadsCreateMany from "./LeadsCreateMany";
import { loadProduct } from "@/redux/rtk/features/product/productSlice";

const { Option } = Select;

const AddIndustry = ({ onAdd, drawer }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const trimmed = values.name?.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    form.resetFields();
  };

  return (
    <div className="px-4 py-4 w-full">
      <Form form={form} layout="vertical" onFinish={onFinish} className="w-full">
        <Form.Item
          style={{ width: "100%" }}
          label="Industry Name"
          name="name"
          rules={[{ required: true, message: "Industry name is required." }]}>
          <Input placeholder="e.g. Technology, Healthcare..." />
        </Form.Item>
        <Form.Item style={{ width: "100%" }} label="Description" name="description">
          <Input.TextArea placeholder="Short description (optional)" rows={3} />
        </Form.Item>
        <Form.Item label="">
          <div className="flex items-center gap-2">
            <Button type="submit" color="primary">
              Add Industry
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default function AddLeads({ onClose, pageConfig }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const roleId = localStorage.getItem("roleId");

  const [industryList, setIndustryList] = useState([]);

  const handleAddIndustry = (name) => {
    if (industryList.includes(name)) {
      message.warning("Industry already exists.");
      return;
    }
    setIndustryList((prev) => [...prev, name]);
    message.success(`"${name}" added to industry list.`);
  };

  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users
  );

  const { list: productList } = useSelector((state) => state.products);

  const { data: leadSources, isLoading: leadSourceLoading } =
    useGetLeadSourcesQuery();

useEffect(() => {
  dispatch(loadAllStaff({ query: "all" }));

  dispatch(
    loadProduct({
      page: 1,
      count: 100,
      status: "true",
      product: "all",
    })
  );
}, [dispatch]);

  const [addLeads, { isLoading }] = useAddLeadMutation();

  const onFinish = async (values) => {
    // Ensure field names match what backend stores and returns
    const formData = {
      ...values,
      industryType: values.industryType ?? null,
      productIds: values.productIds ?? [],
      address: values.address ?? null,
    };
    const resp = await addLeads(formData);
    if (resp.data) {
      form.resetFields();
      onClose();
    }
  };

  useEffect(() => {
    if (roleId) {
      form.setFieldsValue({ leadOwnerId: parseInt(roleId) });
    }
  }, [form, roleId]);

  return (
    <UserPrivateComponent permission="create-lead">
      <Form
        className="w-full"
        onFinish={onFinish}
        colon={false}
        layout="vertical"
        initialValues={{ leadOwnerId: parseInt(roleId) }}
        form={form}>

        <div className="w-full grid grid-cols-2 gap-3">

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is Required." }]}>
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <InputNumber placeholder="+91" size="small" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Lead owner" name={"leadOwnerId"}>
            <Select
              style={{ width: "100%" }}
              loading={staffLoading}
              allowClear
              showSearch
              placeholder="Select contact owner name">
              {staffList?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item?.username}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Lead Value" name="leadValue">
            <InputNumber placeholder="Lead Value" size="small" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Lead Status" name={"leadStatus"}>
            <Select style={{ width: "100%" }} allowClear showSearch placeholder="Select lead status">
              <Option value={"new"}>New</Option>
              <Option value={"contacted"}>Contacted</Option>
              <Option value={"qualified"}>Qualified</Option>
              <Option value={"lost"}>Lost</Option>
              <Option value={"cancelled"}>Cancelled</Option>
              <Option value={"working"}>Working</Option>
              <Option value={"customer"}>Customer</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <>
                Lead Source
                <BigDrawer title={"Lead Source"}>
                  <AddLeadSource drawer={true} />
                </BigDrawer>
              </>
            }
            name={"leadSourceId"}>
            <Select
              style={{ width: "100%" }}
              loading={leadSourceLoading}
              allowClear
              showSearch
              placeholder="Select lead source">
              {leadSources?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Industry Type */}
          <Form.Item
            label={
              <>
                Industry Type
                <BigDrawer title={"Industry Type"}>
                  <AddIndustry drawer={true} onAdd={handleAddIndustry} />
                </BigDrawer>
              </>
            }
            name={"industryType"}>
            <Select
              style={{ width: "100%" }}
              allowClear
              showSearch
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
              placeholder="Select industry type">
              {industryList.map((industry) => (
                <Option key={industry} value={industry}>
                  {industry}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Products */}
<Form.Item label="Products" name={"productIds"}>
  <Select
    style={{ width: "100%" }}
    mode="multiple"
    allowClear
    showSearch
    placeholder="Select products">

    {productList?.map((product) => (
      <Option key={product.id} value={product.id}>
        {product.name}
      </Option>
    ))}

  </Select>
</Form.Item>

        </div>

        {/* Address Section */}
        <div className="w-full mt-3 mb-1">
          <p className="text-sm font-semibold text-gray-600 mb-2">Address</p>
        </div>

        <div className="w-full grid grid-cols-3 gap-3">
          <Form.Item label="Country" name={["address", "country"]}>
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item label="State" name={["address", "state"]}>
            <Input placeholder="State" />
          </Form.Item>
          <Form.Item label="City" name={["address", "city"]}>
            <Input placeholder="City" />
          </Form.Item>
        </div>

        <div className="w-full">
          <Form.Item label="Address Line" name={["address", "addressLine"]}>
            <Input placeholder="Street / Area / Building" />
          </Form.Item>
        </div>

        <Form.Item label="">
          <div className="flex items-center gap-2">
            <Button type="submit" color="primary" loading={isLoading}>
              Create
            </Button>
          </div>
        </Form.Item>
      </Form>

      <Card
        className="my-5"
        title={<span className="text-center font-bold">Import From CSV</span>}>
        <LeadsCreateMany
          urlPath={"lead"}
          demoData={[
            ["name", "email", "phone", "leadOwner", "leadStatus", "leadValue", "leadSource"],
            ["Emily Callison", "new@gmail.com", "01708888842", "delivery", "new", "1000", "facebook"],
            ["Sakib", "old@gmail.com", "01708888842", "salesman", "new", "1000", "facebook"],
          ]}
          invalidTags={["Leads"]}
          title={"Demo Leads"}
        />
      </Card>
    </UserPrivateComponent>
  );
}