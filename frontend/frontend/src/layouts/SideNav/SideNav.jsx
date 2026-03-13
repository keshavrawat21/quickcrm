import { cn } from "@/utils/functions";
import {
  CodeSandboxOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  FundProjectionScreenOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoDocumentTextOutline, IoTicketOutline } from "react-icons/io5";
import { MdEmail, MdOutlinePermMedia } from "react-icons/md";
import { RiBillLine, RiContactsLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Menu from "../../UI/Menu";
import usePermissions from "../../utils/usePermissions";
import { IoHeadsetOutline } from "react-icons/io5";
import { RiPriceTag3Line } from "react-icons/ri";
import { MdOutlinePercent } from "react-icons/md";

import { BiBuildingHouse } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import { HiOutlineLightBulb } from "react-icons/hi";
import { ImTarget } from "react-icons/im";
import { LuLink } from "react-icons/lu";
import { TiContacts } from "react-icons/ti";
import useSettingNav from "./SettingNav";
import SideNavLoader from "./SideNavLoader";

const SideNav = ({ collapsed, setCollapsed }) => {
  const { permissions } = usePermissions();
  const [active, setActive] = useState({
    isSetting: false,
    isCrm: false,
  });
  const { loading } = useSelector((state) => state.auth);

  const menu = [
    {
      label: (
        <NavLink to="/admin/dashboard">
          <span>DASHBOARD</span>
        </NavLink>
      ),
      key: "dashboard",
      icon: <FundProjectionScreenOutlined />,
    },

    {
      label: (
        <NavLink to="/admin/lead">
          <span>LEADS</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-Lead", "readAll-lead"],
        operator: "or",
      },
      key: "lead",
      icon: <ImTarget />,
    },

    {
      label: (
        <NavLink to="/admin/contact">
          <span>CONTACT</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-contact", "readAll-contact"],
        operator: "or",
      },
      key: "CONTACT",
      icon: <RiContactsLine />,
    },
    {
      label: (
        <NavLink to="/admin/company">
          <span>COMPANY</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-company", "readAll-company"],
        operator: "or",
      },
      key: "COMPANY",
      icon: <BiBuildingHouse />,
    },
    {
      label: (
        <NavLink to="/admin/product">
          <span>PRODUCT</span>
        </NavLink>
      ),
      key: "products",
      permit: {
        permissions: ["create-product", "readAll-product"],
        operator: "or",
      },
      icon: <CodeSandboxOutlined />,
    },
//     {
//   label: (
//     <NavLink to="/admin/price-book">
//       <span>PRICE BOOK</span>
//     </NavLink>
//   ),
//   key: "PRICE_BOOK",
//   icon: <RiPriceTag3Line />,
// },

// {
//   label: (
//     <NavLink to="/admin/tax-rate">
//       <span>TAX RATE</span>
//     </NavLink>
//   ),
//   key: "TAX_RATE",
//   icon: <MdOutlinePercent />,
// },

    {
      label: "SALES",
      key: "sale",
      permit: {
        permissions: [
          "create-saleInvoice",
          "readAll-saleInvoice",
          "readAll-quote",
          "create-quote",
        ],
        operator: "or",
      },
      icon: <FiShoppingCart />,
      children: [
        {
          label: (
            <NavLink to="/admin/quote">
              <span>QUOTE</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-quote", "readAll-quote"],
            operator: "or",
          },
          key: "QUOTE",
          icon: <RiBillLine />,
        },
        {
          label: (
            <NavLink to="/admin/sale-invoice">
              <span>INVOICE</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-saleInvoice", "readAll-saleInvoice"],
            operator: "or",
          },
          key: "invoice",
          icon: <UnorderedListOutlined />,
        },
      ],
    },

    // {
    //   label: (
    //     <NavLink to="/admin/opportunity">
    //       <span>OPPORTUNITY</span>
    //     </NavLink>
    //   ),
    //   permit: {
    //     permissions: ["create-opportunity", "readAll-opportunity"],
    //     operator: "or",
    //   },
    //   key: "OPPORTUNITY",
    //   icon: <HiOutlineLightBulb />,
    // },

    {
      label: (
        <NavLink to="/admin/task">
          <span>TASK</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-projectTask", "readAll-projectTask"],
        operator: "or",
      },
      key: "TASK",
      icon: <GoTasklist />,
    },
    {
      label: "PROJECT",
      key: "project",
      icon: <SettingOutlined />,
      permit: {
        permissions: [
          "create-project",
          "readAll-project",
          "create-team",
          "readAll-team",
        ],
        operator: "or",
      },
      children: [
        {
          label: (
            <NavLink to="/admin/project">
              <span>PROJECT</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-project", "readAll-project"],
            operator: "or",
          },
          key: "project",
          icon: <SettingOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/team">
              <span>TEAM</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-team", "readAll-team"],
            operator: "or",
          },
          key: "team",
          icon: <SettingOutlined />,
        },
      ],
    },
    {
      label: "ACCOUNTS",
      permit: {
        permissions: [
          "create-account",
          "readAll-account",
          "create-transaction",
          "readAll-transaction",
        ],
        operator: "or",
      },
      key: "accounts",
      icon: <WalletOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/account/">
              <span>ACCOUNT</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-account", "readAll-account"],
            operator: "or",
          },
          key: "accountList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/transaction/">
              <span>TRANSACTION</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-transaction", "readAll-transaction"],
            operator: "or",
          },
          key: "transactionList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "REPORT",
      key: "report",
      icon: <IoDocumentTextOutline size={16} />,
      permit: {
        permissions: ["create-report", "readAll-report"],
        operator: "or",
      },
      children: [
        {
          label: (
            <NavLink to="/admin/account/trial-balance">
              <span>TRIAL BALANCE</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/account/balance-sheet">
              <span>BALANCE SHEET</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/account/income">
              <span>INCOME STATEMENT</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },

    {
      label: (
        <NavLink to="/admin/media">
          <span>MEDIA</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-media", "readAll-media"],
        operator: "or",
      },
      key: "media",
      icon: <MdOutlinePermMedia />,
    },

    // CRM

    {
      label: "OTHERS",
      key: "other",
      permit: {
        permissions: [
          "create-note",
          "readAll-note",
          "create-email",
          "readAll-email",
          "create-attachment",
          "readAll-attachment",
        ],
        operator: "or",
      },
      icon: <CodeSandboxOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/note">
              <span>NOTE</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-note", "readAll-note"],
            operator: "or",
          },
          key: "NOTE",
          icon: <TiContacts />,
        },
        {
          label: (
            <NavLink to="/admin/attachment">
              <span>ATTACHMENT</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-attachment", "readAll-attachment"],
            operator: "or",
          },
          key: "ATTACHMENT",
          icon: <LuLink />,
        },
        {
          label: (
            <NavLink to="/admin/email">
              <span>EMAIL</span>
            </NavLink>
          ),
          permit: {
            permissions: ["create-email", "readAll-email"],
            operator: "or",
          },
          key: "EMAIL",
          icon: <MdEmail />,
        },
      ],
    },
    {
  label: (
    <NavLink to="/admin/ai-voice-agent">
      <span>AI VOICE AGENT</span>
    </NavLink>
  ),
  key: "AI_VOICE_AGENT",
  icon: <IoHeadsetOutline />,
},
    {
      label: (
        <NavLink to="/admin/ticket">
          <span>TICKET</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-ticket", "readAll-ticket"],
        operator: "or",
      },
      key: "TICKET",
      icon: <IoTicketOutline />,
    },
  ];

  const SettingMenu = useSettingNav();

  return (
    <div className="overflow-y-auto no-scrollbar h-[calc(100vh-100px)] pb-4 ">
      {loading ? (
        <SideNavLoader />
      ) : (
        <div className="relative">
          <div
            className={cn(
              `absolute w-full transition-all duration-300 ${
                active.isCrm || active.isSetting ? "left-[280px]" : "left-0"
              }`
            )}>
            <Menu
              items={menu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
            {Array.isArray(permissions) && permissions.length > 0 && (
              <>
                <div
                  className={cn(
                    "px-4 flex items-center justify-between font-Popins hover:bg-#f3f4f6 py-3 mx-3 cursor-pointer text-gray-600",
                    {
                      "justify-center px-0 text-lg": collapsed,
                    }
                  )}
                  onClick={() => setActive({ isCrm: false, isSetting: true })}>
                  <span
                    className={cn(
                      "flex items-center text-[15px]  text-gray-600",
                      {
                        "gap-3": !collapsed,
                        "justify-center mr-2": collapsed,
                      }
                    )}>
                    <SettingOutlined />
                    {!collapsed && (
                      <span className="text-[15px] text-gray-600">
                        SETTINGS
                      </span>
                    )}
                  </span>
                  {!collapsed && <IoIosArrowForward />}
                </div>
              </>
            )}
          </div>

          {/* setting menu */}
          <div
            className={cn(
              `absolute w-full text-gray-500 transition-all duration-300 ${
                active.isSetting ? "left-0" : "-left-[280px]"
              }`
            )}>
            <div
              className={cn(
                "px-4 flex items-center font-medium gap-1 font-Popins bg-#f3f4f6  py-3 cursor-pointer",
                {
                  "flex items-center justify-center text-lg ": collapsed,
                }
              )}
              onClick={() =>
                setActive({ isCrm: false, isSetting: false, isHrm: false })
              }>
              <IoIosArrowBack /> {!collapsed && "Back to menu"}
            </div>
            <hr className=" border-gray-300" />
            <Menu
              items={SettingMenu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNav;
