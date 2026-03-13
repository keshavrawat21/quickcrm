import { loadAllQuoteStage } from "@/redux/rtk/features/CRM/QuoteStage/QuoteStageSlice";
import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useQuoteFilter() {
  const quoteStage = useSelector((state) => state.quoteStage.list) || [];
  const company = useSelector((state) => state.company.list) || [];
  const contact = useSelector((state) => state.contact.list) || [];
  const opportunity = useSelector((state) => state.opportunity.list) || [];
  const quoteOwner = useSelector((state) => state.users.list) || [];
  const dispatch = useDispatch();

  const filter = [
    {
      key: "quoteOwner",
      label: "Owner",
      type: "select",
      options: quoteOwner?.map((item) => ({
        label: `${item?.username}`,
        value: item?.id,
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
      key: "opportunity",
      label: "Opportunity",
      type: "select",
      options: opportunity?.map((item) => ({
        label: item.opportunityName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "quoteStage",
      label: "Stage",
      type: "select",
      options: quoteStage?.map((item) => ({
        label: item.quoteStageName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllCompany());
    dispatch(loadAllContact());
    dispatch(loadAllOpportunity());
    dispatch(loadAllStaff({ query: "all" }));
    dispatch(loadAllQuoteStage());
  }, [dispatch]);

  return filter || [];
}
