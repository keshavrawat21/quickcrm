import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

export default function useSaleRoutes() {
  const PermissionChecker = lazy(() =>
    import("@/components/PrivacyComponent/PermissionChecker")
  );

  const GetAllSale = lazy(() => import("@/components/SaleInvoice/GetAllSale"));
  const AddSale = lazy(() => import("@/components/SaleInvoice/AddSale"));
  const DetailSale = lazy(() => import("@/components/SaleInvoice/DetailSale"));

  const routes = [
    <Route
      path="sale-invoice"
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readAll-saleInvoice"}>
            <GetAllSale />
          </PermissionChecker>
        </Suspense>
      }
      key="sale"
    />,
    <Route
      path="sale-invoice/add"
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"create-saleInvoice"}>
            <AddSale />
          </PermissionChecker>
        </Suspense>
      }
      key="sale-add"
    />,

    <Route
      path="sale-invoice/:id"
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readSingle-saleInvoice"}>
            <DetailSale />
          </PermissionChecker>
        </Suspense>
      }
      key="sale-add"
    />,
  ];

  return routes;
}
