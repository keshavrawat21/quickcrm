import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllContactPaginated } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";
import { useGetLeadSourcesQuery } from "@/redux/rtk/features/leadSource/leadSourceApi";

import Modal from "@/UI/Modal";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import AddLeadSource from "./AddLeadSource";
import UpdateLeadSource from "./UpdateLeadSource";

export default function GetAllLeadSource() {
  const dispatch = useDispatch();

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetLeadSourcesQuery(pageConfig);
  const [edit, setEdit] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "",
      key: "action",
      render: (item) => [
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
              id={item.id}
              title={"Delete"}
              permission={"delete-leadSource"}
              deleteThunk={apiSlice.endpoints.deleteLeadSource.initiate}
              query={pageConfig}
              className="bg-white text-black"
            />
          ),
          key: "delete",
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(loadAllContactPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <UserPrivateComponent permission={"readAll-leadSource"}>
      <TableComponent
        list={data}
        columns={columns}
        loading={isLoading}
        setPageConfig={setPageConfig}
        title={"Lead Source List"}
        componentTitle={"Lead Source"}
        extra={
          <CreateDrawer
            permission={"create-leadSource"}
            title={"Create Lead Source"}
            width={30}>
            <AddLeadSource />
          </CreateDrawer>
        }
      />
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        className=" px-5 "
        title={"Edit Lead Source"}>
        <UpdateLeadSource data={edit} />
      </Modal>
    </UserPrivateComponent>
  );
}
