import LoaderSpinner from "@/components/Loader/LoaderSpinner";
import ButtonHome from "@/eCommerce/Home/ButtonHome";
import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Page404 = lazy(() => import("@/components/StaticPages/404Page"));
const ForgetPassword = lazy(() => import("@/CustomerUI/ForgetPassword"));
const Login = lazy(() => import("@/CustomerUI/Login"));
const User = lazy(() => import("@/CustomerUI/User"));

const PasswordChange = lazy(() =>
  import("@/eCommerce/CommonSection/PasswordChange")
);

const Register = lazy(() => import("@/CustomerUI/Register"));
const TicketDetails = lazy(() =>
  import("@/eCommerce/UserAccount/TicketDetails/DetailsPage")
);
const CreateTicket = lazy(() => import("@/eCommerce/UserAccount/CreateTicket"));
const isLoggedIn = localStorage.getItem("isLogged");

const CustomerRoutes = [
  isLoggedIn ? <Route path="/" element={<Navigate to="/user" />} /> : null,
  <Route index element={<ButtonHome />} key={"index-customer"} />,
  <Route
    path="/login"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <Login />
      </Suspense>
    }
    key={"login/customer"}
  />,
  <Route
    path="/register"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <Register />
      </Suspense>
    }
    key={"register/customer"}
  />,
  <Route
    path="/ticket/:id"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <TicketDetails />
      </Suspense>
    }
    key={"ticket-details-customer"}
  />,
  <Route
    path="/ticket/create"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <CreateTicket />
      </Suspense>
    }
    key={"ticket-details-customer"}
  />,
  <Route
    path="/*"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <Page404 />
      </Suspense>
    }
    key={"404"}
  />,
  <Route
    path="/forget-password"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <ForgetPassword />
      </Suspense>
    }
    key={"forget-password"}
  />,
  <Route
    path="/forget-password/:token"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <PasswordChange />
      </Suspense>
    }
    key={"forget-password-token"}
  />,
  <Route element={<PrivateRoute />} key={"private"}>
    <Route
      path="/user"
      element={
        <Suspense fallback={<LoaderSpinner />}>
          <User />
        </Suspense>
      }
      key={"user-customer"}
    />
  </Route>,
];
export default CustomerRoutes;
