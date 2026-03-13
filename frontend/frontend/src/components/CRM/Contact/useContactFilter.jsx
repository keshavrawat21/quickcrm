import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContactSource } from "@/redux/rtk/features/CRM/contactSource/contactSourceSlice";
import { loadAllContactStage } from "@/redux/rtk/features/CRM/contactStage/contactStageSlice";
import { loadAllIndustry } from "@/redux/rtk/features/CRM/industry/industrySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useContactFilter() {
  const contactSource = useSelector((state) => state.contactSource.list) || [];
  const contactStage = useSelector((state) => state.contactStage.list) || [];
  const company = useSelector((state) => state.company.list) || [];
  const industry = useSelector((state) => state.industry.list) || [];
  const contactOwner = useSelector((state) => state.users.list) || [];
  const dispatch = useDispatch();

  const filter = [
    {
      key: "contactOwner",
      label: "Owner",
      type: "select",
      options: contactOwner?.map((item) => ({
        label: `${item.username}`,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "contactSource",
      label: "Source",
      type: "select",
      options: contactSource?.map((item) => ({
        label: item.contactSourceName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "contactStage",
      label: "Stage",
      type: "select",
      options: contactStage?.map((item) => ({
        label: item.contactStageName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "company",
      label: "Company",
      type: "select",
      options: company?.map((item) => ({
        label: item.companyName,
        value: item.id,
      })),
      className: "min-w-[100px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "industry",
      label: "Industry",
      type: "select",
      options: industry?.map((item) => ({
        label: item.industryName,
        value: item.id,
      })),
      className: "min-w-[90px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllIndustry());
    dispatch(loadAllCompany());
    dispatch(loadAllContactSource());
    dispatch(loadAllContactStage());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  return filter || [];
}
