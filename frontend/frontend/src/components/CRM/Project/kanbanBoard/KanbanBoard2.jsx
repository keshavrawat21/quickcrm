import { useEffect, useState } from "react";
import { Tag } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import Task from "./Task";
import Loader from "@/components/Loader/Loader";
import TaskAddSinglePopup from "@/components/UI/PopUp/ProjectManagemnet/TaskAddSinglePopup";

import AddColumn from "./AddColumn";
import DeleteColumn from "./DeleteColumn";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllTaskStatusByProjectIdQuery } from "@/redux/rtk/features/hrm/projectManagement/project/taskStatus/taskStatusApi";
import {
  useDeleteProjectTaskMutation,
  useUpdateProjectTaskStatusMutation,
} from "@/redux/rtk/features/hrm/projectManagement/project/projectTask/projectTaskApi";
import { editTask } from "@/redux/rtk/features/CRM/task/taskSlice";
import TaskModal from "./TaskModal";
import usePermissions from "@/utils/usePermissions";

export default function KanbanBoard2() {
  const projectId = useParams().id;

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { data: list, isLoading: loading } =
    useGetAllTaskStatusByProjectIdQuery(projectId);
  const [updateProjectTaskStatus] = useUpdateProjectTaskStatusMutation();
  const [deleteProjectTasks, { isLoading }] = useDeleteProjectTaskMutation();

  const [btnId, setBtnId] = useState(null);

  const { permissions } = usePermissions();
  const hasPermission = permissions?.includes(
    "create-task" && "update-projectTask"
  );

  useEffect(() => {
    if (list) {
      setData(list);
    }
  }, [list]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
    } else {
      const sourceColumn = data.find(
        (column) => "column" + column.id === source.droppableId
      );
      const destinationColumn = data.find(
        (column) => "column" + column.id === destination.droppableId
      );

      if (sourceColumn === destinationColumn) {
        const newTask = Array.from(sourceColumn.tasks);
        sourceColumn.tasks.map((task) => {
          if ("task" + task.id === draggableId) {
            newTask.splice(source.index, 1);
            newTask.splice(destination.index, 0, task);
          }
        });
        const newColumn = {
          ...sourceColumn,
          tasks: newTask,
        };
        const newColumns = data.map((column) => {
          if (column.id === newColumn.id) {
            return newColumn;
          }
          return column;
        });
        setData(newColumns);
      } else {
        const sourceTask = Array.from(sourceColumn.tasks);
        sourceTask.splice(source.index, 1);

        const newSourceColumn = {
          ...sourceColumn,
          tasks: sourceTask,
        };

        const destinationTask = Array.from(destinationColumn.tasks);
        sourceColumn.tasks.map((task) => {
          if ("task" + task.id === draggableId) {
            destinationTask.splice(destination.index, 0, task);
          }
        });

        const newDestinationColumn = {
          ...destinationColumn,
          tasks: destinationTask,
        };

        const newColumns = data.map((column) => {
          if (column.id === newSourceColumn.id) {
            return newSourceColumn;
          } else if (column.id === newDestinationColumn.id) {
            return newDestinationColumn;
          } else {
            return column;
          }
        });
        setData(newColumns);
      }

      const statusId = draggableId.split("task")[1];
      const taskStatusId = destination.droppableId.split("column")[1];
      // make json data
      const sendData = {
        taskStatusId: taskStatusId,
      };
      updateProjectTaskStatus({ id: statusId, values: sendData });
    }
  };

  const handleDeleteTask = async (taskId) => {
    setBtnId(taskId);

    const res = await deleteProjectTasks(taskId);
    if (res.data && !res.error) {
      setBtnId(0);
    } else {
      setBtnId(0);
    }
  };

  const { edit } = useSelector((state) => state.task);

  return (
    <>
      <div className="h-[calc(100vh-144px)]">
        {/* {!hasPermission && (
          <div className="max-w-[500px] mx-auto mb-4 p-4 bg-amber-50 border border-amber-300 rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-amber-800 font-medium">
                You need{" "}
                <span className="font-semibold">&rdquo;Create Task&rdquo;</span>{" "}
                and{" "}
                <span className="font-semibold">
                  &rdquo;Update ProjectTask&rdquo;
                </span>{" "}
                permissions to continue.
              </p>
            </div>
          </div>
        )} */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold antialiased">
            {list?.[0]?.project?.name}
            <Tag className="ml-2">{list?.[0]?.project?.status} </Tag>
          </h1>
          <AddColumn projectId={projectId} />
        </div>
        {list?.length > 0 ? (
          <div className="flex overflow-x-auto" style={{ height: "100%" }}>
            <DragDropContext onDragEnd={handleDragEnd}>
              {data.map((column, columnIndex) => (
                <div
                  key={column.id}
                  className="p-2"
                  style={{ width: "400px", height: "100%" }}
                >
                  <div
                    className="shadow-sm p-3 bg-[#F5F4F4] rounded-lg"
                    style={{ height: "100%" }}
                  >
                    <Droppable
                      droppableId={"column" + column.id}
                      key={"column" + column.id}
                    >
                      {(provided, snapshot) => (
                        <ul
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="space-y-2 "
                          style={{ height: "100%" }}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold txt-color-2 capitalize">
                              {column.name}
                            </h2>
                            <div className="flex items-center">
                              <TaskAddSinglePopup
                                className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
                                projectId={projectId}
                                taskStatusId={column.id}
                              >
                                Add Task
                              </TaskAddSinglePopup>
                              <DeleteColumn
                                id={column.id}
                                projectId={projectId}
                              />
                            </div>
                          </div>
                          <div className="overflow-x-hidden overscroll-y-auto h-[calc(100%-40px)]">
                            {column?.tasks?.map((taskS, index) => (
                              <Draggable
                                key={"task" + taskS.id}
                                draggableId={"task" + taskS.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="rounded-lg px-1 py-1 cursor-move flex justify-between items-center"
                                    onClick={() => dispatch(editTask(taskS))}
                                  >
                                    <Task
                                      taskS={taskS}
                                      btnLoading={isLoading}
                                      btnId={btnId}
                                      handleDeleteTask={handleDeleteTask}
                                    />
                                  </li>
                                )}
                              </Draggable>
                            ))}
                          </div>
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </div>
                </div>
              ))}
            </DragDropContext>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <div>
              <h1 className="text-3xl font-semibold text-gray-600">
                No Task Found
              </h1>
            </div>
          </div>
        )}
      </div>
      <TaskModal edit={edit} />
    </>
  );
}
