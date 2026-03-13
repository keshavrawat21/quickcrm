import Modal from "@/UI/Modal";
import ViewBtn from "@/components/Buttons/ViewBtn";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";
import { useGetLeadsPaginatedQuery } from "@/redux/rtk/features/leads/leadsApi";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { TbRestore } from "react-icons/tb";
import { Link } from "react-router-dom";
import AddLeads from "./AddLeads";
import UpdateLead from "./UpdateLead";

export default function GetAllLeads() {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetLeadsPaginatedQuery(pageConfig);
  const [edit, setEdit] = useState(false);

  const columns = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
      width: 60,
      fixed: "left",
    },
    {
      title: "Name",
      key: "name",
      width: 150,
      fixed: "left",
      render: (item) => (
        <Link
          to={`/admin/lead/${item?.id}`}
          className="font-medium text-blue-600 hover:underline whitespace-nowrap">
          {item?.name}
        </Link>
      ),
      renderCsv: (item) => item?.name,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: 200,
      render: (val) => (
        <span className="whitespace-nowrap">{val || "—"}</span>
      ),
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      width: 140,
      render: (val) => (
        <span className="whitespace-nowrap">{val || "—"}</span>
      ),
    },
    {
      title: "Lead Owner",
      dataIndex: "leadOwner",
      key: "owner",
      width: 150,
      render: (owner) => (
        <span className="whitespace-nowrap">
          {owner?.firstName} {owner?.lastName}
        </span>
      ),
      renderCsv: (owner) => `${owner?.firstName} ${owner?.lastName}`,
    },
    {
      title: "Status",
      key: "leadStatus",
      dataIndex: "leadStatus",
      width: 120,
      render: (val) => (
        <span className="capitalize whitespace-nowrap">{val || "—"}</span>
      ),
    },
    {
      title: "Lead Value",
      key: "leadValue",
      dataIndex: "leadValue",
      width: 120,
      render: (val) => (
        <span className="whitespace-nowrap">{val ?? "—"}</span>
      ),
    },
    {
      title: "Lead Source",
      key: "leadSource",
      dataIndex: "leadSource",
      width: 140,
      render: (leadSource) => (
        <span className="whitespace-nowrap">{leadSource?.name || "—"}</span>
      ),
      renderCsv: (leadSource) => leadSource?.name,
    },
    {
      title: "Industry Type",
      key: "industryType",
      dataIndex: "industryType",
      width: 160,
      render: (val) => (
        <span className="whitespace-nowrap">{val || "—"}</span>
      ),
      renderCsv: (val) => val || "",
    },
    {
      title: "Products",
      key: "productIds",
      dataIndex: "products",
      width: 200,
      render: (products) =>
        products?.length ? (
          <div className="flex flex-wrap gap-1">
            {products.map((p) => (
              <span
                key={p?.id}
                className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                {p?.name}
              </span>
            ))}
          </div>
        ) : (
          "—"
        ),
      renderCsv: (products) =>
        products?.length ? products.map((p) => p?.name).join(", ") : "",
    },
    {
      title: "Address",
      key: "address",
      width: 260,
      render: (item) => {
        const { country, state, city, addressLine } = item?.address || {};
        const parts = [addressLine, city, state, country].filter(Boolean);
        return parts.length ? (
          <span className="text-gray-600 text-sm">{parts.join(", ")}</span>
        ) : (
          "—"
        );
      },
      renderCsv: (item) => {
        const { country, state, city, addressLine } = item?.address || {};
        return [addressLine, city, state, country].filter(Boolean).join(", ");
      },
    },
    {
      title: "Convert Status",
      key: "isConverted",
      dataIndex: "isConverted",
      width: 140,
      render: (isConverted) => (
        <span
          className={`whitespace-nowrap text-xs font-medium px-2 py-1 rounded-full ${
            isConverted === "true"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}>
          {isConverted === "true" ? "Converted" : "Not Converted"}
        </span>
      ),
      renderCsv: (isConverted) =>
        isConverted === "true" ? "Converted" : "Not Converted",
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      fixed: "right",
      render: (item) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/lead/${item?.id}`} />,
          key: "view",
        },
        {
          label: (
            <span className="cursor-pointer" onClick={() => setEdit(item)}>
              <button className="flex justify-center items-center gap-2 rounded">
                <CiEdit /> Edit
              </button>
            </span>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              values={{ id: item?.id, status: item?.status }}
              title={item?.status === "true" ? "Hide" : "UnHide"}
              permission={"delete-lead"}
              deleteThunk={apiSlice.endpoints.deleteLead.initiate}
              query={pageConfig}
              className="bg-white text-black"
              icon={
                item?.status === "true" ? <AiOutlineDelete /> : <TbRestore />
              }
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  const filters = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];

  return (
    <UserPrivateComponent permission={"readAll-lead"}>
      <TableComponent
        list={data?.getAllLead}
        columns={columns}
        loading={isLoading}
        total={data?.totalLead}
        setPageConfig={setPageConfig}
        title={"Leads List"}
        isSearch
        filters={filters}
        componentTitle={"Leads"}
        scroll={{ x: 1800 }}
        extra={
          <CreateDrawer permission={"create-lead"} title={"Create Lead"}>
            <AddLeads pageConfig={pageConfig} />
          </CreateDrawer>
        }
      />
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        className="md:w-[40%] px-5"
        title={"Edit Lead"}>
        <UpdateLead data={edit} onClose={() => setEdit(false)} />
      </Modal>
    </UserPrivateComponent>
  );
}