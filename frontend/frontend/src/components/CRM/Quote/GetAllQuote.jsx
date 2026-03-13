import ViewBtn from "@/components/Buttons/ViewBtn";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deleteQuote,
  loadAllQuote,
  loadAllQuotePaginated,
} from "@/redux/rtk/features/quote/quoteSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddQuote from "./AddQuote";
import useQuoteFilter from "./useQuoteFilter";

export default function GetAllContact() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.quote);
  const filters = useQuoteFilter();
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const columns = [
    {
      title: "Name",
      key: "quoteName",
      render: ({ quoteName, id }) => (
        <Link to={`/admin/quote/${id}`}>{quoteName}</Link>
      ),
      renderCsv: ({ quoteName }) => quoteName,
    },
    {
      title: "Owner",
      dataIndex: "quoteOwner",
      render: (quoteOwner) => (
        <Link to={`/admin/staff/${quoteOwner.id}`}>{quoteOwner.username}</Link>
      ),
      renderCsv: (quoteOwner) => quoteOwner.username,
    },
    {
      title: "Quotation Date",
      dataIndex: "quoteDate",
      render: (quoteDate) => moment(quoteDate).format("ll"),
      renderCsv: (quoteDate) => moment(quoteDate).format("ll"),
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Company",
      dataIndex: "company",
      render: (company, item) => (
        <Link to={`/admin/company/${item?.companyId}`}>
          {company?.companyName}
        </Link>
      ),
      renderCsv: (company) => company?.companyName,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      render: (contact) => (
        <Link to={`/admin/contact/${contact?.id}`}>
          {`${contact?.firstName} ${contact?.lastName}`}
        </Link>
      ),
      renderCsv: (contact) => `${contact?.firstName} ${contact?.lastName}`,
    },
    {
      title: "Opportunity",
      dataIndex: "opportunity",
      render: (opportunity) => (
        <Link to={`/admin/opportunity/${opportunity?.id}`}>
          {opportunity?.opportunityName}
        </Link>
      ),
      renderCsv: (opportunity) => opportunity?.opportunityName,
    },

    {
      title: "Create Date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
    {
      id: 12,
      title: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/quote/${id}`} />,
          key: "view",
        },
        {
          label: (
            <Link
              to={`/admin/quote/${id}/update`}
              className="flex items-center gap-2 cursor-pointer">
              <EditOutlined className=" rounded-md" />
              Edit
            </Link>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              values={{
                id,
                status,
              }}
              title={status === "true" ? "Hide" : "Show"}
              deleteThunk={deleteQuote}
              loadThunk={loadAllQuote}
              query={pageConfig}
              permission={"delete-quote"}
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];
  useEffect(() => {
    dispatch(loadAllQuotePaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <UserPrivateComponent permission={"readAll-quote"}>
      <TableComponent
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        setPageConfig={setPageConfig}
        title={"Quote List"}
        isSearch
        filters={filters}
        componentTitle={"Quotes"}
        extra={
          <CreateDrawer
            permission={"create-quote"}
            title={"Create Quote"}
            width={70}>
            <AddQuote />
          </CreateDrawer>
        }
      />
    </UserPrivateComponent>
  );
}
