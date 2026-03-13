import ViewBtn from "@/components/Buttons/ViewBtn";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllTicketPaginated } from "@/redux/rtk/features/CRM/ticket/ticketSlice";
import { loadAllTicketStatus } from "@/redux/rtk/features/CRM/ticketStatus/ticketStatusSlice";
import { Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateBtn from "./CreateBtn";

export default function GetAllContact() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.ticket);
  const { list: ticketStatus } = useSelector((state) => state.ticketStatus);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "ID",
      key: "ticketId",
      dataIndex: "ticketId",
      render: (ticketId) => (
        <Link to={`/admin/ticket/${ticketId}`}>{ticketId}</Link>
      ),
      renderCsv: (ticketId) => ticketId,
    },
    {
      title: "Customer",
      key: "customer",

      render: (customer) =>
        customer?.customer?.firstName
          ? customer?.customer?.firstName
          : customer?.email,
      renderCsv: (customer) =>
        customer?.customer?.firstName
          ? customer?.customer?.firstName
          : customer?.email,
    },

    {
      title: "Subject",
      key: "subject",
      dataIndex: "subject",
    },
    {
      title: "Category",
      key: "ticketCategory",
      dataIndex: "ticketCategory",
      render: (ticketCategory) =>
        ticketCategory ? (
          <Tag color="blue">{ticketCategory?.ticketCategoryName}</Tag>
        ) : (
          "-"
        ),
      renderCsv: (ticketCategory) => ticketCategory?.ticketCategoryName,
    },
    {
      title: "Status",
      dataIndex: "ticketStatus",
      key: "ticketStatus",
      render: (ticketStatus) => (
        <Tag color="red">{ticketStatus?.ticketStatusName}</Tag>
      ),
      renderCsv: (ticketStatus) => ticketStatus?.ticketStatusName,
    },
    {
      title: "priority",
      key: " priority",
      dataIndex: "priority",
      render: (priority) =>
        priority ? <Tag color="green">{priority?.name}</Tag> : "-",
      renderCsv: (priority) => priority?.name,
    },

    {
      title: "Resolve Time",
      key: "resolveTime",
      dataIndex: "ticketResolveTime",
      render: (ticketResolveTime) => {
        // in resolve time we have minutes so we need to convert it to hours and minutes

        return (
          // if hours is 0 then we will show only minutes
          <Tooltip title={"Resolve Time"}>
            {Math.floor(ticketResolveTime / 60) +
              ":" +
              (ticketResolveTime % 60)}
          </Tooltip>
        );
      },
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/ticket/${item?.ticketId}`} />
          ),
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  const filters = [
    {
      key: "ticketStatus",
      label: "Status",
      type: "select",
      options: ticketStatus?.map((item) => ({
        label: item.ticketStatusName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllTicketStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAllTicketPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <div className="flex justify-center items-center mt-5 mb-8">
        <Link to="/admin/ticket/create">
          <CreateBtn />
        </Link>
      </div>

      <UserPrivateComponent permission={"readAll-ticket"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"Ticket List"}
          isSearch
          filters={filters}
          componentTitle={"Tickets"}
        />
      </UserPrivateComponent>
    </>
  );
}
