import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

const TaxRate = lazy(() => import("@/components/TaxRate"));
const PriceBook = lazy(() => import("@/components/PriceBook"));

const MasterRoutes = [

  <Route
    path="tax-rate"
    element={
      <Suspense fallback={<Loader />}>
        <TaxRate />
      </Suspense>
    }
    key="tax-rate"
  />,

  <Route
    path="price-book"
    element={
      <Suspense fallback={<Loader />}>
        <PriceBook />
      </Suspense>
    }
    key="price-book"
  />

];

export default MasterRoutes;