import Attachments from "@/components/CommonUi/Attachments";
import Emails from "@/components/CommonUi/Emails";
import Notes from "@/components/CommonUi/Notes";
import Opportunities from "@/components/CommonUi/Opportunities";
import Quotes from "@/components/CommonUi/Quotes";
import SingleContactTicket from "@/components/CommonUi/SingleContactTicket";
import Tasks from "@/components/CommonUi/Tasks";
import {
  clearContact,
  loadSingleContact,
} from "@/redux/rtk/features/CRM/contact/contactSlice";
import Tabs, { Tab } from "@/UI/Tabs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContactProfile from "./ContactProfile";
import DetailsInfo from "./DetailsInfo";
// Import React Icons
import {
  FiBriefcase,
  FiCheckSquare,
  FiDollarSign,
  FiFileText,
  FiMail,
  FiPaperclip,
  FiTag,
  FiUser,
} from "react-icons/fi";

export default function DetailsContact() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { contact, loading: contactLoading } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    dispatch(loadSingleContact(id));
    return () => {
      clearContact();
    };
  }, [dispatch, id]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full p-3 gap-6">
        <div className="text-xl font-semibold dark:text-white">
          Contact Details
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg">
          <Tabs className="contact-details-tabs ">
            <Tab label="Contact Information" icon={<FiUser />}>
              <div className="pt-4">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                  <div className="xl:col-span-1 order-2 xl:order-1">
                    <ContactProfile
                      contact={contact}
                      contactLoading={contactLoading}
                    />
                  </div>
                  <div className="xl:col-span-2 order-1 xl:order-2">
                    <DetailsInfo
                      contact={contact}
                      contactLoading={contactLoading}
                    />
                  </div>
                </div>
              </div>
            </Tab>

            <Tab label="Opportunities" icon={<FiBriefcase />}>
              <div className="pt-4">
                <Opportunities
                  data={contact}
                  loading={contactLoading}
                  name={"contactId"}
                  singleLoadThunk={loadSingleContact}
                />
              </div>
            </Tab>

            <Tab label="Tasks" icon={<FiCheckSquare />}>
              <div className="pt-4">
                <Tasks
                  data={contact}
                  loading={contactLoading}
                  name={"contactId"}
                  singleLoadThunk={loadSingleContact}
                />
              </div>
            </Tab>

            <Tab label="Notes" icon={<FiFileText />}>
              <div className="pt-4">
                <Notes
                  data={contact}
                  loading={contactLoading}
                  name={"contactId"}
                  singleLoadThunk={loadSingleContact}
                />
              </div>
            </Tab>

            <Tab label="Attachments" icon={<FiPaperclip />}>
              <div className="pt-4">
                <Attachments
                  data={contact}
                  loading={contactLoading}
                  name={"contactId"}
                  singleLoadThunk={loadSingleContact}
                />
              </div>
            </Tab>

            <Tab label="Emails" icon={<FiMail />}>
              <div className="pt-4">
                <Emails
                  data={contact}
                  loading={contactLoading}
                  name={"contactId"}
                  singleLoadThunk={loadSingleContact}
                />
              </div>
            </Tab>

            <Tab label="Quotes" icon={<FiDollarSign />}>
              <div className="pt-4">
                <Quotes
                  data={contact}
                  loading={contactLoading}
                  name={"contactId"}
                  singleLoadThunk={loadSingleContact}
                />
              </div>
            </Tab>

            <Tab label="Tickets" icon={<FiTag />}>
              <div className="pt-4">
                <SingleContactTicket
                  data={contact}
                  loading={contactLoading}
                  name={"contactId"}
                  singleLoadThunk={loadSingleContact}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
