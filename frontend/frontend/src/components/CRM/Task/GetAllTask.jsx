import ViewBtn from "@/components/Buttons/ViewBtn";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deleteTask,
  loadAllTaskPaginated,
} from "@/redux/rtk/features/CRM/task/taskSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddTask from "./AddTask";

export default function GetAllTask() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.task);
  const [pageConfig, setPageConfig] = useState({
    status: true,
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      key: "Name",
      render: ({ name, id }) => <Link to={`/admin/task/${id}`}>{name}</Link>,
      renderCsv: ({ name }) => name,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => (priority ? priority.name : ""),
      renderCsv: (priority) => (priority ? priority.name : ""),
    },
    {
      title: "Status",
      dataIndex: "crmTaskStatus",
      render: (crmTaskStatus) => crmTaskStatus?.taskStatusName ?? "",
      renderCsv: (crmTaskStatus) => crmTaskStatus?.taskStatusName ?? "",
    },
    {
      title: "Type",
      dataIndex: "taskType",
      render: (taskType) => taskType?.taskTypeName ?? "",
      renderCsv: (taskType) => taskType?.taskTypeName ?? "",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      render: (assignee, item) => (
        <Link to={`/admin/setup/staffs/${item?.assigneeId}`}>
          {assignee?.firstName} {assignee?.lastName}
        </Link>
      ),
      renderCsv: (assignee) => `${assignee?.firstName} ${assignee?.lastName}`,
    },

    {
      title: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
      renderCsv: (date) => moment(date).format("MMMM Do YYYY"),
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/task/${item?.id}`} />,
          key: "view",
        },
        {
          label: (
            <Link
              to={`/admin/task/${item?.id}`}
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
                id: item.id,
                status: item.status,
              }}
              title={item.status === "true" ? "Hide" : "Show"}
              permission={"delete-projectTask"}
              deleteThunk={deleteTask}
              loadThunk={loadAllTaskPaginated}
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
    dispatch(loadAllTaskPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <UserPrivateComponent permission={"readAll-projectTask"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"Task List"}
          isSearch
          filters={filters}
          componentTitle={"Tasks"}
          extra={
            <CreateDrawer
              permission={"create-projectTask"}
              title={"Create Task"}
              width={60}>
              <AddTask />
            </CreateDrawer>
          }
        />
      </UserPrivateComponent>
    </>
  );
}
