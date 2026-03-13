import {
  CodeSandboxOutlined,
  SolutionOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { BiTask } from "react-icons/bi";
import { BsBuildingFillGear } from "react-icons/bs";
import { FaBusinessTime, FaRegMoneyBillAlt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoTicketOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import {
  MdOutlineColorLens,
  MdOutlineContactPhone,
  MdOutlineLeaderboard,
  MdPolicy,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { TbAward, TbFileInvoice } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export default function useSettingNav() {
  return [
    {
      label: (
        <NavLink to="/admin/company-settings">
          <span>COMPANY SETTINGS</span>
        </NavLink>
      ),
      permit: {
        permissions: ["readAll-setting", "update-setting"],
        operator: "or",
      },
      key: "invoiceSetting",
      icon: <BsBuildingFillGear />,
    },
    {
      label: (
        <NavLink to="/admin/app-settings">
          <span>APP SETTINGS</span>
        </NavLink>
      ),
      permit: {
        permissions: ["readAll-setting", "readAll-quickLink"],
        operator: "or",
      },
      key: "appSettings",
      icon: <MdOutlineColorLens />,
    },

    {
      label: "EMPLOYEE MANAGE",
      key: "employee-manage",
      icon: <TeamOutlined />,
      permit: {
        permissions: [
          "create-user",
          "readAll-user",
          "readAll-role",
          "readAll-department",
          "readAll-designation",
          "readAll-shift",
          "readAll-employmentStatus",
          "readAll-announcement",
          "readAll-award",
          "create-role",
          "create-department",
          "create-designation",
          "create-shift",
          "create-employmentStatus",
          "create-announcement",
          "create-award",
        ],
        operator: "or",
      },
      children: [
        {
          label: (
            <NavLink to="/admin/staff">
              <span>STAFF</span>
            </NavLink>
          ),
          permit: {
            permissions: ["readAll-user"],
            operator: "or",
          },
          key: "staff",
          icon: <HiOutlineUserGroup />,
        },

        {
          label: (
            <NavLink to="/admin/role">
              <span>ROLE & PERMISSION</span>
            </NavLink>
          ),
          permit: {
            permissions: ["readAll-role", "create-role"],
            operator: "or",
          },
          key: "role",
          icon: <GrUserAdmin />,
        },
        {
          label: (
            <NavLink to="/admin/department">
              <span>DEPARTMENT</span>
            </NavLink>
          ),
          permit: {
            permissions: ["readAll-department", "create-department"],
            operator: "or",
          },
          key: "department",
          icon: <HiOutlineBuildingOffice2 />,
        },
        {
          label: (
            <NavLink to="/admin/shift">
              <span>SHIFT</span>
            </NavLink>
          ),
          permit: {
            permissions: ["readAll-shift", "create-shift"],
            operator: "or",
          },
          key: "shift",
          icon: <FaBusinessTime />,
        },
        {
          label: (
            <NavLink to="/admin/designation">
              <span>DESIGNATION</span>
            </NavLink>
          ),
          permit: {
            permissions: ["readAll-designation", "create-designation"],
            operator: "or",
          },
          key: "designation",
          icon: <SolutionOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/employment-status">
              <span>EMPLOYMENT STATUS</span>
            </NavLink>
          ),
          permit: {
            permissions: [
              "readAll-employmentStatus",
              "create-employmentStatus",
            ],
            operator: "or",
          },
          key: "employmentStatus",
          icon: <FaBusinessTime />,
        },
        {
          label: (
            <NavLink to="/admin/announcement">
              <span>ANNOUNCEMENT</span>
            </NavLink>
          ),
          permit: {
            permissions: ["readAll-announcement", "create-announcement"],
            operator: "or",
          },

          key: "announcement",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/award">
              <span>AWARD</span>
            </NavLink>
          ),
          permit: {
            permissions: ["readAll-award", "create-award"],
            operator: "or",
          },
          key: "award",
          icon: <TbAward />,
        },
      ],
    },
    {
      label: "CONTACT SETUP",
      permit: {
        permissions: [
          "create-contactSource",
          "readAll-contactSource",
          "create-contactStage",
          "readAll-contactStage",
        ],
        operator: "or",
      },
      key: "contactSetup",
      icon: <MdOutlineContactPhone />,
      children: [
        {
          label: (
            <NavLink to="/admin/contact-source">
              <span>CONTACT SOURCE</span>
            </NavLink>
          ),
          key: "contactSource",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/contact-stage">
              <span>CONTACT STAGE</span>
            </NavLink>
          ),
          key: "contactStage",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "COMPANY SETUP",
      permit: {
        permissions: [
          "create-companyType",
          "readAll-companyType",
          "create-companyType",
        ],
        operator: "or",
      },
      key: "companySetup",
      icon: <LuBuilding2 />,
      children: [
        {
          label: (
            <NavLink to="/admin/company-type">
              <span>COMPANY TYPE</span>
            </NavLink>
          ),
          key: "companyType",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/industry">
              <span>INDUSTRY</span>
            </NavLink>
          ),
          key: "Industry",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "OPPORTUNITY SETUP",
      permit: {
        permissions: [
          "create-opportunitySource",
          "readAll-opportunitySource",
          "create-opportunityStage",
          "readAll-opportunityStage",
          "create-opportunityType",
          "readAll-opportunityType",
        ],
        operator: "or",
      },
      key: "opportunitySetup",
      icon: <FaRegMoneyBillAlt />,
      children: [
        {
          label: (
            <NavLink to="/admin/opportunity-source">
              <span>OPPORTUNITY SOURCE</span>
            </NavLink>
          ),
          permit: {
            permissions: [
              "create-opportunitySource",
              "readAll-opportunitySource",
            ],
            operator: "or",
          },
          key: "opportunitySource",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/opportunity-stage">
              <span>OPPORTUNITY STAGE</span>
            </NavLink>
          ),
          permit: {
            permissions: [
              "create-opportunityStage",
              "readAll-opportunityStage",
            ],
            operator: "or",
          },
          key: "opportunityStage",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/opportunity-type">
              <span>OPPORTUNITY TYPE</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-opportunityType", "readAll-opportunityType"],
            operator: "or",
          },
          key: "opportunityType",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "TASK SETUP",
      permit: {
        permissions: [
          "create-taskType",
          "readAll-taskType",
          "create-taskStatus",
          "readAll-taskStatus",
        ],
        operator: "or",
      },
      key: "taskSetup",
      icon: <BiTask />,
      children: [
        {
          label: (
            <NavLink to="/admin/task-status">
              <span>TASK STATUS</span>
            </NavLink>
          ),
          key: "CemTaskStatus",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/task-type">
              <span>TASK TYPE</span>
            </NavLink>
          ),
          key: "CemTaskType",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "TICKET SETUP",
      permit: {
        permissions: [
          "create-ticketStatus",
          "readAll-ticketStatus",
          "create-ticketCategory",
          "readAll-ticketCategory",
        ],
        operator: "or",
      },
      key: "ticketSetup",
      icon: <IoTicketOutline />,
      children: [
        {
          label: (
            <NavLink to="/admin/ticket-status">
              <span>TICKET STATUS</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-ticketStatus", "readAll-ticketStatus"],
            operator: "or",
          },
          key: "CemTicketStatus",
          icon: <UsergroupAddOutlined />,
        },

        {
          label: (
            <NavLink to="/admin/Ticket-category">
              <span>TICKET CATEGORY</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-ticketCategory", "readAll-ticketCategory"],
            operator: "or",
          },
          key: "CemTicketCategory",
          icon: <UsergroupAddOutlined />,
        },
      ],
    },

    {
      label: "LEAD SETUP",
      permit: {
        permissions: ["create-leadSource", "readAll-leadSource"],
        operator: "or",
      },
      key: "leadSetup",
      icon: <MdOutlineLeaderboard />,
      children: [
        {
          label: (
            <NavLink to="/admin/lead-source">
              <span>LEAD SOURCE</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-leadSource", "readAll-leadSource"],
            operator: "or",
          },
          key: "leadSource",
          icon: <RiBillLine />,
        },
      ],
    },
    {
      label: "PRODUCT SETUP",
      permit: {
        permissions: ["create-productCategory", "readAll-productCategory"],
        operator: "or",
      },
      key: "productSetup",
      icon: <CodeSandboxOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/product-category">
              <span>PRODUCT CATEGORY</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-productCategory", "readAll-productCategory"],
            operator: "or",
          },
          key: "product-category",
          icon: <UnorderedListOutlined />,
        },
      ],
    },

    {
      label: (
        <NavLink to="/admin/quote-stage">
          <span>QUOTE STAGE SETUP</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-quoteStage", "readAll-quoteStage"],
        operator: "or",
      },
      key: "quoteStageSetup",
      icon: <TbFileInvoice />,
    },
    {
      label: (
        <NavLink to="/admin/priority">
          <span>PRIORITY</span>
        </NavLink>
      ),
      key: "Priority",

      permit: {
        permissions: ["create-priority", "readAll-priority"],
        operator: "or",
      },

      icon: <UsergroupAddOutlined />,
    },
  ];
}
