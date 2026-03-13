import { loadCRMDashboardData } from "@/redux/rtk/features/dashboard/dashboardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Content from "./Content";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadCRMDashboardData({
        startDate: new Date(new Date().getFullYear(), 0, 1)
          .toISOString()
          .split("T")[0], // January 1st of current year
        endDate: new Date(new Date().getFullYear(), 11, 31)
          .toISOString()
          .split("T")[0], // December 31st of current year
      })
    );
  }, [dispatch]);
  return (
    <>
      <Content />
    </>
  );
}
