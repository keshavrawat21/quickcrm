import DetailsLeads from "@/components/Lead/Leads/DetailsLeads";
import GetAllLeads from "@/components/Lead/Leads/GetAllLeads";
import GetAllLeadSource from "@/components/Lead/LeadSource/GetAllLeadSource";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

const LeadRoutes = [
  <Route
    path="lead"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-lead"}>
          <GetAllLeads />
        </PermissionChecker>
      </Suspense>
    }
    key="lead"
  />,
  <Route
    path="lead/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-lead"}>
          <DetailsLeads />
        </PermissionChecker>
      </Suspense>
    }
    key="lead-single"
  />,
  <Route
    path="lead-source"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-leadSource"}>
          <GetAllLeadSource />
        </PermissionChecker>
      </Suspense>
    }
    key="lead-source"
  />,
];

export default LeadRoutes;
