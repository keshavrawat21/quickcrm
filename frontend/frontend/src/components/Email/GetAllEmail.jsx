import Modal from "@/UI/Modal";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllEmailPaginated } from "@/redux/rtk/features/email/emailSlice";
import { stringShorter } from "@/utils/functions";
import { Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddEmail from "./AddEmail";
import DetailsEmail from "./DetailsEmail";

export default function GetAllEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const { list, loading, total } = useSelector((state) => state.email);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "Subject",
      key: "Subject",
      render: (email) => (
        <div className="cursor-pointer" onClick={() => setEmail(email)}>
          {stringShorter(email.subject, 30)}
        </div>
      ),
      renderCsv: (email) => stringShorter(email.subject, 30),
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
      renderCsv: (emailOwner) =>
        `${emailOwner?.firstName} ${emailOwner?.lastName}`,
    },

    {
      title: "Company",
      key: "company",
      dataIndex: "company",
      render: (company) => (
        <Link to={`/admin/company/${company?.id}`}>{company?.companyName}</Link>
      ),
      renderCsv: (company) => company?.companyName,
    },
    {
      title: "Contact",
      key: "contact",
      dataIndex: "contact",
      render: (contact) => (
        <Link to={`/admin/contact/${contact?.id}`}>
          {contact?.firstName} {contact?.lastName}
        </Link>
      ),
      renderCsv: (contact) => `${contact?.firstName} ${contact?.lastName}`,
    },
    {
      title: "Opportunity",
      key: "opportunity",
      dataIndex: "opportunity",
      render: (opportunity) => (
        <Link to={`/admin/opportunity/${opportunity?.id}`}>
          {opportunity?.opportunityName}
        </Link>
      ),
      renderCsv: (opportunity) => opportunity?.opportunityName,
    },
    {
      title: "Quote",
      key: "quote",
      dataIndex: "quote",
      render: (quote) => (
        <Link to={`/admin/quote/${quote?.id}`}>{quote?.quoteName}</Link>
      ),
      renderCsv: (quote) => quote?.quoteName,
    },
    {
      title: "Status",
      key: "emailStatus",
      dataIndex: "emailStatus",
      render: (emailStatus) => {
        if (emailStatus === "sent") {
          return <Tag color="green">{emailStatus.toUpperCase()}</Tag>;
        } else if (emailStatus === "failed") {
          return <Tag color="red">{emailStatus.toUpperCase()}</Tag>;
        }
      },
      renderCsv: (emailStatus) => emailStatus,
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
  ];

  useEffect(() => {
    dispatch(loadAllEmailPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <UserPrivateComponent permission={"readAll-email"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"Email List"}
          isSearch
          componentTitle={"Emails"}
          extra={
            <CreateDrawer
              permission={"create-email"}
              title={"Create Email"}
              width={50}>
              <AddEmail />
            </CreateDrawer>
          }
        />
      </UserPrivateComponent>
      <Modal
        open={email}
        onClose={() => setEmail(false)}
        className="md:w-[40%]">
        <DetailsEmail email={email} />
      </Modal>
    </>
  );
}
