import { Card, Statistic } from "antd";
import React from "react";
import { CgOrganisation } from "react-icons/cg";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoTicketOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";

const DashboardCard = ({ information }) => {
  return (
    <>
      <section>
        <div className="site-statistic-demo-card">
          <div className="grid 2xl:grid-cols-5  md:grid-cols-5 sm:grid-cols-3 max-w-8xl mx-auto gap-4 ">
            <div>
              <Card
                className="shadow-md txt-color-2 text-center bg-[#E0E7FF] "
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#4F46E5]  txt-color-2">Leads</p>
                  }
                  loading={!information}
                  value={information?.lead?.count || 0}
                  valueStyle={{ color: "#4F46E5" }}
                  prefix={<FiUser className="mr-4 mb-[-10px] text-[35px]" />}
                />
              </Card>
            </div>
            <div>
              <Card
                className="shadow-md bg-[#EDE9FE] txt-color-2 text-center"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#7C3AED] txt-color-2">
                      Contact
                    </p>
                  }
                  loading={!information}
                  value={information?.contact?.count || 0}
                  valueStyle={{ color: "#7C3AED" }}
                  prefix={
                    <HiOutlineUserCircle className="mr-4 mb-[-10px] text-[35px]" />
                  }
                />
              </Card>
            </div>
            <div>
              <Card
                className="shadow-md txt-color-2 bg-[#E0E7FF] text-center"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#4F46E5] txt-color-2">
                      Company
                    </p>
                  }
                  loading={!information}
                  value={information?.company?.count || 0}
                  valueStyle={{ color: "#4F46E5" }}
                  prefix={
                    <CgOrganisation className="mr-4 mb-[-10px] text-[35px]" />
                  }
                />
              </Card>
            </div>
            <div>
              <Card
                className="shadow-md txt-color-2 bg-[#EDE9FE] text-center"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#7C3AED] txt-color-2">
                      Opportunity
                    </p>
                  }
                  loading={!information}
                  value={information?.opportunity?.count || 0}
                  valueStyle={{ color: "#7C3AED" }}
                  prefix={
                    <GiReceiveMoney className="mr-4 mb-[-10px] text-[35px]" />
                  }
                />
              </Card>
            </div>

            <div>
              <Card
                className=" txt-color-2 shadow-md bg-[#E0E7FF] text-center"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#4F46E5] txt-color-2">
                      Opportunity Value
                    </p>
                  }
                  loading={!information}
                  value={information?.opportunity?.value || 0}
                  valueStyle={{ color: "#4F46E5" }}
                  prefix={
                    <FaRegMoneyBillAlt className="mr-4 mb-[-10px] text-[35px]" />
                  }
                />
              </Card>
            </div>
          </div>
          <div className="grid 2xl:grid-cols-5 2xl:px-24 px-4 md:grid-cols-5 sm:grid-cols-3 max-w-8xl mx-auto gap-4 mt-4 ">
            <div>
              <Card
                className="shadow-md txt-color-2 text-center bg-[#E0E7FF] "
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#4F46E5]  txt-color-2">
                      Sale Value
                    </p>
                  }
                  loading={!information}
                  value={information?.saleInvoiceValue || 0}
                  valueStyle={{ color: "#4F46E5" }}
                  prefix={
                    <FaRegMoneyBillAlt className="mr-4 mb-[-10px] text-[35px]" />
                  }
                />
              </Card>
            </div>
            <div>
              <Card
                className="shadow-md bg-[#EDE9FE] txt-color-2 text-center"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#7C3AED] txt-color-2">Quote</p>
                  }
                  loading={!information}
                  value={information?.quote?.count || 0}
                  valueStyle={{ color: "#7C3AED" }}
                  prefix={
                    <TbFileInvoice className="mr-4 mb-[-10px] text-[35px]" />
                  }
                />
              </Card>
            </div>
            <div>
              <Card
                className="shadow-md txt-color-2 bg-[#E0E7FF] text-center"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#4F46E5] txt-color-2">
                      Quote Value
                    </p>
                  }
                  loading={!information}
                  value={information?.quote?.value || 0}
                  valueStyle={{ color: "#4F46E5" }}
                  prefix={
                    <FaRegMoneyBillAlt className="mr-4 mb-[-10px] text-[35px]" />
                  }
                />
              </Card>
            </div>
            <div>
              <Card
                className=" txt-color-2 shadow-md bg-[#EDE9FE] text-center"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#7C3AED] txt-color-2">
                      Invoice
                    </p>
                  }
                  loading={!information}
                  value={information?.saleInvoice?.count || 0}
                  valueStyle={{ color: "#7C3AED" }}
                  prefix={
                    <TbFileInvoice className="mr-4 mb-[-10px] text-[35px]" />
                  }
                />
              </Card>
            </div>

            <div>
              <Card
                className=" txt-color-2 shadow-md bg-[#E0E7FF] text-center"
                bordered={false}>
                <Statistic
                  title={<p className="text-xl text-[#4F46E5]">Tickets</p>}
                  loading={!information}
                  value={information?.ticket?.count || 0}
                  valueStyle={{ color: "#4F46E5" }}
                  prefix={
                    <IoTicketOutline className="mr-4 mb-[-10px] text-[35px]" />
                  }
                />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardCard;
