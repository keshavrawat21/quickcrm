import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";

import {
  taskStatusApi,
  useGetAllTaskStatusByProjectIdQuery,
} from "@/redux/rtk/features/hrm/projectManagement/project/taskStatus/taskStatusApi";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import AddTaskStatus from "./AddTaskStatus";

export default function GetAllMilestone() {
  const { id } = useParams();
  const { isLoading, data: list } = useGetAllTaskStatusByProjectIdQuery(id);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      id: 4,
      title: "Start Date",
      key: "project",
      dataIndex: "project",
      render: (project) => moment(project?.startDate).format("ll"),
      renderCsv: (project) => moment(project?.startDate).format("ll"),
    },
    {
      id: 5,
      title: "End Date",
      key: "endDate",
      dataIndex: "project",
      render: (project) => moment(project?.endDate).format("ll"),
      renderCsv: (project) => moment(project?.endDate).format("ll"),
    },
    {
      id: 3,
      title: "",
      key: "action",
      render: ({ id }) => [
        {
          label: (
            <Link
              to={`/admin/project/task-status/update/${id}`}
              className="flex items-center gap-2 cursor-pointer">
              <EditOutlined className=" rounded-md" />
              Edit
            </Link>
          ),
          key: "Update",
        },
        {
          label: (
            <CommonDelete
              className={"bg-white text-black"}
              id={id}
              permission={"delete-taskStatus"}
              deleteThunk={taskStatusApi.endpoints.deleteTaskStatus.initiate}
              title={"Delete"}
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  return (
    <UserPrivateComponent permission={"readAll-taskStatus"}>
      <TableComponent
        list={list}
        columns={columns}
        loading={isLoading}
        title={"Task Status list"}
        isSearch={false}
        componentTitle={"Task Status"}
        extra={
          <CreateDrawer
            permission={"create-taskStatus"}
            title={"Create Task Status"}
            width={30}>
            <AddTaskStatus projectId={id} isFixed={true} />
          </CreateDrawer>
        }
      />
    </UserPrivateComponent>
  );
}
