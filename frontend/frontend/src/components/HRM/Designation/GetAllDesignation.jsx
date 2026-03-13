import Modal from "@/UI/Modal";
import ViewBtn from "@/components/Buttons/ViewBtn";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearDesignationList,
  deleteDesignation,
  loadAllDesignation,
} from "@/redux/rtk/features/hrm/designation/designationSlice";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddDesignation from "./AddDesignation";
import UpdateDesignation from "./UpdateDesignation";

const GetAllDesignation = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { list, total, loading } = useSelector((state) => state.designations);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/designation/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/designation/${id}`}>{name}</Link>
      ),
      renderCsv: (name) => name || "N/A",
    },
    {
      id: 3,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/designation/${item?.id}`} />
          ),
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
              values={{
                id: item?.id,
                status: item?.status,
              }}
              title={item?.status === "true" ? "Hide" : "Show"}
              permission={"delete-designation"}
              deleteThunk={deleteDesignation}
              loadThunk={loadAllDesignation}
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
  useEffect(() => {
    dispatch(loadAllDesignation(pageConfig));
    return () => {
      dispatch(clearDesignationList());
    };
  }, [dispatch, pageConfig]);

  return (
    <>
      <UserPrivateComponent permission={"readAll-designation"}>
        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          setPageConfig={setPageConfig}
          paginatedThunk={loadAllDesignation}
          title={"Designation List"}
          filters={filters}
          isSearch
          componentTitle={"Designations"}
          extra={
            <CreateDrawer
              permission={"create-designation"}
              title={"Create Designation"}
              width={35}>
              <AddDesignation />
            </CreateDrawer>
          }
        />
      </UserPrivateComponent>
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        title={"Edit Designation"}>
        <UpdateDesignation
          pageConfig={pageConfig}
          data={edit}
          onClose={() => setEdit(false)}
        />
      </Modal>
    </>
  );
};

export default GetAllDesignation;
