import { loadAllCompanyPaginated } from "@/redux/rtk/features/CRM/company/companySlice";
import { loadAllContactPaginated } from "@/redux/rtk/features/CRM/contact/contactSlice";
import { loadAllOpportunityPaginated } from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadCRMDashboardData } from "@/redux/rtk/features/dashboard/dashboardSlice";
import { loadAllAnnouncementPaginated } from "@/redux/rtk/features/hrm/announcement/announcementSlice";
import { loadAllQuotePaginated } from "@/redux/rtk/features/quote/quoteSlice";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  FileTextOutlined,
  MailOutlined,
  RiseOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { RangePicker } = DatePicker;

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#06b6d4",
];

// KPI Card Component
const KPICard = ({ title, value, icon, bgGradient, trend, trendValue }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 ${bgGradient} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-white/80 text-sm font-medium mb-2">{title}</p>
        <h3 className="text-white text-3xl font-semibold mb-3">{value}</h3>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend === "up"
                ? "text-green-200"
                : trend === "down"
                ? "text-red-200"
                : "text-white/70"
            }`}>
            {trend === "up" && <ArrowUpOutlined />}
            {trend === "down" && <ArrowDownOutlined />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="bg-white/20 rounded-xl p-3">{icon}</div>
    </div>
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
  </div>
);

// Quote Card Component
const QuoteCard = ({ quote }) => (
  <Link
    to={`/admin/quote/${quote.id}`}
    className="block bg-white rounded-xl p-4 transition-all duration-300">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800 transition-colors">
          {quote.quoteName || "Untitled Quote"}
        </h4>
      </div>
      <FileTextOutlined className="text-blue-500 text-lg" />
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <UserOutlined className="text-xs" />
      <span className="truncate">
        {quote.quoteOwner?.username || "No Owner"}
      </span>
    </div>
  </Link>
);

// Contact Card Component
const ContactCard = ({ contact }) => (
  <Link
    to={`/admin/contact/${contact.id}`}
    className="block bg-white rounded-xl p-4 transition-all duration-300">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h4 className="text-base font-semibold text-gray-800 mb-1 transition-colors">
          {contact.firstName} {contact.lastName}
        </h4>
      </div>
      <UserOutlined className="text-purple-500 text-lg" />
    </div>
    <div className="space-y-2">
      {contact.email && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MailOutlined className="text-xs" />
          <span className="truncate">{contact.email}</span>
        </div>
      )}
    </div>
  </Link>
);

// Custom Active Shape for Pie Chart
const renderActiveShapeDesktop = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}) => {
  const RAD = Math.PI / 180;
  const sin = Math.sin(-RAD * (midAngle ?? 0));
  const cos = Math.cos(-RAD * (midAngle ?? 0));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const anchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {/* Main sector + halo */}
      <Sector
        {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />

      {/* Center label (title only) */}
      <text
        x={cx}
        y={cy}
        dy={4}
        textAnchor="middle"
        fill={fill}
        className="font-semibold">
        {payload?.name}
      </text>

      {/* Callout */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={anchor}
        fill="#334155"
        className="font-semibold">
        {value} Tickets
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={16}
        textAnchor={anchor}
        fill="#94a3b8">
        {`${((percent ?? 0) * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

const renderActiveShapeMobile = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}) => {
  return (
    <g>
      {/* Main sector + subtle halo (no callout lines) */}
      <Sector
        {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 4}
        outerRadius={(outerRadius ?? 0) + 8}
        fill={fill}
      />

      {/* Stacked, centered text with line breaks */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        className="font-semibold"
        fill="#0f172a">
        <tspan x={cx} dy="-6" fontWeight="600" fill={fill}>
          {payload?.name}
        </tspan>
        <tspan x={cx} dy="18" fontWeight="600">
          {value} Tickets
        </tspan>
        <tspan x={cx} dy="16" fill="#94a3b8">
          {`${((percent ?? 0) * 100).toFixed(1)}%`}
        </tspan>
      </text>
    </g>
  );
};

const useIsMobile = (query = "(max-width: 640px)") => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);
  return isMobile;
};

