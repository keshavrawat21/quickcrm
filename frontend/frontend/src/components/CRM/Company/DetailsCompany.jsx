import Attachments from "@/components/CommonUi/Attachments";
import Contacts from "@/components/CommonUi/Contacts";
import Emails from "@/components/CommonUi/Emails";
import Notes from "@/components/CommonUi/Notes";
import Opportunities from "@/components/CommonUi/Opportunities";
import Quotes from "@/components/CommonUi/Quotes";
import Tasks from "@/components/CommonUi/Tasks";
import {
  clearCompany,
  loadSingleCompany,
} from "@/redux/rtk/features/CRM/company/companySlice";
import Tabs, { Tab } from "@/UI/Tabs";
import { useEffect } from "react";
import {
  MdAttachFile,
  MdBusiness,
  MdCheckBox,
  MdDescription,
  MdEmail,
  MdGpsFixed,
  MdPeople,
  MdStickyNote2,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CompanyInfo from "./CompanyInfo";
import CompanyProfile from "./CompanyProfile";

export default function DetailsCompany() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { company, loading: companyLoading } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    dispatch(loadSingleCompany(id));
    return () => {
      clearCompany();
    };
  }, [dispatch, id]);

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col w-full p-2 sm:p-3 md:p-4 lg:p-6 gap-4 sm:gap-6">
        <div className="text-lg sm:text-xl lg:text-2xl font-semibold dark:text-white px-2 sm:px-0">
          Company Details
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <Tabs className="company-details-tabs w-full">
            <Tab label="Company Information" icon={<MdBusiness size={16} />}>
              <div className="p-2 sm:p-4">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                  <div className="xl:col-span-1 order-2 xl:order-1">
                    <CompanyProfile data={company} loading={companyLoading} />
                  </div>
                  <div className="xl:col-span-2 order-1 xl:order-2">
                    <CompanyInfo data={company} loading={companyLoading} />
                  </div>
                </div>
              </div>
            </Tab>

            <Tab label="Opportunities" icon={<MdGpsFixed size={16} />}>
              <div className="p-2 sm:p-4">
                <div className="w-full overflow-x-auto">
                  <Opportunities
                    data={company}
                    loading={companyLoading}
                    name={"companyId"}
                    singleLoadThunk={loadSingleCompany}
                  />
                </div>
              </div>
            </Tab>

            <Tab label="Tasks" icon={<MdCheckBox size={16} />}>
              <div className="p-2 sm:p-4">
                <div className="w-full overflow-x-auto">
                  <Tasks
                    data={company}
                    loading={companyLoading}
                    name={"companyId"}
                    singleLoadThunk={loadSingleCompany}
                  />
                </div>
              </div>
            </Tab>

            <Tab label="Contacts" icon={<MdPeople size={16} />}>
              <div className="p-2 sm:p-4">
                <div className="w-full overflow-x-auto">
                  <Contacts
                    data={company}
                    loading={companyLoading}
                    name={"companyId"}
                    singleLoadThunk={loadSingleCompany}
                  />
                </div>
              </div>
            </Tab>

            <Tab label="Notes" icon={<MdStickyNote2 size={16} />}>
              <div className="p-2 sm:p-4">
                <div className="w-full">
                  <Notes
                    data={company}
                    loading={companyLoading}
                    name={"companyId"}
                    singleLoadThunk={loadSingleCompany}
                  />
                </div>
              </div>
            </Tab>

            <Tab label="Attachments" icon={<MdAttachFile size={16} />}>
              <div className="p-2 sm:p-4">
                <div className="w-full">
                  <Attachments
                    data={company}
                    loading={companyLoading}
                    name={"companyId"}
                    singleLoadThunk={loadSingleCompany}
                  />
                </div>
              </div>
            </Tab>

            <Tab label="Emails" icon={<MdEmail size={16} />}>
              <div className="p-2 sm:p-4">
                <div className="w-full overflow-x-auto">
                  <Emails
                    data={company}
                    loading={companyLoading}
                    name={"companyId"}
                    singleLoadThunk={loadSingleCompany}
                  />
                </div>
              </div>
            </Tab>

            <Tab label="Quotes" icon={<MdDescription size={16} />}>
              <div className="p-2 sm:p-4">
                <div className="w-full overflow-x-auto">
                  <Quotes
                    data={company}
                    loading={companyLoading}
                    name={"companyId"}
                    singleLoadThunk={loadSingleCompany}
                  />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
