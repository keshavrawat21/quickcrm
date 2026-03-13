import {
  clearTicket,
  loadSingleTicket,
} from "@/redux/rtk/features/CRM/ticket/ticketSlice";
import { Comment } from "@ant-design/compatible";
import { Skeleton, Tag } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Attachment from "./Comment/Attachment";
import TicketComment from "./Comment/TicketComment";
import TicketInformation from "./TicketInformation";
import { IoIosArrowBack } from "react-icons/io";

const DetailsComponent = ({ children, ticket }) => (
  <Comment
    author={
      <span className="dark:text-gray-400 text-base font-semibold text-gray-800">
        Subject : {ticket?.subject}
      </span>
    }
    content={
      <>
        <p className=" dark:text-gray-400 ml-2 mt-4 mb-2">
          {ticket?.description}
        </p>

        {ticket?.images?.length > 0 && (
          <span className="dark:text-gray-400 text-xs ml-2 font-semibold text-gray-800">
            Attachments :
          </span>
        )}
        {ticket?.images?.length > 0 && (
          <Attachment attachments={ticket?.images} />
        )}
      </>
    }
    className="mb-4 p-4 rounded-lg "
  >
    {children}
  </Comment>
);

const TicketDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams("id");
  // const id = 1;
  const { ticket, loading } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(loadSingleTicket(id));
    return () => {
      dispatch(clearTicket());
    };
  }, [dispatch, id]);

  const logOut = () => {
    localStorage.clear();
    window.location.replace("/");
  };
  const handleBack = () => {
    navigate("/user");
  };
  return (
    <div>
      <div className="container flex justify-between items-center my-5">
        <h2 className="text-xl font-bold flex items-center gap-1">
          <span
            className="font-normal text-gray-400 hover:-translate-x-1 cursor-pointer duration-300 hover:text-ePrimary"
            onClick={handleBack}
          >
            <IoIosArrowBack />
          </span>{" "}
          Support Ticket #{ticket?.ticketId}
        </h2>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={logOut}
        >
          Logout
        </button>
      </div>
      <div className="container md:w-4/5">
        <div className="p-6 rounded-lg bg-[#F5F4F4]">
          <div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center mb-4">
              <span className="flex items-center">
                <span className="font-semibold">Status</span>
                <Tag className="ml-2" color="green">
                  {ticket?.ticketStatus?.ticketStatusName}
                </Tag>
              </span>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <TicketInformation ticket={ticket} />
              </div>
            </div>
          </div>
          <Skeleton loading={loading}>
            <DetailsComponent ticket={ticket}>
              <TicketComment />
            </DetailsComponent>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
export default TicketDetails;
