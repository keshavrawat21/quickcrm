import Card from "@/UI/Card";
import {
  loadSingleOpportunity,
  updateOpportunity,
} from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function StageChanger({ opportunityStage, currentStage }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const lastIndex = opportunityStage?.length - 1;
  const handleStageChange = async (stageId) => {
    const result = await dispatch(
      updateOpportunity({ id, values: { opportunityStageId: stageId } })
    );
    if (result.payload.message === "success") {
      dispatch(loadSingleOpportunity(id));
    }
  };

  return (
    <Card className="mb-4 border-none">
      <div className="flex flex-col md:flex-row md:justify-between items-center pb-3 gap-2">
        <span className="flex gap-2">
          <span className="text-base font-bold">START:</span>
          <span className="text-base font-normal">
            {moment(currentStage?.opportunityCreateDate).format("MMMM Do YYYY")}
          </span>
        </span>
        <span className="text-base font-bold">
          CLOSING:
          <span className="text-base font-normal">
            {" "}
            {moment(currentStage?.opportunityCloseDate).format("MMMM Do YYYY")}
          </span>
        </span>
      </div>
      <div className="flex flex-wrap gap-1 justify-center">
        {opportunityStage &&
          opportunityStage.map((item, index) => (
            <button
              key={item.id}
              className={`flex items-center justify-center p-2  shadow-sm text-sm font-medium  ${
                currentStage?.opportunityStageId === item.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } ${!(lastIndex === index) && !(0 === index) && "stageBtn"}
              ${lastIndex === index && "stageEndBtn"}
              ${0 === index && "stageStartBtn"}
              `}
              onClick={() => handleStageChange(item.id)}
              disabled={currentStage?.opportunityStageId === item.id}>
              {item.opportunityStageName}
            </button>
          ))}
      </div>
    </Card>
  );
}
