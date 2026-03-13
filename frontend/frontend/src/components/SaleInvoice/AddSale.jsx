import { Button, DatePicker, Form, Input, Select } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/rtk/features/customer/customerSlice";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import { addSale } from "../../redux/rtk/features/sale/saleSlice";

import useSettings from "@/Hooks/useSettings";
import dayjs from "dayjs";
import { loadAllStaff } from "../../redux/rtk/features/hrm/user/userSlice";

import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import AddCompany from "../CRM/Company/AddCompany";
import AddContact from "../CRM/Contact/AddContact";
import BigDrawer from "../Drawer/BigDrawer";
import SaleInvoiceProduct from "./SaleInvoiceProduct";
import SalePayments from "./SalePayments";

const staffId = Number(localStorage.getItem("id"));

const AddSale = () => {
  const { Option } = Select;
  const { isSaleCommission, currency } = useSettings([
    "isSaleCommission",
    "currency",
  ]);
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);
  const [commissionAmount, setCommissionAmount] = useState(0);
  const [due, setDue] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const roleId = localStorage.getItem("roleId");

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const allCustomer = useSelector((state) => state.customers.list);
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const { list: contactList, loading: contactLoading } = useSelector(
    (state) => state.contact
  );
  const { list: companyList, loading: companyLoading } = useSelector(
    (state) => state.company
  );
  const allStaff = useSelector((state) => state.users.list);

  const onFormSubmit = async (values) => {
    try {
      const mergedObject = values.saleInvoiceProduct.reduce(
        (accumulator, currentObject) => {
          const productId = currentObject.productId;
          if (!accumulator[productId]) {
            accumulator[productId] = { ...currentObject };
          } else {
            accumulator[productId].productQuantity +=
              currentObject.productQuantity;
          }
          return accumulator;
        },
        {}
      );

      const mergedArray = Object.values(mergedObject);

      const productArray = mergedArray.map((item) => {
        const quantity = item?.productQuantity || 0;
        const rate = item?.rate || 0;
        const data = {
          productId: item.productId,
          productQuantity: item.productQuantity,
          productUnitSalePrice: item.rate,
          tax: item.productVat || 0,
          productDiscount: item.productDiscount || 0,
        };
        if (item.discountType === "percentage") {
          data.productDiscount =
            (rate * quantity * item?.productDiscount) / 100;
        }

        return data;
      });

      const data = {
        ...values,
        saleInvoiceProduct: productArray,
        paidAmount: values.paidAmount || [],
      };

      const resp = await dispatch(addSale(data));
      if (resp.payload.message === "success") {
        const currentDate = form.getFieldValue("date");
        const currentSalesPerson = form.getFieldValue("userId");
        form.resetFields();
        form.setFieldsValue({
          date: currentDate,
          userId: currentSalesPerson,
          saleInvoiceProduct: [{}],
          paymentType: 1,
        });
        setLoader(false);

        // navigate(`/admin/sale/${resp.payload.data.id}`);
      } else {
        setLoader(false);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  // =============================== total calculate===================================
  const totalCalculator = () => {
    const productArray = form.getFieldValue("saleInvoiceProduct");
    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.rate || 0;
        let discount = current?.productDiscount || 0;
        if (current?.discountType === "percentage") {
          discount = (price * quantity * discount) / 100;
        }

        const vat = current?.productVat || 0;
        const subPrice = price * quantity - discount;
        const totalVat = (vat / 100) * subPrice;

        return [
          ...subTotal,
          { subDiscount: discount, subVatAmount: totalVat, subPrice },
        ];
      }, []) || [];

    setSubTotal(subTotal);

    const total = subTotal.reduce((acc, item) => {
      return acc + item.subPrice;
    }, 0);
    const totalTaxAmount = subTotal.reduce((acc, item) => {
      return acc + item.subVatAmount;
    }, 0);
    const totalPayable = total + totalTaxAmount;
    const paidAmountArray = form.getFieldValue("paidAmount") || [];
    const paidAmount = paidAmountArray?.reduce((acc, item) => {
      return acc + (item.amount ? Number(item.amount) : 0);
    }, 0);
    const due = totalPayable - paidAmount;
    setDue(due);

    const type = form.getFieldValue("commissionType");
    const value = form.getFieldValue("saleCommission");

    if (type === "percentage") {
      const totalCommission = (total * parseInt(value)) / 100;
      setCommissionAmount(totalCommission);
    } else {
      setCommissionAmount(value);
    }
  };

  const customer = allCustomer?.find((item) => item.id === selectedCustomer);
  const total = subTotal.reduce((acc, item) => {
    return acc + item.subPrice;
  }, 0);
  const totalTaxAmount = subTotal.reduce((acc, item) => {
    return acc + item.subVatAmount;
  }, 0);
  const totalDiscount = subTotal.reduce((acc, item) => {
    return acc + item.subDiscount;
  }, 0);

  const totalPayable = total + totalTaxAmount;

  const handleUserChange = (value) => {
    const selectedSalesman = allStaff.find((staff) => staff.id === value);
    form.setFieldsValue({
      commissionType: selectedSalesman?.commissionType || "flat",
      saleCommission: selectedSalesman?.commissionValue,
    });

    if (selectedSalesman.commissionType === "percentage") {
      const totalCommission =
        (total * Number(selectedSalesman.commissionValue)) / 100;
      setCommissionAmount(totalCommission);
    } else {
      setCommissionAmount(selectedSalesman.commissionValue);
    }
  };

  useEffect(() => {
    dispatch(loadAllStaff({ status: "true", page: 1, count: 1000 }));
    dispatch(loadAllCustomer({ page: 1, count: 100 }));
    dispatch(loadProduct({ page: 1, count: 100, status: "true" }));

    dispatch(loadAllContact());
    dispatch(loadAllCompany());
  }, [dispatch]);

  useEffect(() => {
    const selectedSalesman = allStaff?.find((staff) => staff.id === staffId);
    form.setFieldsValue({
      commissionType: selectedSalesman?.commissionType || "flat",
      saleCommission: selectedSalesman?.commissionValue,
    });
  }, [allStaff, form]);

  useEffect(() => {
    if (roleId) {
      form.setFieldsValue({
        userId: parseInt(roleId),
      });
    }
  }, [form, roleId]);

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFormSubmit}
      onFinishFailed={() => {
        setLoader(false);
      }}
      layout="vertical"
      size="large"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      autoComplete="off"
      initialValues={{
        discount: 0,
        date: dayjs(),
        vatId: [],
        saleInvoiceProduct: [{}],
        paymentType: 1,
      }}>
      <div className="flex flex-col lg:flex-row gap-2 2xl:h-[calc(100vh-100px)] min-h-[500px]">
        <div className="w-full lg:w-[70%] 2xl:w-[75%]">
          <SaleInvoiceProduct
            form={form}
            totalCalculator={totalCalculator}
            subTotal={subTotal}
            productList={productList}
            productLoading={productLoading}
          />
        </div>
        <div className="flex flex-col w-full lg:w-[30%] 2xl:w-[25%] 2xl:h-[calc(100vh-80px)]">
          <div className="flex-grow 2xl:overflow-y-auto 2xl:overflow-x-hidden pl-0 lg:pl-2">
            <Form.Item
              label={
                <>
                  Contact
                  <BigDrawer width={75} title={"new Contact"}>
                    <AddContact drawer={true} />
                  </BigDrawer>
                </>
              }
              className="w-full mb-0"
              name="contactId"
              rules={[
                {
                  required: true,
                  message: "Please Select a Contact!",
                },
              ]}>
              <Select
                className="w-full"
                loading={contactLoading}
                showSearch
                placeholder="Select a Contact "
                optionFilterProp="children"
                filterOption={(input, option) =>
                  String(option.children)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }>
                {contactList &&
                  contactList?.map((con) => (
                    <Option key={con.id} value={con.id}>
                      {con?.firstName} {con?.lastName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <>
                  Company
                  <BigDrawer width={75} title={"new Company"}>
                    <AddCompany drawer={true} />
                  </BigDrawer>
                </>
              }
              className="w-full mb-0"
              name="companyId">
              <Select
                className="w-full"
                loading={companyLoading}
                showSearch
                placeholder="Select a Company "
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }>
                {companyList &&
                  companyList?.map((com) => (
                    <Option key={com.id} value={com.id}>
                      {com?.companyName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            {(customer?.address || customer?.phone) && (
              <div className="flex flex-col sm:flex-row sm:justify-between py-1 px-4 gap-1 sm:gap-0">
                <span>
                  <span>Address: </span>
                  <span>{customer?.address}</span>{" "}
                </span>
                <span>
                  <span>Phone: </span>
                  <span>{customer?.phone}</span>{" "}
                </span>
              </div>
            )}

            <Form.Item
              label="Date"
              required
              className="w-full mb-0"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}>
              <DatePicker
                className="w-full"
                label="date"
                size="small"
                format={"YYYY-MM-DD"}
              />
            </Form.Item>
            <Form.Item label="Due date" className="w-full mb-0" name="dueDate">
              <DatePicker
                className="w-full"
                label="date"
                size="small"
                format={"YYYY-MM-DD"}
              />
            </Form.Item>

            <Form.Item
              className="w-full mb-0"
              label="Sales Person"
              name="userId">
              <Select
                className="w-full"
                loading={!allStaff}
                showSearch
                placeholder="Select sales person "
                optionFilterProp="children"
                onChange={handleUserChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }>
                {allStaff &&
                  allStaff?.map((info) => (
                    <Option key={info.id} value={info.id}>
                      {info.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item className="mb-0" label="Shipping Address" name="address">
              <Input
                className=""
                placeholder="Enter shipping address"
                size={"small"}
              />
            </Form.Item>

            <Form.Item className="mb-0" label="Note" name="note">
              <Input
                className=""
                size={"small"}
                placeholder="Write sale Note"
                label="note"
              />
            </Form.Item>

            <Form.Item
              className="mb-5"
              label="Terms and conditions"
              name="termsAndConditions">
              <Input
                className=""
                size={"small"}
                placeholder="Write Terms and conditions"
              />
            </Form.Item>
          </div>

          <div className="bg-gray-100 px-2">
            <div className="py-2">
              <div className=" flex justify-between">
                <strong>Total amount: </strong>
                <strong>{Number(total).toFixed(2)} </strong>
              </div>
              <div className=" flex justify-between">
                <span>Total discount: </span>
                <span>{Number(totalDiscount).toFixed(2)} </span>
              </div>

              <div className="py-1 flex justify-between items-center mb-1">
                <span>Total tax amount: </span>
                <span>{Number(totalTaxAmount).toFixed(2)}</span>
              </div>
              <div className="py-1 flex justify-between items-center mb-1">
                <strong>Total Payable: </strong>

                <strong>{Number(totalPayable).toFixed(2)}</strong>
              </div>
              <div className="py-1 mb-1 flex justify-between">
                <strong>Due Amount:</strong>
                <strong>{due.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between mb-2">
                <span className="">Paid Amount: </span>
                <div className="w-[65%] flex items-center justify-between gap-2">
                  <SalePayments totalCalculator={totalCalculator} />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Form.Item className="w-full pb-0">
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={loader}
                  onClick={() => setLoader(true)}>
                  Create Sale
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AddSale;
