import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const BalanceSheet = lazy(() => import("@/components/Account/BalanceSheet"));
const DetailAccount = lazy(() => import("@/components/Account/DetailAccount"));
const GetAllAccount = lazy(() => import("@/components/Account/GetAllAccount"));
const IncomeStatement = lazy(() =>
  import("@/components/Account/IncomeStatement")
);
const TrialBalance = lazy(() => import("@/components/Account/TrialBalance"));

const AccountRoutes = [
  <Route
    path="account"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-account"}>
          <GetAllAccount />
        </PermissionChecker>
      </Suspense>
    }
    key="account"
  />,
  <Route
    path="account/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-account"}>
          <DetailAccount />
        </PermissionChecker>
      </Suspense>
    }
    key="account-details"
  />,
  <Route
    path="account/trial-balance"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-account"}>
          <TrialBalance />
        </PermissionChecker>
      </Suspense>
    }
    key="trial-balance"
  />,
  <Route
    path="account/balance-sheet"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-account"}>
          <BalanceSheet />
        </PermissionChecker>
      </Suspense>
    }
    key="balance-sheet"
  />,
  <Route
    path="account/income"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-account"}>
          <IncomeStatement />
        </PermissionChecker>
      </Suspense>
    }
    key="income-statement"
  />,
];

export default AccountRoutes;
