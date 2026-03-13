import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllNote = lazy(() => import("@/components/CRM/Note/GetAllNote"));

const NoteRoutes = [
  <Route
    path='note'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-note"}>
          <GetAllNote />
        </PermissionChecker>
      </Suspense>
    }
    key='note'
  />,
];
export default NoteRoutes;
