import ViewBtn from "@/components/Buttons/ViewBtn";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deleteCompany,
  loadAllCompanyPaginated,
} from "@/redux/rtk/features/CRM/company/companySlice";
import Modal from "@/UI/Modal";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddCompany from "./AddCompany";
import UpdateCompany from "./UpdateComapny";
import useCompanyFilter from "./useCompanyFilter";

export default function GetAllCompany() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.company);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const [edit, setEdit] = useState();
  const filters = useCompanyFilter();

  const columns = [
    {
      title: "Name",
      key: "COMPANY NAME",
      dataIndex: "companyName",
      render: (companyName, { id }) => (
        <Link to={`/admin/company/${id}`}>{companyName}</Link>
      ),
      renderCsv: (companyName) => companyName,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Owner",
      dataIndex: "companyOwner",
      key: "owner",
      render: (companyOwner, item) => (
        <Link to={`/admin/staff/${item?.companyOwnerId}`}>
          {companyOwner.firstName} {companyOwner.lastName}
        </Link>
      ),
      renderCsv: (companyOwner) =>
        `${companyOwner.firstName} ${companyOwner.lastName}`,
    },

    {
      title: "Type",
      dataIndex: "companyType",
      render: (companyType) => companyType?.companyTypeName,
      renderCsv: (companyType) => companyType?.companyTypeName,
    },
    {
      title: "Size",
      dataIndex: "companySize",
      key: "companySize",
    },

    {
      title: "Annual Revenue",
      dataIndex: "annualRevenue",
      key: "annualRevenue",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      render: (industry) => industry?.industryName,
      renderCsv: (industry) => industry?.industryName,
    },
    {
      title: "",
      key: "action",
      render: (item) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/company/${item?.id}`} />,
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
              title={item.status === "true" ? "Hide" : "Show"}
              permission={"delete-company"}
              deleteThunk={deleteCompany}
              loadThunk={loadAllCompanyPaginated}
              query={pageConfig}
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllCompanyPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <UserPrivateComponent permission={"readAll-company"}>
      <TableComponent
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        setPageConfig={setPageConfig}
        title={"company List"}
        isSearch
        filters={filters}
        pageConfig={pageConfig}
        componentTitle={"Company"}
        extra={
          <>
            <CreateDrawer
              permission={"create-company"}
              title={"Create Company"}>
              <AddCompany />
            </CreateDrawer>
          </>
        }
      />

      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        className="md:w-[70%] px-5 "
        title={"Edit Company"}>
        <UpdateCompany data={edit} />
      </Modal>
    </UserPrivateComponent>
  );
}
