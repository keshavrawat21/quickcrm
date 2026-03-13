import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllProductCategory = lazy(() =>
  import("@/components/ProductCategory/GetAllProductCategory")
);

const ProductCategoryRoutes = [
  <Route
    path="product-category"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-productCategory"}>
          <GetAllProductCategory />
        </PermissionChecker>
      </Suspense>
    }
    key="product"
  />,
];
export default ProductCategoryRoutes;
