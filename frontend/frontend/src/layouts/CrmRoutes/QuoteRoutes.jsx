import UpdateQuote from "@/components/CRM/Quote/UpdateQuote";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllQuoteStage = lazy(() =>
  import("@/components/CRM/Setup/QuoteSetup/QuoteStage/GetAllQuoteStage")
);
const GetAllQuote = lazy(() => import("@/components/CRM/Quote/GetAllQuote"));
const DetailsQuote = lazy(() => import("@/components/CRM/Quote/DetailsQuote"));

const QuoteRoutes = [
  <Route
    path="quote"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-quote"}>
          <GetAllQuote />
        </PermissionChecker>
      </Suspense>
    }
    key={"quote"}
  />,
  <Route
    path="quote/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-quote"}>
          <DetailsQuote />
        </PermissionChecker>
      </Suspense>
    }
    key={"quoteDetails"}
  />,
  <Route
    path="quote/:id/update"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-quote"}>
          <UpdateQuote />
        </PermissionChecker>
      </Suspense>
    }
    key="quote-update"
  />,
  <Route
    path="quote-stage"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-quoteStage"}>
          <GetAllQuoteStage />
        </PermissionChecker>
      </Suspense>
    }
    key={"quote-stage"}
  />,
];

export default QuoteRoutes;
