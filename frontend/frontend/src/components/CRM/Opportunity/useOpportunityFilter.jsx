import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunitySource } from "@/redux/rtk/features/CRM/opportunitySource/opportunitySourceSlice";
import { loadAllOpportunityStage } from "@/redux/rtk/features/CRM/opportunityStage/opportunityStageSlice";
import { loadAllOpportunityType } from "@/redux/rtk/features/CRM/opportunityType/opportunityTypeSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useOpportunityFilter() {
  const opportunityType =
    useSelector((state) => state.opportunityType.list) || [];
  const opportunityStage =
    useSelector((state) => state.opportunityStage.list) || [];
  const opportunitySource =
    useSelector((state) => state.opportunitySource.list) || [];
  const company = useSelector((state) => state.company.list) || [];
  const contact = useSelector((state) => state.contact.list) || [];
  const opportunityOwner = useSelector((state) => state.users.list) || [];
  const dispatch = useDispatch();

  const filter = [
    {
      key: "opportunityOwner",
      label: "Owner",
      type: "select",
      options: opportunityOwner?.map((item) => ({
        label: `${item.username}`,
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
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "contact",
      label: "Contact",
      type: "select",
      options: contact?.map((item) => ({
        label: item.firstName + " " + item.lastName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "opportunityType",
      label: "Type",
      type: "select",
      options: opportunityType?.map((item) => ({
        label: item.opportunityTypeName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "opportunityStage",
      label: "Stage",
      type: "select",
      options: opportunityStage?.map((item) => ({
        label: item.opportunityStageName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "opportunitySource",
      label: "Source",
      type: "select",
      options: opportunitySource?.map((item) => ({
        label: item.opportunitySourceName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllCompany());
    dispatch(loadAllContact());
    dispatch(loadAllOpportunityType());
    dispatch(loadAllOpportunityStage());
    dispatch(loadAllOpportunitySource());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  return filter;
}
