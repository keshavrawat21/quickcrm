import Loader from "@/components/Loader/Loader";
import Logout from "@/components/User/Logout";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const GetAllMedia = lazy(() => import("@/components/Media/GetAllMedia"));
const Dashboard = lazy(() => import("@/components/CRM/Dashboard/Dashboard"));
const GetAllDeliveryBoy = lazy(() =>
  import("@/components/DeliveryBoy/GetAllDeliveryBoy")
);
const GetAllEmailConfig = lazy(() =>
  import("@/components/EmailConfig/GetAllEmailConfig")
);
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);

const GetAllPriority = lazy(() =>
  import("@/components/Priority/GetAllPriority")
);

const CommonRoutes = [
  <Route
    path="email-config"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-emailConfig"}>
          <GetAllEmailConfig />
        </PermissionChecker>
      </Suspense>
    }
    key="email-config"
  />,

  <Route
    path="delivery-boy"
    element={
      <Suspense fallback={<Loader />}>
        <GetAllDeliveryBoy />
      </Suspense>
    }
    key="delivery-boy"
  />,

  <Route path="auth/logout" exact element={<Logout />} key={"logout"} />,
  <Route
    path="dashboard"
    element={
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    }
    key="dashboard"></Route>,
  <Route
    index
    element={
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    }
    key="ho"
  />,
  <Route
    path="media"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-media"}>
          <GetAllMedia />
        </PermissionChecker>
      </Suspense>
    }
    key="media"
  />,

  <Route
    path="priority"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-priority"}>
          <GetAllPriority />
        </PermissionChecker>
      </Suspense>
    }
    key="priority"
  />,
];
export default CommonRoutes;
