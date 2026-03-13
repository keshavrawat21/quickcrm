import { Route } from "react-router-dom";
import MasterRoutes from "./AdminRoutes/MasterRoutes";
import AccountRoutes from "./AdminRoutes/AccountRoutes";
import CommonRoutes from "./AdminRoutes/CommonRoutes";
import EmailRoutes from "./AdminRoutes/EmailRoutes";
import PaymentRoutes from "./AdminRoutes/PaymentRoutes";
import ProductRoutes from "./AdminRoutes/ProductRoutes";
import AIVoiceAgent from "@/components/AIVoiceAgent";

import TermsAndConditionRoutes from "./AdminRoutes/TermsAndConditionRoutes";
import TransactionRoutes from "./AdminRoutes/TransactionRoutes";
import useSettingRoutes from "./AdminRoutes/useSettingRoutes";

import ContactRoutes from "./CrmRoutes/ContactRoutes";
import CompanyRoutes from "./CrmRoutes/CompanyRoutes";
import OpportunityRoutes from "./CrmRoutes/OpportunityRoutes";
import TaskRoutes from "./CrmRoutes/TaskRoutes";
import TicketRoutes from "./CrmRoutes/TicketRoutes";
import QuoteRoutes from "./CrmRoutes/QuoteRoutes";
import NoteRoutes from "./CrmRoutes/NoteRoutes";
import AttachmentRoutes from "./CrmRoutes/AttachmentRoutes";
import ShiftRoutes from "./HrmRoutes/ShiftRoutes";
import DepartmentRoutes from "./HrmRoutes/DepartmentRoutes";
import DesignationRoutes from "./HrmRoutes/DesignationRoutes";
import EmploymentRoutes from "./HrmRoutes/EmploymentRoutes";
import AwardRoutes from "./HrmRoutes/AwardRoutes";
import AnnouncementRoutes from "./HrmRoutes/AnnouncementRoutes";
import UserRoutes from "./HrmRoutes/UserRoute";
import RoleRoutes from "./HrmRoutes/RoleRoutes";
import LeadRoutes from "./CrmRoutes/LeadRoutes";
import ProjectRoutes from "./HrmRoutes/ProjectRoutes";
import ProductCategoryRoutes from "./AdminRoutes/ProductCategoryRoutes";
import useSaleRoutes from "./AdminRoutes/SaleRoutes";

export default function useAdminRoutes() {
  const SettingsRoutes = useSettingRoutes();
  const SaleRoutes = useSaleRoutes();

  const routes = [
    ...ProductRoutes,
    ...ProductCategoryRoutes,
    ...MasterRoutes,
    ...SaleRoutes,
    ...TransactionRoutes,
    ...AccountRoutes,
    ...TermsAndConditionRoutes,
    ...PaymentRoutes,
    ...CommonRoutes,
    ...SettingsRoutes,
    ...EmailRoutes,
    <Route path="ai-voice-agent" element={<AIVoiceAgent />} key="ai-voice-agent" />,
    // crm
    ...ContactRoutes,
    ...CompanyRoutes,
    ...OpportunityRoutes,
    ...TaskRoutes,
    ...TicketRoutes,
    ...QuoteRoutes,
    ...NoteRoutes,
    ...AttachmentRoutes,
    ...LeadRoutes,
    //
    ...ShiftRoutes,
    ...DepartmentRoutes,
    ...DesignationRoutes,
    ...EmploymentRoutes,
    ...AwardRoutes,
    ...AnnouncementRoutes,
    ...UserRoutes,
    ...RoleRoutes,
    ...ProjectRoutes,
  ];

  return routes;
}
