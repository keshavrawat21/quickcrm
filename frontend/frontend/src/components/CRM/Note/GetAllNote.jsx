import Modal from "@/UI/Modal";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearEditNote,
  deleteNote,
  editNote,
  loadAllNotePaginated,
} from "@/redux/rtk/features/CRM/note/noteSlice";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddNote from "./AddNote";
import DetailsNote from "./DetailsNote";
import useNoteFilter from "./useNoteFilter";

export default function GetAllCompany() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector((state) => state.note);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const filters = useNoteFilter();

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      render: (title, note) => (
        <span
          className="cursor-pointer"
          onClick={() => dispatch(editNote(note))}>
          {title}
        </span>
      ),
      renderCsv: (title) => title,
    },
    {
      title: "Owner",
      dataIndex: "noteOwner",
      key: "owner",
      render: (noteOwner, item) => (
        <Link to={`/admin/staff/${item?.noteOwnerId}`}>
          {noteOwner?.fullName}
        </Link>
      ),
      renderCsv: (noteOwner) => noteOwner?.fullName,
    },
    {
      title: "company",
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
      render: (quote) =>
        quote?.id ? (
          <Link to={`/admin/quote/${quote?.id}`}>{quote?.quoteName}</Link>
        ) : (
          "-"
        ),
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
    {
      id: 5,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <span
              className="cursor-pointer"
              onClick={() => dispatch(editNote(item))}>
              <button className="flex justify-center items-center gap-2 rounded">
                <EyeOutlined /> View
              </button>
            </span>
          ),
          key: "view",
        },
        {
          label: (
            <CommonDelete
              values={{
                id: item.id,
                status: item.status,
              }}
              title={item.status === "true" ? "Hide" : "Show"}
              permission={"delete-note"}
              deleteThunk={deleteNote}
              loadThunk={loadAllNotePaginated}
              query={pageConfig}
              className="bg-white text-black"
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllNotePaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <UserPrivateComponent permission={"readAll-note"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"note List"}
          isSearch
          filters={filters}
          componentTitle={"Notes"}
          extra={
            <CreateDrawer
              permission={"create-note"}
              title={"Create Note"}
              width={40}>
              <AddNote />
            </CreateDrawer>
          }
        />
      </UserPrivateComponent>

      <Modal
        open={edit}
        onClose={() => {
          dispatch(clearEditNote());
        }}
        className="md:w-[40%]">
        <DetailsNote
          note={edit}
          onClose={() => dispatch(clearEditNote())}
          load={() => dispatch(loadAllNotePaginated(pageConfig))}
        />
      </Modal>
    </>
  );
}
