import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuote,
  loadAllQuotePaginated,
  loadSingleQuote,
  updateQuote,
} from "@/redux/rtk/features/quote/quoteSlice";
import { loadAllQuoteStage } from "@/redux/rtk/features/CRM/QuoteStage/QuoteStageSlice";
import { loadProduct } from "@/redux/rtk/features/product/productSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import Products from "./Products";
import { useParams } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";

export default function UpdateQuote({ createAs }) {
  const { id } = useParams();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [afterDiscount, setAfterDiscount] = useState(0);
  const [loader, setLoader] = useState(false);
  const allStaff = useSelector((state) => state.users.list);
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company
  );
  const { list: contactList, loading: contactLoading } = useSelector(
    (state) => state.contact
  );

  const { list: opportunityList, loading: opportunityLoading } = useSelector(
    (state) => state.opportunity
  );
  const { list: quoteStageList, loading: quoteStageLoading } = useSelector(
    (state) => state.quoteStage
  );

  const { quote } = useSelector((state) => state.quote);

  const totalCalculator = () => {
    const productArray = form.getFieldValue("quoteProduct");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.unitPrice || 0;
        const vat = current?.productVat || 0;
        const totalVat = (vat / 100) * price * quantity;

        return [
          ...subTotal,
          {
            subVat: current?.productVat || 0,
            subPrice: price * quantity + totalVat,
          },
        ];
      }, []) || [];

    setSubTotal(subTotal);
    const total =
      subTotal.reduce((total, current) => total + current.subPrice, 0) || 0;

    setTotal(total);

    const afterDiscount = total
      ? total - (form.getFieldValue("discount") || 0) || 0
      : 0;
    setAfterDiscount(afterDiscount);
  };

  useEffect(() => {
    dispatch(loadAllOpportunity());
    dispatch(loadAllCompany());
    dispatch(loadAllContact());
    dispatch(loadAllQuoteStage());
    dispatch(loadAllStaff({ query: "all" }));
    dispatch(loadProduct({ query: "all" }));
    dispatch(loadSingleQuote(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (quote) {
      form.setFieldsValue({
        quoteName: quote?.quoteName || "",
        quoteOwnerId: quote?.quoteOwnerId || "",
        quoteDate: dayjs(quote?.quoteDate),
        expirationDate: dayjs(quote?.expirationDate),
        companyId: quote?.companyId || "",
        opportunityId: quote?.opportunityId || "",
        contactId: quote?.contactId || "",
        quoteStageId: quote?.quoteStageId || "",
        termsAndConditions: quote?.termsAndConditions || "",
        description: quote?.description || "",
        quoteProduct: quote?.quoteProduct,
        discount: quote?.discount,
      });
      totalCalculator();
    }
  }, [quote, form]);

  const onFinish = async (values) => {
    setLoader(true);
    const formattedValues = {
      ...values,
      quoteDate: values.quoteDate ? dayjs(values.quoteDate) : null,
      expirationDate: values.expirationDate
        ? dayjs(values.expirationDate)
        : null,
    };
    console.log(values);
    const resp = await dispatch(
      updateQuote({ id: id, values: formattedValues })
    );

    setLoader(false);
  };

  return (
    <div className="px-5">
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        size="large"
        autoComplete="off"
        layout="vertical">
        <div className="-mt-5 flex justify-between gap-8">
          <Form.Item label="Quote name" name="quoteName" className="w-full">
            <Input />
          </Form.Item>
          <Form.Item label="Quote owner" name="quoteOwnerId" className="w-full">
            <Select
              className="w-full"
              loading={!allStaff}
              showSearch
              placeholder="Select a customer "
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }>
              {allStaff &&
                allStaff?.map((sup) => (
                  <Select.Option key={sup.id} value={sup.id}>
                    {sup.username}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <div className="-mt-5 flex justify-between gap-8">
          <Form.Item label="Quote date" name="quoteDate" className="w-full">
            <DatePicker placeholder="Select Quotation date" />
          </Form.Item>

          <Form.Item
            label="Expiration date"
            name="expirationDate"
            className="w-full">
            <DatePicker placeholder="Select Expiration Date" />
          </Form.Item>
        </div>
        <div className="-mt-5 flex gap-8">
          <Form.Item label="Company" name="companyId" className="w-1/2">
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
          <Form.Item label="Opportunity" name="opportunityId" className="w-1/2">
            <Select
              style={{ width: "100%" }}
              loading={opportunityLoading}
              allowClear
              showSearch
              placeholder="Select opportunity"
              disabled={createAs?.name === "opportunityId"}>
              {opportunityList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.opportunityName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="-mt-5 flex justify-between gap-8">
          <Form.Item label="Contact" name="contactId" className="w-1/2">
            <Select
              style={{ width: "100%" }}
              loading={contactLoading}
              allowClear
              showSearch
              placeholder="Select contact name"
              disabled={createAs?.name === "contactId"}>
              {contactList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.firstName} {item?.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quote stage" name="quoteStageId" className="w-1/2">
            <Select
              style={{ width: "100%" }}
              loading={quoteStageLoading}
              allowClear
              showSearch
              placeholder="Select opportunity">
              {quoteStageList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.quoteStageName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="-mt-5">
          <Form.Item
            label="Terms and conditions"
            name="termsAndConditions"
            className="w-full">
            <Input placeholder="Terms" />
          </Form.Item>
        </div>
        <div className="-mt-5 ">
          <Form.Item label="Description" name="description" className="w-full">
            <Input.TextArea placeholder="description" rows={3} />
          </Form.Item>
        </div>

        <Products
          form={form}
          totalCalculator={totalCalculator}
          subTotal={subTotal}
          productList={productList}
          productLoading={productLoading}
        />

        <div>
          <div className="flex justify-between my-1 text-[16px] font-medium">
            <span>Total:</span>
            <span className="pr-2">{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center my-1text-[16px] font-medium">
            <span>Discount:</span>
            <Form.Item name="discount">
              <InputNumber
                className="mt-4"
                onChange={() => totalCalculator()}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between my-1 text-[16px] font-medium">
            <span>Total Amount:</span>
            <span className="pr-2">{afterDiscount.toFixed(2)}</span>
          </div>
        </div>

        <div className="">
          <Form.Item style={{ marginTop: "15px" }}>
            <Button block type="primary" htmlType="submit" loading={loader}>
              Update Quotation
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

// UpdateQuote
