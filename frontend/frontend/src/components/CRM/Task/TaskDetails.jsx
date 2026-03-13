import {
  clearTask,
  loadSingleTask,
} from "@/redux/rtk/features/CRM/task/taskSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailsInfo from "./DetailsInfo";
import TaskProfile from "./TaskProfile";

export default function TaskDetails({ data }) {
  let { id } = useParams();
  id = id || data?.id;
  const dispatch = useDispatch();
  const { task, loading: taskLoading } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(loadSingleTask(id));
    return () => {
      clearTask();
    };
  }, [dispatch, id]);
  return (
    <div className="relative w-full h-[calc(100vh-52.8px)] overflow-hidden">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden p-4">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* TaskProfile Section */}
          <div className="w-full lg:w-1/3 lg:flex-shrink-0">
            <TaskProfile data={task} loading={taskLoading} />
          </div>

          {/* DetailsInfo Section */}
          <div className="w-full lg:w-2/3 lg:flex-shrink-0">
            <DetailsInfo data={task} loading={taskLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
