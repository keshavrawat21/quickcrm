import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAccount } from "../../redux/rtk/features/account/accountSlice";
import {
  addTransaction,
  loadAllTransaction,
} from "../../redux/rtk/features/transaction/transactionSlice";
import AddAccount from "../Account/AddAccount";
import BigDrawer from "../Drawer/BigDrawer";

//Date functionalities
let startdate = moment().startOf("month").format("YYYY-MM-DD");
let enddate = moment().endOf("month").format("YYYY-MM-DD");

const AddTransaction = ({ preFieldValue }) => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { list: accounts, loading } = useSelector((state) => state.accounts);

  const [form] = Form.useForm();

  let [date, setDate] = useState(moment());
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(loadAllAccount());
  }, [dispatch]);

  const onFinish = async (values) => {
    try {
      const data = {
        date: date,
        ...values,
      };

      const resp = await dispatch(addTransaction(data));

      if (resp.meta?.requestStatus === "fulfilled") {
        setLoader(false);
        dispatch(loadAllTransaction({ startdate, enddate }));
      }

      form.resetFields();
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
  };

  return (
    <>
      <div>
        <Title level={4} className="m-2 text-center">
          Transaction
        </Title>
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true,
            ...preFieldValue,
          }}
          layout="vertical"
          className="sm:mx-10"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item style={{ marginBottom: "10px" }} label="Date" required>
            <DatePicker
              defaultValue={dayjs()}
              onChange={(value) => setDate(value?._d)}
              label="date"
              name="date"
              className="date-picker date-picker-transaction-create"
              rules={[
                {
                  required: true,
                  message: "Please input date!",
                },
              ]}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              className="flex-grow  mb-0"
              name="debitId"
              label={
                <>
                  Debit Account
                  <BigDrawer
                    title={"new debit account"}
                    // eslint-disable-next-line react/no-children-prop
                    children={<AddAccount drawer={true} />}
                  />
                </>
              }
              rules={[
                {
                  required: true,
                  message: "Please input debit account!",
                },
              ]}>
              <Select
                loading={loading}
                showSearch
                placeholder="Select Debit ID"
                optionFilterProp="children"
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }>
                {accounts &&
                  accounts.map((acc) => (
                    <Select.Option key={acc.id} value={acc.id}>
                      {acc.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="creditId"
              label={
                <>
                  Credit Account
                  <BigDrawer
                    title={"new credit account"}
                    // eslint-disable-next-line react/no-children-prop
                    children={<AddAccount drawer={true} />}
                  />
                </>
              }
              className="flex-grow mb-0"
              rules={[
                {
                  required: true,
                  message: "Please input debit account!",
                },
              ]}>
              <Select
                loading={loading}
                showSearch
                placeholder="Select Credit ID"
                optionFilterProp="children"
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }>
                {accounts &&
                  accounts.map((acc) => (
                    <Select.Option key={acc.id} value={acc.id}>
                      {acc.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label="Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input amount!",
                },
              ]}>
              <Input type="number" />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label="Particulars"
              name="particulars">
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center mt-[24px]">
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loader}
              onClick={() => setLoader(true)}>
              Pay Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddTransaction;
