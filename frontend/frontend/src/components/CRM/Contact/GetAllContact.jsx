import Modal from "@/UI/Modal";
import ViewBtn from "@/components/Buttons/ViewBtn";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deleteContact,
  loadAllContactPaginated,
} from "@/redux/rtk/features/CRM/contact/contactSlice";
import moment from "moment";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddContact from "./AddContact";
import useContactFilter from "./useContactFilter";

export default function GetAllContact() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.contact);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const filters = useContactFilter();

  const [edit, setEdit] = useState();

  const columns = [
    {
      title: "Name",
      key: "name",
      render: ({ firstName, lastName, id }) => (
        <Link to={`/admin/contact/${id}`}>
          {firstName} {lastName}
        </Link>
      ),
      renderCsv: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone number",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Owner",
      dataIndex: "contactOwner",
      key: "owner",
      render: (contactOwner, item) => (
        <Link to={`/admin/staff/${item?.contactOwnerId}`}>
          {contactOwner?.firstName} {contactOwner?.lastName}
        </Link>
      ),
      renderCsv: (contactOwner) =>
        `${contactOwner?.firstName} ${contactOwner?.lastName}`,
    },
    {
      title: "Company",
      key: "Company",
      dataIndex: "company",
      render: (company, item) => (
        <Link to={`/admin/company/${item?.companyId}`}>
          {company?.companyName}
        </Link>
      ),
      renderCsv: (company) => company?.companyName,
    },

    {
      title: "Source",
      key: "contactSource",
      dataIndex: "contactSource",
      render: (contactSource) => contactSource?.contactSourceName,
      renderCsv: (contactSource) => contactSource?.contactSourceName,
    },
    {
      title: "Stage",
      key: "contactStage",
      dataIndex: "contactStage",
      render: (contactStage) => contactStage?.contactStageName,
      renderCsv: (contactStage) => contactStage?.contactStageName,
    },
    {
      title: "Industry",
      key: "Industry",
      dataIndex: "industry",
      render: (industry) => industry?.industryName,
      renderCsv: (industry) => industry?.industryName,
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
    {
      title: "",
      key: "action",
      render: (item) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/contact/${item?.id}`} />,
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
              permission={"delete-account"}
              deleteThunk={deleteContact}
              loadThunk={loadAllContactPaginated}
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
    dispatch(loadAllContactPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <UserPrivateComponent permission={"readAll-contact"}>
      <TableComponent
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        setPageConfig={setPageConfig}
        title={"Contact List"}
        isSearch
        filters={filters}
        componentTitle={"Contacts"}
        extra={
          <CreateDrawer permission={"create-contact"} title={"Create Contact"}>
            <AddContact />
          </CreateDrawer>
        }
      />
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        className="md:w-[40%] px-5 "
        title={"Edit Contact"}>
        <AddContact data={edit} />
      </Modal>
    </UserPrivateComponent>
  );
}
