import {
  CalendarOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

export default function UserInfo({ user }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 p-4">
      {/* Personal Information - Left Side */}
      <div className="new-card rounded h-auto">
        <div className="txt-color-2 text-xl text-center mt-5">
          Personal Information
        </div>

        <hr className="mt-3 mb-3 new-hr" />

        <div className="m-5">
          <ul className="space-y-4">
            <li className="flex items-center">
              <TeamOutlined className="mr-3" style={{ fontSize: "15px" }} />
              <span className="txt-color-2 font-medium">Department:</span>
              <p className="txt-color-secondary ml-2">
                {user?.department?.name
                  ? user?.department?.name
                  : "No Department "}
              </p>
            </li>
            <li className="flex items-center">
              <TrophyOutlined className="mr-3" style={{ fontSize: "15px" }} />
              <span className="txt-color-2 font-medium">
                Employment Status:
              </span>
              <p className="txt-color-secondary ml-2">
                {user?.employmentStatus?.name
                  ? user?.employmentStatus?.name
                  : "No Status"}
              </p>
            </li>

            <li className="flex items-center">
              <CalendarOutlined className="mr-3" style={{ fontSize: "15px" }} />
              <span className="txt-color-2 font-medium">Join Date :</span>
              <p className="txt-color-secondary ml-2">
                {user?.joinDate
                  ? dayjs(user?.joinDate).format("DD/MM/YYYY")
                  : "Date Not Found"}
              </p>
            </li>

            <li className="flex items-center">
              <CalendarOutlined className="mr-3" style={{ fontSize: "15px" }} />
              <span className="txt-color-2 font-medium">Leave Date:</span>
              <p className="txt-color-secondary ml-2">
                {user?.leaveDate
                  ? dayjs(user?.leaveDate).format("DD/MM/YYYY")
                  : "PRESENT"}
              </p>
            </li>

            <li className="flex items-center">
              <UserOutlined className="mr-3" style={{ fontSize: "15px" }} />
              <span className="txt-color-2 font-medium">Role :</span>
              <p className="txt-color-secondary ml-2">
                {user?.role?.name || "No Role"}
              </p>
            </li>

            <li className="flex items-center">
              <ClockCircleOutlined
                className="mr-3"
                style={{ fontSize: "15px" }}
              />
              <span className="txt-color-2 font-medium">Shift :</span>
              <p className="txt-color-secondary ml-2">
                {user?.shift?.name
                  ? `${user?.shift?.name} (${dayjs(
                      `2023-11-22T${user?.shift?.startTime}`
                    ).format("h:mm A")} - ${dayjs(
                      `2023-11-22T${user?.shift?.endTime}`
                    ).format("h:mm A")})`
                  : "Shift Not Found"}
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Information - Right Side */}
      <div className="new-card rounded h-auto">
        <div className="txt-color-2 text-xl text-center mt-5">
          Contact Information
        </div>

        <hr className="mt-3 mb-3 new-hr" />
        <div className="m-5">
          <ul className="space-y-4">
            <li className="flex items-center">
              <MailOutlined className="mr-3" style={{ fontSize: "15px" }} />
              <span className="txt-color-2 font-medium">Email:</span>
              <p className="txt-color-secondary ml-2">
                {user?.email || "No Email"}
              </p>
            </li>
            <li className="flex items-center">
              <PhoneOutlined className="mr-3" style={{ fontSize: "15px" }} />
              <span className="txt-color-2 font-medium">Phone:</span>
              <p className="txt-color-secondary ml-2">
                {user?.phone || "No Phone"}
              </p>
            </li>

            <li className="flex items-start">
              <HomeOutlined className="mr-3" style={{ fontSize: "15px" }} />
              <span className="txt-color-2 font-medium">Address:</span>
              <div className="ml-2">
                <div className="txt-color-secondary">
                  Street: {user?.street || "No Address"}
                </div>
                <div className="txt-color-secondary">
                  City: {user?.city || "No Address"}
                </div>
                <div className="txt-color-secondary">
                  State: {user?.state || "No Address"}
                </div>
                <div className="txt-color-secondary">
                  Country: {user?.country || "No Address"}
                </div>
                <div className="txt-color-secondary">
                  Zip Code: {user?.zipCode || "No Address"}
                </div>
              </div>
            </li>

            <li className="flex items-center">
              <ThunderboltOutlined
                className="mr-3"
                style={{ fontSize: "15px" }}
              />
              <span className="txt-color-2 font-medium">Blood Group:</span>
              <p className="txt-color-secondary ml-2">
                {user?.bloodGroup || "No Blood Group"}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
