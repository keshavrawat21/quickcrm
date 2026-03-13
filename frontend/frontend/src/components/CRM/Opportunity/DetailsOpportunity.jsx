import Attachments from "@/components/CommonUi/Attachments";
import Emails from "@/components/CommonUi/Emails";
import Notes from "@/components/CommonUi/Notes";
import Quotes from "@/components/CommonUi/Quotes";
import Tasks from "@/components/CommonUi/Tasks";
import {
  clearOpportunity,
  loadSingleOpportunity,
} from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllOpportunityStage } from "@/redux/rtk/features/CRM/opportunityStage/opportunityStageSlice";
import Tabs, { Tab } from "@/UI/Tabs";
import { useEffect } from "react";
import {
  FaEnvelope,
  FaFileAlt,
  FaPaperclip,
  FaStickyNote,
  FaTasks,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpportunityProfile from "./OpportunityProfile";
import StageChanger from "./StageChanger";

export default function DetailsOpportunity() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { opportunity, loading: opportunityLoading } = useSelector(
    (state) => state.opportunity
  );
  const { list: opportunityStage } = useSelector(
    (state) => state.opportunityStage
  );

  useEffect(() => {
    dispatch(loadSingleOpportunity(id));
    dispatch(loadAllOpportunityStage());
    return () => {
      clearOpportunity();
    };
  }, [dispatch, id]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full p-6 gap-6">
        {/* Stage Changer */}
        <StageChanger
          opportunityStage={opportunityStage}
          currentStage={opportunity}
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <OpportunityProfile
                data={opportunity}
                loading={opportunityLoading}
              />
            </div>
            <div className="lg:col-span-2">
              <Tabs className="opportunity-details-tabs">
                <Tab label="Tasks" icon={<FaTasks />}>
                  <div className="pt-4">
                    <Tasks
                      data={opportunity}
                      loading={opportunityLoading}
                      name={"opportunityId"}
                      singleLoadThunk={loadSingleOpportunity}
                    />
                  </div>
                </Tab>

                <Tab label="Notes" icon={<FaStickyNote />}>
                  <div className="pt-4">
                    <Notes
                      data={opportunity}
                      loading={opportunityLoading}
                      name={"opportunityId"}
                      singleLoadThunk={loadSingleOpportunity}
                    />
                  </div>
                </Tab>

                <Tab label="Attachments" icon={<FaPaperclip />}>
                  <div className="pt-4">
                    <Attachments
                      data={opportunity}
                      loading={opportunityLoading}
                      name={"opportunityId"}
                      singleLoadThunk={loadSingleOpportunity}
                    />
                  </div>
                </Tab>

                <Tab label="Emails" icon={<FaEnvelope />}>
                  <div className="pt-4">
                    <Emails
                      data={opportunity}
                      loading={opportunityLoading}
                      name={"opportunityId"}
                      singleLoadThunk={loadSingleOpportunity}
                    />
                  </div>
                </Tab>

                <Tab label="Quotes" icon={<FaFileAlt />}>
                  <div className="pt-4">
                    <Quotes
                      data={opportunity}
                      loading={opportunityLoading}
                      name={"opportunityId"}
                      singleLoadThunk={loadSingleOpportunity}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
