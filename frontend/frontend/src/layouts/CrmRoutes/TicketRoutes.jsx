import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const GetAllTicketCategory = lazy(
  () =>
    import(
      "@/components/CRM/Setup/TicketSetup/TicketCategory/GetAllTicketCategory"
    ),
);
const GetAllTicketStatus = lazy(
  () =>
    import(
      "@/components/CRM/Setup/TicketSetup/TicketStatus/GetAllTicketStatus"
    ),
);
const GetAllTicket = lazy(() => import("@/components/CRM/Ticket/GetAllTicket"));
const CreateTicket = lazy(() => import("@/components/CRM/Ticket/CreateTicket"));
const DetailsPage = lazy(
  () => import("@/components/CRM/Ticket/TicketDetails/DetailsPage"),
);

const TicketRoutes = [
  <Route
    path="ticket"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-ticket"}>
          <GetAllTicket />
        </PermissionChecker>
      </Suspense>
    }
    key="ticket"
  />,
  <Route
    path="ticket/create"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-ticket"}>
          <CreateTicket />
        </PermissionChecker>
      </Suspense>
    }
    key="ticket/Create"
  />,
  <Route
    path="ticket/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-ticket"}>
          <DetailsPage />
        </PermissionChecker>
      </Suspense>
    }
    key="ticket/Create"
  />,
  <Route
    path="ticket-category"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-ticketCategory"}>
          <GetAllTicketCategory />
        </PermissionChecker>
      </Suspense>
    }
    key="ticket-category"
  />,
  <Route
    path="ticket-status"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-ticketStatus"}>
          <GetAllTicketStatus />
        </PermissionChecker>
      </Suspense>
    }
    key="ticket-status"
  />,
];
export default TicketRoutes;
