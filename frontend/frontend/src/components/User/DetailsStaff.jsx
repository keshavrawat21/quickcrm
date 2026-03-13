import { Alert, Col, Row } from "antd";
import { useEffect } from "react";
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineIdentification,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearUser,
  loadSingleStaff,
} from "../../redux/rtk/features/hrm/user/userSlice";
import BigDrawer from "../Drawer/BigDrawer";
import Loader from "../Loader/Loader";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import BtnEditSvg from "../UI/Button/btnEditSvg";
import EmployeeAward from "../UI/EmployeeAward";
import EmployeeDesignation from "../UI/EmployeeDesignation";
import EmployeeSalary from "../UI/EmployeeSalary";
import EmployeeTimeline from "../UI/EmployeeTimeline";
import AwardAddSinglePopup from "../UI/PopUp/PopUp/AwardHistoryAddSinglePopup";
import DesignationAddSinglePopup from "../UI/PopUp/PopUp/DesignationAddSinglePopup";
import EducationAddSinglePopup from "../UI/PopUp/PopUp/EducationAddSinglePopup";
import SalaryAddSinglePopup from "../UI/PopUp/PopUp/SalaryAddPopup";
import CommissionDetails from "./CommissionDetails";
import UserInfo from "./UserInfo";

const DetailStaff = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadSingleStaff(id));
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch, id]);

  const historySection = (
    title,
    children,
    permission,
    drawerTitle,
    PopupComponent
  ) => (
    <div className="bg-gray-50 rounded-xl  p-6 h-full transition-all ">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <UserPrivateComponent permission={permission}>
          <BigDrawer title={drawerTitle}>
            <PopupComponent />
          </BigDrawer>
        </UserPrivateComponent>
      </div>
      <div className="border-t border-gray-100 pt-5">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto">
        {user ? (
          <div className="space-y-6">
            {/* Profile Header Card */}
            <div className="bg-gray-50 rounded-xl   p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {user.username}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      <HiOutlineBriefcase className="w-4 h-4" />
                      {user.designationHistory?.length &&
                      user.designationHistory[0].designation?.name
                        ? String(user.designationHistory[0].designation.name)
                        : "No Designation"}
                    </span>
                    {user?.role && (
                      <span className="inline-flex items-center px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                        {String(user.role.name)}
                      </span>
                    )}
                  </div>
                </div>

                <UserPrivateComponent permission="update-user">
                  <Link to={`/admin/staff/${id}/update`}>
                    <button className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
                      <BtnEditSvg size={24} />
                    </button>
                  </Link>
                </UserPrivateComponent>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HiOutlineMail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Email
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {user?.email ? String(user.email) : "No Email"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HiOutlineIdentification className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Employee ID
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.employeeId ? String(user.employeeId) : "N/A"}
                    </p>
                  </div>
                </div>

                {user?.phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HiOutlinePhone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {String(user.phone)}
                      </p>
                    </div>
                  </div>
                )}

                {user?.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HiOutlineLocationMarker className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        Address
                      </p>
                      <p className="text-sm font-medium text-gray-900 break-words">
                        {String(user.address)}
                      </p>
                    </div>
                  </div>
                )}

                {user?.joinDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HiOutlineCalendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        Join Date
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {user?.department && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HiOutlineBriefcase className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        Department
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {String(user?.department?.name)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* User Info Table */}
            <div className="bg-gray-50 rounded-xl   p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                Detailed Information
              </h2>
              <UserInfo user={user} />
            </div>

            {/* History Sections */}
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                {historySection(
                  "Designation History",
                  user.designationHistory?.length ? (
                    <EmployeeDesignation list={user?.designationHistory} />
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiOutlineBriefcase className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-3 font-medium">
                        No Designation History Found
                      </p>
                      <Alert
                        message="Click on edit button to add new"
                        type="info"
                        showIcon
                        className="inline-block"
                      />
                    </div>
                  ),
                  "update-designationHistory",
                  "Designation History",
                  DesignationAddSinglePopup
                )}
              </Col>

              <Col xs={24} lg={12}>
                {historySection(
                  "Education History",
                  user?.education?.length ? (
                    <EmployeeTimeline list={user?.education} edit={true} />
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiOutlineIdentification className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-3 font-medium">
                        No Education History Found
                      </p>
                      <Alert
                        message="Click on edit button to add new"
                        type="info"
                        showIcon
                        className="inline-block"
                      />
                    </div>
                  ),
                  "update-education",
                  "Education History",
                  EducationAddSinglePopup
                )}
              </Col>

              <Col xs={24} lg={12}>
                {historySection(
                  "Salary History",
                  user.salaryHistory?.length ? (
                    <EmployeeSalary list={user?.salaryHistory} edit={true} />
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiOutlineMail className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-3 font-medium">
                        No Salary History Found
                      </p>
                      <Alert
                        message="Click on edit button to add new"
                        type="info"
                        showIcon
                        className="inline-block"
                      />
                    </div>
                  ),
                  "update-salaryHistory",
                  "Salary History",
                  SalaryAddSinglePopup
                )}
              </Col>

              <Col xs={24} lg={12}>
                {historySection(
                  "Award History",
                  user.awardHistory?.length ? (
                    <EmployeeAward list={user?.awardHistory} edit={true} />
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiOutlineCalendar className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-3 font-medium">
                        No Award History Found
                      </p>
                      <Alert
                        message="Click on edit button to add new"
                        type="info"
                        showIcon
                        className="inline-block"
                      />
                    </div>
                  ),
                  "update-awardHistory",
                  "Award History",
                  AwardAddSinglePopup
                )}
              </Col>
            </Row>

            {/* Commission Details */}
            <CommissionDetails />
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[400px]">
            {loading && <Loader />}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailStaff;
