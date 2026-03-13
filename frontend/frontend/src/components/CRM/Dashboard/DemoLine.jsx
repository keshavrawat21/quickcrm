import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCRMDashboardData,
  loadDashboardData,
} from "../../../redux/rtk/features/dashboard/dashboardSlice";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import DashboardCard from "./DashboardCard";

const DemoLine = () => {
  const { crmInfo } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCRMDashboardData({}));
  }, [dispatch]);

  return (
    <Fragment>
      <UserPrivateComponent permission={"readAll-dashboard"}>
        <DashboardCard information={crmInfo} />
      </UserPrivateComponent>
    </Fragment>
  );
};

export default DemoLine;
