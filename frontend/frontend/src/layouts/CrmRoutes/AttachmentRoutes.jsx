import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

const GetAllAttachment = lazy(() =>
  import("@/components/CRM/Attachment/GetAllAttachment")
);

const AttachmentRoutes = [
  <Route
    path='attachment'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-attachment"}>
          <GetAllAttachment />
        </PermissionChecker>
      </Suspense>
    }
    key='attachment'
  />,
 
];

export default AttachmentRoutes;
