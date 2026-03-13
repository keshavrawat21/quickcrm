import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

const SaleInvoicePayment = lazy(() =>
  import("@/components/SaleInvoice/SaleInvoicePayment")
);
const AddSupPaymentByInvoice = lazy(() =>
  import("@/components/Payment/SupplierPaymentByInvoice")
);
const GetAllPaymentMethod = lazy(() =>
  import("@/components/PaymentMethod/GetAllPaymentMethod")
);
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);

const PaymentRoutes = [
  <Route
    path="payment/supplier/:pid"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-paymentPurchaseInvoice"}>
          <AddSupPaymentByInvoice />
        </PermissionChecker>
      </Suspense>
    }
    key="payment-supplier"
  />,

  <Route
    path="sale-invoice/:pid"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-paymentSaleInvoice"}>
          <SaleInvoicePayment />
        </PermissionChecker>
      </Suspense>
    }
    key="payment-customer"
  />,

  <Route
    path="payment-method"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-paymentMethod"}>
          <GetAllPaymentMethod />
        </PermissionChecker>
      </Suspense>
    }
    key="payment-method"
  />,
];

export default PaymentRoutes;
