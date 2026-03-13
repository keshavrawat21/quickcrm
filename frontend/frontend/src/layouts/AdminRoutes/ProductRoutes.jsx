import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const AddProduct = lazy(() => import("@/components/Product/AddProduct"));

const GetAllProduct = lazy(() => import("@/components/Product/GetAllProduct"));
const ImportFromCSV = lazy(() => import("@/components/Product/UploadMany"));

const ProductRoutes = [
  <Route
    path="product"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-product"}>
          <GetAllProduct />
        </PermissionChecker>
      </Suspense>
    }
    key="product"
  />,
  <Route
    path="product/add"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-product"}>
          <AddProduct />
        </PermissionChecker>
      </Suspense>
    }
    key="product"
  />,

  // <Route
  //   path="product/:id"
  //   element={
  //     <Suspense fallback={<Loader />}>
  //       <PermissionChecker permission={"readSingle-product"}>
  //         <DetailsProduct />
  //       </PermissionChecker>
  //     </Suspense>
  //   }
  //   key="product-details"
  // />,

  <Route
    path="import-product"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-product"}>
          <ImportFromCSV urlPath={"product"} title="Product" />
        </PermissionChecker>
      </Suspense>
    }
    key="import-product"
  />,
];
export default ProductRoutes;