export default function Content() {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([null, null]);
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);
  const isMobile = useIsMobile();

  const { crmInfo: dashboardData } = useSelector((state) => state.dashboard);

  const { list: contactList, contactLoading } = useSelector(
    (state) => state.contact
  );
  const { list: companyList, companyLoading } = useSelector(
    (state) => state.company
  );
  const { list: opportunityList, opportunityLoading } = useSelector(
    (state) => state.opportunity
  );
  const { list: quoteList, quoteLoading } = useSelector((state) => state.quote);

  const { list: announcement } = useSelector((state) => state.announcement);

  useEffect(() => {
    dispatch(loadAllContactPaginated({ status: true, count: 5 }));
    dispatch(loadAllCompanyPaginated({ status: true, count: 5 }));
    dispatch(loadAllOpportunityPaginated({ status: true, count: 5 }));
    dispatch(loadAllQuotePaginated({ status: true, count: 5 }));
    dispatch(loadAllAnnouncementPaginated({ status: true, count: 5 }));
  }, [dispatch]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      const startDate = dates[0].format("YYYY-MM-DD");
      const endDate = dates[1].format("YYYY-MM-DD");

      console.log("Date Range:", startDate, "to", endDate);
      dispatch(
        loadCRMDashboardData({
          startDate,
          endDate,
        })
      );
    }
  };

  const leadData = dashboardData?.leadByStatus
    ?.filter((item) => item?.statusCount > 0)
    ?.map((item) => ({
      name: item?.statusName
        ? item.statusName.charAt(0).toUpperCase() + item.statusName.slice(1)
        : "",
      value: item.statusCount,
    }));

  const salesData = dashboardData?.salesByMonth?.map((item) => ({
    month: item.month,
    sales: item.amount,
  }));

  const ticketData = dashboardData?.ticketByStatus
    ?.filter((item) => item?.statusCount > 0)
    ?.map((item) => ({
      name: item?.statusName
        ? item.statusName.charAt(0).toUpperCase() + item.statusName.slice(1)
        : "",
      value: item?.statusCount,
    }));

  const transactionData = dashboardData?.transactionsByMonth?.map((item) => ({
    month: item.month,
    Transactions: item.amount,
  }));

  return (
    <div className="md:p-3 min-h-screen">
      {/* Header Section with Title and Date Range */}
      <div className="mb-8 bg-white rounded-2xl md:p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-1">
              Dashboard
            </h1>
            <p className="text-gray-500 text-sm hidden md:block">
              Track your business metrics and performance
            </p>
          </div>
          <div className="md:flex items-center gap-3 md:mt-0 mt-3">
            <span className="text-gray-600 text-sm font-semibold tracking-wider whitespace-nowrap ">
              Filter by Date:
            </span>
            <RangePicker
              value={dateRange}
              onChange={handleDateChange}
              format="MMM DD, YYYY"
              className="rounded-lg border-none bg-[#fafafa] md:mt-0 mt-2"
              size="large"
              style={{ minWidth: "200px" }}
              placeholder={["Start Date", "End Date"]}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
        <KPICard
          title="Total Leads"
          value={dashboardData?.lead?.count || 0}
          icon={<UserOutlined className="text-2xl text-white" />}
          bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
          trend="info"
          trendValue="Active Leads"
        />
        <KPICard
          title="Follow Up"
          value={dashboardData?.contact?.count || 0}
          icon={<ShopOutlined className="text-2xl text-white" />}
          bgGradient="bg-gradient-to-br from-purple-500 to-purple-600"
          trend="info"
          trendValue="Total Follow ups"
        />
        <KPICard
          title="Quotation"
          value={dashboardData?.company?.count || 0}
          icon={<FileTextOutlined className="text-2xl text-white" />}
          bgGradient="bg-gradient-to-br from-orange-500 to-orange-600"
          trend="info"
          trendValue="Total Quotations"
        />
        <KPICard
          title="Close & Won"
          value={dashboardData?.opportunity?.count || 0}
          icon={<RiseOutlined className="text-2xl text-white" />}
          bgGradient="bg-gradient-to-br from-pink-500 to-pink-600"
          trend="info"
          trendValue="Total Close & Won"
        />
      </div>

      {/* Charts Section - First Row (2 Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Transaction Line Chart */}
        <Card
          className="rounded-2xl duration-300 border-none"
          title={
            <span className="text-md font-semibold text-gray-800">
              Transaction Trends
            </span>
          }>
          {transactionData && transactionData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Transactions"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <p className="text-lg font-medium">No Data Available</p>
              <p className="text-sm">Transaction data will appear here</p>
            </div>
          )}
        </Card>

        {/* Lead Distribution Pie Chart */}
        <Card
          className="rounded-2xl duration-300 border-0"
          title={
            <span className="text-md font-semibold text-gray-800">
              Lead Distribution
            </span>
          }>
          {leadData && leadData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                  }) => {
                    if (percent < 0.05) return null;
                    const radius =
                      innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x =
                      cx + radius * Math.cos((-midAngle * Math.PI) / 180);
                    const y =
                      cy + radius * Math.sin((-midAngle * Math.PI) / 180);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-xs font-medium"
                        style={{ textShadow: "0 0 2px rgba(0,0,0,0.5)" }}>
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  outerRadius={
                    window.innerWidth < 640
                      ? 110
                      : window.innerWidth < 768
                      ? 100
                      : window.innerWidth < 1024
                      ? 110
                      : 110
                  }
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}>
                  {leadData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.96)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "10px",
                  }}
                  content={({ payload }) => (
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4 px-2 sm:px-3 md:px-4">
                      {payload.map((entry, index) => (
                        <div
                          key={`legend-${index}`}
                          className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer transition-all hover:scale-105">
                          <div
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-sm flex-shrink-0"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900 truncate max-w-[80px] sm:max-w-none">
                            {entry.value}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500 font-semibold flex-shrink-0">
                            ({entry.payload.value})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-400 px-4">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-base sm:text-lg font-medium">
                No Data Available
              </p>
              <p className="text-xs sm:text-sm">Lead data will appear here</p>
            </div>
          )}
        </Card>
      </div>

      {/* Charts Section - Second Row (2 Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Bar Chart */}
        <Card
          className="rounded-2xl duration-300 border-0"
          title={
            <span className="text-md font-semibold text-gray-800">
              Sales Overview
            </span>
          }>
          {salesData && salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                />
                <Bar
                  dataKey="sales"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <p className="text-lg font-medium">No Data Available</p>
              <p className="text-sm">Sales data will appear here</p>
            </div>
          )}
        </Card>

        {/* Ticket Status Pie Chart with Custom Active Shape */}
        <Card
          className="rounded-2xl duration-300 border-0"
          title={
            <span className="text-md font-semibold text-gray-800">
              Ticket Status
            </span>
          }>
          {ticketData && ticketData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 56 : 70}
                  outerRadius={isMobile ? 84 : 100}
                  fill="#8884d8"
                  dataKey="value"
                  activeIndex={activeTicketIndex}
                  activeShape={
                    isMobile
                      ? renderActiveShapeMobile
                      : renderActiveShapeDesktop
                  }
                  onMouseEnter={(_, index) =>
                    !isMobile && setActiveTicketIndex(index)
                  }
                  onMouseLeave={() => !isMobile && setActiveTicketIndex(-1)}
                  onClick={(_, index) =>
                    isMobile && setActiveTicketIndex(index)
                  }
                  animationBegin={0}
                  animationDuration={800}>
                  {ticketData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={() => null} />
                <Legend
                  content={({ payload }) => (
                    <div
                      className={`flex ${
                        isMobile
                          ? "flex-col items-center gap-2"
                          : "flex-wrap justify-center gap-4"
                      } mt-4 px-4`}>
                      {payload.map((entry, index) => (
                        <div
                          key={`legend-${index}`}
                          className="flex items-center gap-2 group cursor-pointer transition-all hover:scale-105"
                          onMouseEnter={() =>
                            !isMobile && setActiveTicketIndex(index)
                          }
                          onMouseLeave={() =>
                            !isMobile && setActiveTicketIndex(-1)
                          }
                          onClick={() =>
                            isMobile && setActiveTicketIndex(index)
                          }>
                          <div
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {entry.value}
                          </span>
                          <span className="text-xs text-gray-500 font-semibold">
                            ({entry.payload.value})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              <p className="text-lg font-medium">No Data Available</p>
              <p className="text-sm">Ticket data will appear here</p>
            </div>
          )}
        </Card>
      </div>

      {/* Bottom Section - Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotes Cards */}
        <div className="bg-[#fafafa] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[15px] font-semibold text-gray-800">
              Recent Quotes
            </span>
            <Link
              to="/admin/quote"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm">
              View All →
            </Link>
          </div>
          {quoteLoading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : quoteList && quoteList.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {quoteList.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <FileTextOutlined className="text-4xl mb-2" />
              <p>No quotes available</p>
            </div>
          )}
        </div>

        {/* Recent Contacts Cards */}
        <div className="bg-[#fafafa] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[15px] font-semibold text-gray-800">
              Recent Contacts
            </span>
            <Link
              to="/admin/contact"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm">
              View All →
            </Link>
          </div>
          {contactLoading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : contactList && contactList.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {contactList.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <UserOutlined className="text-4xl mb-2" />
              <p>No contacts available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
