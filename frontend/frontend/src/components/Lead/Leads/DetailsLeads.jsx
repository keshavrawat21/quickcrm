import { useGetLeadQuery } from "@/redux/rtk/features/leads/leadsApi";
import { cn } from "@/utils/functions";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LeadsProfile from "./LeadsProfile";

export default function DetailsLeads() {
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  // const { contact, loading: contactLoading } = useSelector(
  //   (state) => state.contact
  // );

  const { data: leads, isLoading: leadsLoading } = useGetLeadQuery(id);

  // useEffect(() => {
  //   dispatch(loadSingleContact(id));
  //   return () => {
  //     clearContact();
  //   };
  // }, [dispatch, id]);
  const bodyRef = useRef(null);

  return (
    <>
      <div className="relative  w-full h-[calc(100vh-52.8px)] overflow-hidden flex flex-row">
        <div
          ref={bodyRef}
          className={cn(
            `flex flex-col w-full 2xl:w-[calc(100vw-240px)] md:w-[calc(100vw-200px)] duration-300 p-4 scroll-smooth overflow-y-auto`,
            {
              "md:w-[calc(100vw-20px)] 2xl:w-[calc(100vw-20px)]": collapsed,
            }
          )}>
          <LeadsProfile leads={leads} contactLoading={leadsLoading} />
        </div>
      </div>
    </>
  );
}
