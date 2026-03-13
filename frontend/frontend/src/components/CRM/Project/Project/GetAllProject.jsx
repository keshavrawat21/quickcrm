import KanbanBtn from "@/components/Buttons/KanbanBtn";
import MilestoneBtn from "@/components/Buttons/MilestoneBtn";
import TaskBtn from "@/components/Buttons/TaskBtn";
import UpdateStatusBtn from "@/components/Buttons/UpdateStatusBtn";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";

import Modal from "@/UI/Modal";
import { useGetProjectsByStatusQuery } from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";
import { Tag } from "antd";
import moment from "moment";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import AddProject from "./AddProject";
import UpdateProject from "./UpdateProject";

export default function GetAllProject() {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetProjectsByStatusQuery(pageConfig);

  const [edit, setEdit] = useState();
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
      key: "name",
      render: (item) => (
        <div className="font-semibold flex justify-between items-center">
          <span>{item?.name.toUpperCase()}</span>
          {item?.priority?.name && (
            <Tag className="flex justify-end" color="blue">
              {item.priority.name}
            </Tag>
          )}
        </div>
      ),
      renderCsv: (item) => item?.name,
    },

    {
      id: 3,
      title: "Contact",
      key: "contact",
      render: ({ contact }) =>
        contact
          ? `${contact.firstName} ${contact?.lastName}`.toUpperCase()
          : "",

      renderCsv: ({ projectManager }) =>
        projectManager.firstName + " " + projectManager.lastName,
    },
    {
      title: "Value",
      dataIndex: "projectValue",
      key: "projectValue",
    },
    {
      id: 5,
      title: "Kanban Board",
      dataIndex: "id",
      key: "board",
      render: (id) => <KanbanBtn path={`/admin/project/kanban/${id}`} />,
      csvOff: true,
    },
    {
      id: 4,
      title: "Milestone",
      dataIndex: "id",
      key: "milestone",
      render: (id) => <MilestoneBtn path={`/admin/project/milestone/${id}`} />,
      csvOff: true,
    },
    {
      id: 4,
      title: "Task Status",
      dataIndex: "",
      key: "taskStatus",
      render: ({ id }) => <TaskBtn path={`/admin/project/task-status/${id}`} />,
      csvOff: true,
    },
    {
      id: 4,
      title: "Project Status",
      dataIndex: "",
      key: "projectStatus",
      render: ({ id, projectStatus }) => (
        <UpdateStatusBtn
          status={projectStatus}
          path={`/admin/project/status/update/${id}`}
        />
      ),
      renderCsv: ({ projectStatus }) => projectStatus,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate) => moment(startDate).format("ll"),
      renderCsv: (startDate) => moment(startDate).format("ll"),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      render: (deadline) => moment(deadline).format("ll"),
      renderCsv: (deadline) => moment(deadline).format("ll"),
    },
    {
      id: 3,
      title: "",
      dataIndex: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: (
            <span className="cursor-pointer" onClick={() => setEdit(id)}>
              <button className="flex justify-center items-center gap-2 rounded">
                <CiEdit /> Edit
              </button>
            </span>
          ),
          key: "edit",
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
        { label: "Pending", value: "PENDING" },
        { label: "Progress", value: "PROGRESS" },
        { label: "Complete", value: "COMPLETE" },
        { label: "On-Hold", value: "ONHOLD" },
        { label: "Deleted", value: "DELETED" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  return (
    <UserPrivateComponent permission={"readAll-project"}>
      <TableComponent
        list={data?.getAllProject}
        columns={columns}
        loading={isLoading}
        total={data?.totalProject}
        setPageConfig={setPageConfig}
        title={"Team List"}
        isSearch
        filters={filters}
        componentTitle={"Projects"}
        extra={
          <CreateDrawer
            permission={"create-project"}
            title={"Create Project"}
            width={50}>
            <AddProject />
          </CreateDrawer>
        }
      />
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        className="md:w-[70%] px-5 "
        title={"Edit Project"}>
        <UpdateProject data={edit} onClose={() => setEdit(false)} />
      </Modal>
    </UserPrivateComponent>
  );
}
