import { Tooltip } from "antd";
import { Fragment } from "react";
import { FaBoxes, FaCoins } from "react-icons/fa";
import { FaMoneyBillTransfer, FaMoneyBills } from "react-icons/fa6";
import { abbreviateNumber } from "../../utils/nFormetter";
import useCurrency from "../../utils/useCurrency";

const DashboardCard = ({ information, count, isCustomer, title }) => {
  const currency = useCurrency();

  // KPI Card Component matching Content.jsx design
  const KPICard = ({ title, value, icon, bgGradient, subtitle }) => (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 ${bgGradient} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white/80 text-sm font-medium mb-2">{title}</p>
          <Tooltip
            title={
              <span className="text-lg">
                ₹
                {value?.toFixed ? value.toFixed(3) : "0.000"}
              </span>
            }>
            <h3 className="text-white text-2xl sm:text-3xl font-semibold mb-3 cursor-help">
              ₹
              {value ? abbreviateNumber(Number(value)) : 0}
            </h3>
          </Tooltip>
          {subtitle && (
            <div className="flex items-center gap-1 text-sm font-medium text-white/70">
              <span>{subtitle}</span>
            </div>
          )}
        </div>
        <div className="bg-white/20 rounded-xl p-3">{icon}</div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
    </div>
  );

  return (
    <Fragment>
      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-5 mb-5">
        {/* Total Sales Card */}
        <KPICard
          title="Total Sales"
          value={information?.totalAmount}
          icon={<FaCoins className="text-2xl text-white" />}
          bgGradient="bg-gradient-to-br from-violet-500 to-violet-600"
          subtitle={`#${count ? abbreviateNumber(count) : 0} Orders`}
        />

        {/* Total Sale Paid Card */}
        <KPICard
          title="Total Sale Paid"
          value={information?.paidAmount}
          icon={<FaMoneyBills className="text-2xl text-white" />}
          bgGradient="bg-gradient-to-br from-purple-500 to-purple-600"
          subtitle="Completed Payments"
        />

        {/* Total Sale Due Card */}
        <KPICard
          title="Total Sale Due"
          value={information?.dueAmount}
          icon={<FaMoneyBillTransfer className="text-2xl text-white" />}
          bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
          subtitle="Pending Payments"
        />

        {/* Total Unit Quantity Card */}
        <KPICard
          title="Total Units"
          value={information?.totalUnitQuantity}
          icon={<FaBoxes className="text-2xl text-white" />}
          bgGradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
          subtitle="Items Sold"
          showCurrency={false}
        />
      </section>
    </Fragment>
  );
};

export default DashboardCard;