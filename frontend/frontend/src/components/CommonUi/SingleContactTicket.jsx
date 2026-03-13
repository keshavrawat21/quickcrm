import Card from "@/UI/Card";
import Table from "@/UI/Table";
import { Tag, Tooltip } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function SingleContactTicket({
  data,
  loading,
  name,
  singleLoadThunk,
}) {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

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
    // {
    //   title: "Action",
    //   dataIndex: "ticketId",
    //   key: "action",
    //   render: (ticketId) => (
    //     <div className='flex justify-start'>
    //       <ViewBtn path={`/support/ticket/${ticketId}`} />
    //     </div>
    //   ),
    // },
  ];
  return (
    <Card
      className="border-none"
      title={
        <div className="flex items-center gap-2">
          <span className="font-bold">Tickets</span>
        </div>
      }
      bodyStyle={{ padding: 0 }}>
      <div>
        <UserPrivateComponent permission="readAll-quote">
          <Table
            bordered
            columns={columns}
            loading={loading}
            data={data ? data.ticket : []}
          />
        </UserPrivateComponent>
      </div>
    </Card>
  );
}
