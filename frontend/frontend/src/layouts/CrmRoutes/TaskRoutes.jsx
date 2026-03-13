import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const GetAllTaskType = lazy(
  () => import("@/components/CRM/Setup/TaskSetup/TaskType/GetAllTaskType"),
);
const GetAllTaskStatus = lazy(
  () => import("@/components/CRM/Setup/TaskSetup/TaskStatus/GetAllTaskStatus"),
);

const GetAllTask = lazy(() => import("@/components/CRM/Task/GetAllTask"));

const TaskDetails = lazy(() => import("@/components/CRM/Task/TaskDetails"));

const TaskRoutes = [
  <Route
    path="task"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-projectTask"}>
          <GetAllTask />  
        </PermissionChecker>
      </Suspense>
    }
    key="task"
  />,
  <Route
    path="task/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-projectTask"}>
          <TaskDetails />
        </PermissionChecker>
      </Suspense>
    }
    key="task-details"
  />,
  <Route
    path="task-type"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-taskType"}>
          <GetAllTaskType />
        </PermissionChecker>
      </Suspense>
    }
    key="task-type"
  />,
  <Route
    path="task-status"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission="readAll-taskStatus">
          <GetAllTaskStatus />
        </PermissionChecker>
      </Suspense>
    }
    key="task-status"
  />,
];
export default TaskRoutes;
