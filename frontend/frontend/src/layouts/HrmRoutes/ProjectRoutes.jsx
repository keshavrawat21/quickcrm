import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllProject = lazy(() =>
  import("@/components/CRM/Project/Project/GetAllProject")
);
const GetAllTeam = lazy(() =>
  import("@/components/CRM/Project/Team/GetAllTeam")
);

const DetailsTeam = lazy(() =>
  import("@/components/CRM/Project/Team/DetailsTeam")
);

const KanbanBoard2 = lazy(() =>
  import("@/components/CRM/Project/kanbanBoard/KanbanBoard2")
);
const GetAllMilestone = lazy(() =>
  import("@/components/CRM/Project/Milestone/GetAllMilestone")
);
const UpdateMilestone = lazy(() =>
  import("@/components/CRM/Project/Milestone/UpdateMilestone")
);
const GetAllTaskStatus = lazy(() =>
  import("@/components/CRM/Project/TaskStatus/GetAllTaskStatus")
);
const UpdateTaskStatus = lazy(() =>
  import("@/components/CRM/Project/TaskStatus/UpdateTaskStatus")
);
const UpdateProject = lazy(() =>
  import("@/components/CRM/Project/Project/UpdateProject")
);
const UpdateStatus = lazy(() =>
  import("@/components/CRM/Project/Project/UpdateStatus")
);
const ProjectRoutes = [
  <Route
    path="project"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-project"}>
          <GetAllProject />
        </PermissionChecker>
      </Suspense>
    }
    key="project"
  />,
  <Route
    path="project/update/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-project"}>
          <UpdateProject />
        </PermissionChecker>
      </Suspense>
    }
    key="project-update"
  />,
  <Route
    path="project/status/update/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-project"}>
          <UpdateStatus />
        </PermissionChecker>
      </Suspense>
    }
    key="project-update-status"
  />,
  <Route
    path="project/kanban/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-project"}>
          <KanbanBoard2 />
        </PermissionChecker>
      </Suspense>
    }
    key="project-kanban"
  />,
  <Route
    path="project/milestone/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-milestone"}>
          <GetAllMilestone />
        </PermissionChecker>
      </Suspense>
    }
    key="project-milestone"
  />,
  <Route
    path="project/milestone/update/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-milestone"}>
          <UpdateMilestone />
        </PermissionChecker>
      </Suspense>
    }
    key="project-milestone-update"
  />,
  <Route
    path="project/task-status/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-taskStatus"}>
          <GetAllTaskStatus />
        </PermissionChecker>
      </Suspense>
    }
    key="project-taskStatus"
  />,
  <Route
    path="project/task-status/update/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-taskStatus"}>
          <UpdateTaskStatus />
        </PermissionChecker>
      </Suspense>
    }
    key="project-tasks-status-update"
  />,
  <Route
    path="team"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-team"}>
          <GetAllTeam />
        </PermissionChecker>
      </Suspense>
    }
    key="team"
  />,
  <Route
    path="team/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-team"}>
          <DetailsTeam />
        </PermissionChecker>
      </Suspense>
    }
    key="team"
  />,
  // <Route
  //   path="task-priority"
  //   element={
  //     <Suspense fallback={<Loader />}>
  //       <PermissionChecker permission={"readAll-priority"}>
  //         <GetAllTaskPriority />
  //       </PermissionChecker>
  //     </Suspense>
  //   }
  //   key="task-priority-hrm"
  // />,
];
export default ProjectRoutes;
