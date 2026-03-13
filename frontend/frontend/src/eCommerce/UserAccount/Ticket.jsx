import { Link } from "react-router-dom";
import { Tag, Tooltip } from "antd";
import TableComponent from "@/components/CommonUi/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllTicketByCustomer } from "@/redux/rtk/features/CRM/ticket/ticketSlice";

export default function Ticket() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.ticket);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "ID",
      key: "ticketId",
      dataIndex: "ticketId",
      render: (ticketId) => <Link to={`/ticket/${ticketId}`}>{ticketId}</Link>,
      renderCsv: (ticketId) => ticketId,
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
      render: (ticketStatus) =>
        ticketStatus ? (
          <Tag color="red">{ticketStatus?.ticketStatusName}</Tag>
        ) : (
          "-"
        ),
      renderCsv: (ticketStatus) => ticketStatus?.ticketStatusName,
    },
    {
      title: "Priority",
      key: " ticketPriority",
      dataIndex: "priority",
      render: (ticketPriority) =>
        ticketPriority ? <Tag color="green">{ticketPriority?.name}</Tag> : "-",
      renderCsv: (ticketPriority) => ticketPriority?.name,
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
  ];

  useEffect(() => {
    dispatch(loadAllTicketByCustomer(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <TableComponent
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        setPageConfig={setPageConfig}
        isSearch={true}
      />
    </>
  );
}
