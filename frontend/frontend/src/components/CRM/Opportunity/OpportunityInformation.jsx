import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const OpportunityInformation = ({ form, opportunity }) => {
  const dispatch = useDispatch();
  const roleId = localStorage.getItem("roleId");
  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  useEffect(() => {
    if (opportunity) {
      form.setFieldsValue({
        ...opportunity,
        opportunityCreateDate: opportunity.opportunityCreateDate
          ? dayjs(opportunity.opportunityCreateDate).format("YYYY-MM-DD")
          : null,
        opportunityCloseDate: opportunity.opportunityCloseDate
          ? dayjs(opportunity.opportunityCloseDate).format("YYYY-MM-DD")
          : null,
      });
    }

    if (roleId) {
      form.setFieldsValue({
        opportunityOwnerId: parseInt(roleId),
      });
    }
  }, [form, opportunity, roleId]);
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Form.Item
          label="Name"
          name="opportunityName"
          tooltip="This is a required field"
          rules={[
            { required: true, message: "Opportunity Name is Required." },
          ]}>
          <Input placeholder="Test" />
        </Form.Item>

        <Form.Item label="Opportunity owner" name="opportunityOwnerId">
          <Select
            style={{ width: "100%" }}
            loading={staffLoading}
            allowClear
            showSearch
            placeholder="Select Opportunity owner name">
            {staffList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item?.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Amount" name="amount">
          <Input placeholder="10000" />
        </Form.Item>

        <Form.Item label="Next step" name="nextStep">
          <Input placeholder="Next" />
        </Form.Item>

        <Form.Item label="Opportunity create date" name="opportunityCreateDate">
          <DatePicker
            placeholder="Select opportunity create date"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Opportunity Close Date" name="opportunityCloseDate">
          <DatePicker
            placeholder="Select opportunity close date"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default OpportunityInformation;
