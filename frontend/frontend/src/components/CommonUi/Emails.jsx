import Card from "@/UI/Card";
import Table from "@/UI/Table";
import { PlusOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddEmail from "../Email/AddEmail";
import SingleEmail from "../Email/SingleEmail";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function Emails({ ref, data, loading, name, singleLoadThunk }) {
  // Drawer state
  const [open, setOpen] = useState(false);
  const [singleEmail, setSingleEmail] = useState();
  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Subject",
      key: "Subject",
      render: (email) =>
        email ? (
          <div className="cursor-pointer" onClick={() => setSingleEmail(email)}>
            {email.subject?.length > 20
              ? email.subject.slice(0, 20)
              : email.subject}
          </div>
        ) : (
          "-"
        ),
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: "Owner",
      dataIndex: "emailOwner",
      key: "owner",
      render: (emailOwner, item) => (
        <Link to={`/admin/staff/${item?.emailOwnerId}`}>
          {emailOwner?.firstName} {emailOwner?.lastName}
        </Link>
      ),
    },
    {
      title: "Status",
      key: "emailStatus",
      dataIndex: "emailStatus",
      render: (emailStatus) => <span className="text-green-600">Sent</span>,
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
  ];

  return (
    <Card
      className="border-none"
      title={
        <div className="flex items-center gap-2">
          <span className="font-bold">Emails</span>
          <UserPrivateComponent permission="create-email">
            <PlusOutlined
              onClick={() => setOpen(true)}
              className="bg-primary text-white cursor-pointer rounded-sm text-[14px] p-[2px]"
            />
          </UserPrivateComponent>
        </div>
      }
      bodyStyle={{ padding: 0 }}>
      <div>
        <UserPrivateComponent permission="readAll-email">
          <Table
            bordered
            columns={columns}
            loading={loading}
            data={data ? data.emails : []}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ x: 800, y: 300 }}
          />
        </UserPrivateComponent>
      </div>

      <UserPrivateComponent permission={"readSingle-email"}>
        <Drawer
          onClose={onClose}
          open={open}
          title={"Create Email"}
          width={window.innerWidth <= 768 ? "100%" : "45%"}
          placement="right">
          <AddEmail
            drawer={true}
            createAs={{ name, value: data?.id, singleLoadThunk }}
            data={data}
          />
        </Drawer>
      </UserPrivateComponent>
      <UserPrivateComponent permission={"readSingle-email"}>
        <SingleEmail email={singleEmail} setSingleEmail={setSingleEmail} />
      </UserPrivateComponent>
    </Card>
  );
}
