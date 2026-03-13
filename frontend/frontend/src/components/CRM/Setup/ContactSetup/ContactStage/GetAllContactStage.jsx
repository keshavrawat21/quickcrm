import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearContactStageEdit,
  deleteContactStage,
  editContactStage,
  loadAllContactStage,
} from "@/redux/rtk/features/CRM/contactStage/contactStageSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddContactStage from "./AddContactStage";

export default function GetAllContactStage() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.contactStage
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "contactStageName",
    },
    {
      title: "CREATE DATE",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
    },
    {
      title: "UPDATE DATE",
      dataIndex: "updatedAt",
      render: (date) => moment(date).format("ll"),
    },
    {
      id: 3,
      title: "",
      key: "action",
      render: ({ id, contactStageName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(editContactStage({ id, values: { contactStageName } }))
              }
              className="flex items-center gap-2 cursor-pointer">
              <EditOutlined className=" rounded-md" />
              Edit
            </div>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              id={id}
              title={"delete"}
              permission={"delete-contactStage"}
              deleteThunk={deleteContactStage}
              loadThunk={loadAllContactStage}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllContactStage());
  }, [dispatch]);

  return (
    <>
      <UserPrivateComponent permission={"readAll-contactStage"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          title={"Contact Stage List"}
          isSearch={false}
          componentTitle={"Contact Stages"}
          extra={
            <CreateDrawer
              permission={"create-contactStage"}
              title={"Create Contact Stage"}
              width={35}>
              <AddContactStage />
            </CreateDrawer>
          }
        />
      </UserPrivateComponent>
      <UpdateDrawer
        permission={"update-contactStage"}
        title={"Update Contact Stage"}
        width={35}
        open={edit}
        setClose={clearContactStageEdit}>
        <AddContactStage edit={edit} />
      </UpdateDrawer>
    </>
  );
}
