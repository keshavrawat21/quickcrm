import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearPriorityEdit,
  deletePriority,
  editPriority,
  loadAllPriority,
} from "@/redux/rtk/features/priority/prioritySlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPriority from "./AddPriority";
import UpdatePriority from "./UpdatePriority";

export default function GetAllPriority() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector((state) => state.priority);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
    },
    {
      id: 3,
      title: "Color Code",
      dataIndex: "colourValue",
      key: "colourValue",
      render: (colourValue) => (
        <div className="flex">
          <div
            className="rounded border border-gray-200"
            style={{
              marginRight: "10px",
              width: "20px",
              height: "20px",
              backgroundColor: colourValue,
            }}></div>
          {colourValue}
        </div>
      ),
      renderCsv: (colourValue) => colourValue,
    },
    {
      id: 3,
      title: "",
      key: "action",
      render: ({ id, name }) => [
        {
          label: (
            <div
              onClick={() => dispatch(editPriority({ id, values: { name } }))}
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
              permission={"delete-priority"}
              deleteThunk={deletePriority}
              loadThunk={loadAllPriority}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllPriority());
  }, [dispatch]);

  return (
    <UserPrivateComponent permission={"readAll-priority"}>
      <TableComponent
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        title={"Priority List"}
        isSearch={false}
        componentTitle={"Priority"}
        extra={
          <CreateDrawer
            permission={"create-priority"}
            title={"Create priority"}
            width={35}>
            <AddPriority />
          </CreateDrawer>
        }
      />
      <UpdateDrawer
        permission={"update-priority"}
        title={"Update priority"}
        width={40}
        open={edit}
        setClose={clearPriorityEdit}>
        <UpdatePriority edit={edit} />
      </UpdateDrawer>
    </UserPrivateComponent>
  );
}
