import TableForLogin from "@/components/Card/TableForLogin";
import React from "react";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
];
const data = [
  {
    key: "1",
    email: "dev@omega.ac",
    password: "12345678",
  },
  // {
  //   key: "2",
  //   username: "staff",
  //   password: "staff",
  // },
];

const CustomerLoginTable = ({ setDefaultValue }) => {
  return (
    <TableForLogin
      setDefaultValue={setDefaultValue}
      columns={columns}
      data={data}
      pagination={false}
    />
  );
};

export default CustomerLoginTable;
