import { loadAllCompany } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContact } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunity } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllQuote } from "@/redux/rtk/features/quote/quoteSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useNoteFilter() {
  const company = useSelector((state) => state.company.list) || [];
  const contact = useSelector((state) => state.contact.list) || [];
  const opportunity = useSelector((state) => state.opportunity.list) || [];
  const quote = useSelector((state) => state.quote.list) || [];
  const noteOwner = useSelector((state) => state.users.list) || [];
  const dispatch = useDispatch();

  const filter = [
    {
      key: "noteOwner",
      label: "Owner",
      type: "select",
      options: noteOwner?.map((item) => ({
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
      key: "quote",
      label: "Quote",
      type: "select",
      options: quote?.map((item) => ({
        label: item.quoteName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
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
    dispatch(loadAllCompany());
    dispatch(loadAllContact());
    dispatch(loadAllOpportunity());
    dispatch(loadAllQuote());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  return filter || [];
}
