import { loadAllCompanyType } from "@/redux/rtk/features/CRM/companyType/companyTypeSlice";
import { loadAllIndustry } from "@/redux/rtk/features/CRM/industry/industrySlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAttachmentFilter() {
  const { list: industryList, loading: industryLoading } = useSelector(
    (state) => state.industry
  );
  const { list: companyTypeList, loading: companyTypeLoading } = useSelector(
    (state) => state.companyType
  );
  const { list: ownerList, loading: ownerLoading } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  const filter = [
    {
      key: "companyOwner",
      label: "Owner",
      type: "select",
      options: ownerList?.map((item) => ({
        label: `${item.username}`,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "companyType",
      label: "Type",
      type: "select",
      options: companyTypeList?.map((item) => ({
        label: item.companyTypeName,
        value: item.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "industry",
      label: "Industry",
      type: "select",
      options: industryList?.map((item) => ({
        label: item.industryName,
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
    dispatch(loadAllIndustry());
    dispatch(loadAllCompanyType());
    dispatch(loadAllStaff({ query: 'all' }));
  }, [dispatch]);

  return filter;
}
