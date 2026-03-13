import AddOpportunity from "@/components/CRM/Opportunity/AddOpportunity";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllOpportunityType = lazy(() =>
  import(
    "@/components/CRM/Setup/OpportunitySetup/OpportunityType/GetAllOpportunityType"
  )
);
const GetAllOpportunityStage = lazy(() =>
  import(
    "@/components/CRM/Setup/OpportunitySetup/OpportunityStage/GetAllOpportunityStage"
  )
);
const GetAllOpportunitySource = lazy(() =>
  import(
    "@/components/CRM/Setup/OpportunitySetup/OpportunitySource/GetAllOpportunitySource"
  )
);
const GetAllOpportunity = lazy(() =>
  import("@/components/CRM/Opportunity/GetAllOpportunity")
);

const DetailsOpportunity = lazy(() =>
  import("@/components/CRM/Opportunity/DetailsOpportunity")
);
const OpportunityRoutes = [
  <Route
    path="opportunity"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-opportunity"}>
          <GetAllOpportunity />
        </PermissionChecker>
      </Suspense>
    }
    key="opportunity"
  />,
  <Route
    path="opportunity/add"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-opportunity"}>
          <AddOpportunity />
        </PermissionChecker>
      </Suspense>
    }
    key="opportunity"
  />,
  <Route
    path="opportunity/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-opportunity"}>
          <DetailsOpportunity />
        </PermissionChecker>
      </Suspense>
    }
    key="opportunity-Details"
  />,

  <Route
    path="opportunity-type"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-opportunityType"}>
          <GetAllOpportunityType />
        </PermissionChecker>
      </Suspense>
    }
    key="opportunity-type"
  />,
  <Route
    path="opportunity-stage"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-opportunityStage"}>
          <GetAllOpportunityStage />
        </PermissionChecker>
      </Suspense>
    }
    key="opportunity-stage"
  />,
  <Route
    path="opportunity-source"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-opportunitySource"}>
          <GetAllOpportunitySource />
        </PermissionChecker>
      </Suspense>
    }
    key="opportunity-source"
  />,
];

export default OpportunityRoutes;
