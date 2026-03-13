import { Link } from "react-router-dom";

import { loadAllCustomer } from "@/redux/rtk/features/customer/customerSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import {
  clearSaleList,
  loadAllSale,
} from "@/redux/rtk/features/sale/saleSlice";
import Modal from "@/UI/Modal";
import { DatePicker, Tag } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdPayments } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CreateButton from "../Buttons/CreateButton";
import ViewBtn from "../Buttons/ViewBtn";
import DashboardCard from "../Card/DashboardCard";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { dateDiffChecker } from "./DetailSale";
import SaleInvoicePayment from "./SaleInvoicePayment";

const GetAllSale = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    list,
    total,
    loading: saleLoading,
  } = useSelector((state) => state.sales);
  const { list: customerList } = useSelector((state) => state.customers);
  const { list: salePersonList } = useSelector((state) => state.users);

  const [edit, setEdit] = useState(false);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
    startDate: moment().startOf("year").format("YYYY-MM-DD"),
    endDate: moment().endOf("year").format("YYYY-MM-DD"),
    user: "",
  });
  const columns = [
    {
      id: 1,
      title: "Invoice",
      dataIndex: "id",
      key: "id",
      render: (name, { id }) => (
        <Link to={`/admin/sale-invoice/${id}`}>{id}</Link>
      ),
      renderCsv: (id) => id,
    },

    {
      title: "Contact",
      key: "contact",
      dataIndex: "contact",
      render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
      renderCsv: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    },
    {
      title: "Company",
      key: "company",
      dataIndex: "company",
      render: (company) => (company ? company?.companyName : ""),
      renderCsv: (company) => (company ? company?.companyName : ""),
    },
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },

    {
      id: 4,
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => Number(totalAmount).toFixed(2),
      renderCsv: (totalAmount) => Number(totalAmount).toFixed(2),
    },

    {
      id: 7,
      title: "Paid",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (paidAmount) => Number(paidAmount).toFixed(2),
      responsive: ["md"],
      renderCsv: (paidAmount) => Number(paidAmount).toFixed(2),
    },
    {
      id: 6,
      title: "Due",
      dataIndex: "dueAmount",
      key: "dueAmount",
      render: (dueAmount) => Number(dueAmount).toFixed(2),
      renderCsv: (dueAmount) => Number(dueAmount).toFixed(2),
      responsive: ["md"],
    },

    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => (
        <Tag color={paymentStatus === "paid" ? "green" : "red"}>
          {paymentStatus}
        </Tag>
      ),
    },

    {
      id: 6,
      title: "Tax",
      dataIndex: "totalTaxAmount",
      key: "totalTaxAmount",
      render: (totalTaxAmount) => Number(totalTaxAmount).toFixed(2),
      renderCsv: (totalTaxAmount) => Number(totalTaxAmount).toFixed(2),
      responsive: ["md"],
    },

    {
      id: 5,
      title: "Due date",
      dataIndex: "dueDate",
      key: "discount",
      render: (dueDate) =>
        dueDate ? (
          <div className="flex gap-1 items-center">
            {moment(dueDate).format("ll")}
            {dateDiffChecker(dueDate) && (
              <Tag className="text-xs" color="red">
                Overdue
              </Tag>
            )}
          </div>
        ) : null,
      renderCsv: (discount) => Number(discount),
    },
    //Update Supplier Name here

    {
      id: 9,
      title: "Sale Person",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <Link to={`/admin/staff/${user?.id}`}>{user?.username}</Link>
      ),
      renderCsv: (user) => user?.username,
      responsive: ["md"],
    },
    {
      id: 10,
      title: "",
      dataIndex: "id",
      key: "action",
      render: (payment) => [
        {
          label: (
            <ViewBtn title="View" path={`/admin/sale-invoice/${payment?.id}`} />
          ),
          key: "view",
        },
        {
          label: (
            <>
              <span
                onClick={() => {
                  setEdit(payment);
                }}>
                <button
                  className="flex items-center gap-2 rounded disabled:cursor-not-allowed disabled:opacity-50 py-1"
                  disabled={payment?.paymentStatus === "paid"}>
                  <MdPayments className="text-[1rem]" />
                  Make a payment
                </button>
              </span>
            </>
          ),
          key: "edit",
        },
      ],

      csvOff: true,
    },
  ];

  const filters = [
    {
      key: "salePersonId",
      label: "Sale Person",
      type: "select",
      options: salePersonList?.map((item) => ({
        label: item?.username,
        value: item.id,
      })),
      className: "min-w-[120px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "customerId",
      label: "Customer",
      type: "select",
      options: customerList?.map((item) => ({
        label: item?.username,
        value: item?.id,
      })),
      className: "min-w-[100px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "orderStatus",
      label: "Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Received", value: "received" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllCustomer({ query: "all" }));
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(loadAllSale(pageConfig));
    return () => {
      dispatch(clearSaleList());
    };
  }, [dispatch, pageConfig]);

  const onCalendarChange = (dates) => {
    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    setPageConfig((prev) => {
      return {
        ...prev,
        startDate,
        endDate,
      };
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <UserPrivateComponent permission={"readAll-saleInvoice"}>
      <div className="card card-custom mt-2">
        <div className="card-body">
          <DashboardCard
            information={total?._sum}
            count={total?._count?.id}
            isCustomer={true}
          />
          <br />

          <TableComponent
            list={list}
            columns={columns}
            loading={saleLoading}
            total={total?._count?.id}
            setPageConfig={setPageConfig}
            title={"Sale List"}
            filters={filters}
            isSearch
            componentTitle={"Invoice"}
            extra={
              <>
                {" "}
                <div>
                  <RangePicker
                    className="range-picker"
                    onCalendarChange={onCalendarChange}
                    defaultValue={[
                      dayjs(pageConfig.startDate, "YYYY-MM-DD"),
                      dayjs(pageConfig.endDate, "YYYY-MM-DD"),
                    ]}
                  />
                </div>
                <CreateButton
                  path="/admin/sale-invoice/add"
                  title="Create Invoice"
                  permission={"create-saleInvoice"}
                />
              </>
            }
          />
        </div>

        <Modal
          outsideClick={true}
          open={edit}
          title={"Make Payment"}
          onClose={() => setEdit(false)}>
          <SaleInvoicePayment data={edit} onClose={() => setEdit(false)} />
        </Modal>
      </div>
    </UserPrivateComponent>
  );
};

export default GetAllSale;
