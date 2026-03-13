import Card from "@/UI/Card";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import moment from "moment";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import {
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlineOfficeBuilding,
  HiOutlineUser,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import NoteUpdate from "./NoteUpdate";

export default function DetailsNote({ note, onClose, load }) {
  const [isEdit, setEdit] = useState();

  const editToggle = () => {
    setEdit((prev) => !prev);
  };

  const relatedItems = [
    {
      data: note?.contact,
      label: "Contact",
      link: `/admin/contact/${note?.contact?.id}`,
      name: `${note?.contact?.firstName} ${note?.contact?.lastName}`,
      icon: <HiOutlineUser className="w-4 h-4" />,
    },
    {
      data: note?.company,
      label: "Company",
      link: `/admin/company/${note?.company?.id}`,
      name: note?.company?.companyName,
      icon: <HiOutlineOfficeBuilding className="w-4 h-4" />,
    },
    {
      data: note?.opportunity,
      label: "Opportunity",
      link: `/admin/opportunity/${note?.opportunity?.id}`,
      name: note?.opportunity?.opportunityName,
      icon: <HiOutlineLightBulb className="w-4 h-4" />,
    },
    {
      data: note?.quote,
      label: "Quote",
      link: `/admin/quote/${note?.quote?.id}`,
      name: note?.quote?.quoteName,
      icon: <HiOutlineDocumentText className="w-4 h-4" />,
    },
  ].filter((item) => item.data);

  return (
    <UserPrivateComponent permission={"readSingle-note"} type="update">
      <Card
        className="border-none"
        title={
          <span className="text-lg font-semibold text-gray-800">
            Note Details
          </span>
        }
        extra={
          <button
            onClick={editToggle}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200">
            {isEdit ? (
              <>
                <CgFileDocument className="w-4 h-4" />
                View Note
              </>
            ) : (
              <>
                <AiFillEdit className="w-4 h-4" />
                Edit Note
              </>
            )}
          </button>
        }>
        {!isEdit ? (
          <div className="space-y-6">
            {/* Related Items */}
            {relatedItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {relatedItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-teal-50 hover:to-teal-100 rounded-lg border border-gray-200 hover:border-teal-300 transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2 text-gray-500 group-hover:text-teal-600 transition-colors">
                      {item.icon}
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-teal-700 transition-colors truncate">
                      {item.name}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            {/* Note Content */}
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="mb-4 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {note?.title}
                </h2>
                {note && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                    <span>Created {moment(note.createdAt).fromNow()}</span>
                  </div>
                )}
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {note?.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <NoteUpdate
            onCancel={editToggle}
            onClose={onClose}
            id={note?.id}
            note={note}
            load={load}
          />
        )}
      </Card>
    </UserPrivateComponent>
  );
}
