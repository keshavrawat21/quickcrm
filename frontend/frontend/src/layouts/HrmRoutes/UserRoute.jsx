import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllStaff = lazy(() => import("@/components/User/GetAllStaff"));
const DetailStaff = lazy(() => import("@/components/User/DetailsStaff"));
const UpdateStaff = lazy(() => import("@/components/User/UpdateStaff"));

const AddStaff = lazy(() => import("@/components/User/AddStaff"));

const UserRoutes = [
  <Route
    path="staff"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-user"}>
          <GetAllStaff />
        </PermissionChecker>
      </Suspense>
    }
    key="staff"
  />,
  <Route
    path="staff/add"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-user"}>
          <AddStaff />
        </PermissionChecker>
      </Suspense>
    }
    key="staff-add"
  />,
  <Route
    path="staff/:id"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-user"}>
          <DetailStaff />
        </PermissionChecker>
      </Suspense>
    }
    key="staff-details"
  />,
  <Route
    path="staff/:id/update"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-user"}>
          <UpdateStaff />
        </PermissionChecker>
      </Suspense>
    }
    key="staff-update"
  />,
];

export default UserRoutes;
