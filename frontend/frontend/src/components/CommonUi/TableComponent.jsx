import CommonSearch from "@/components/CommonUi/CommonSearch";
import Filter from "@/components/CommonUi/Filter";
import PrintPDF from "@/components/CommonUi/PrintPdf";
import ColVisibilityDropdown from "@/components/Shared/ColVisibilityDropdown";
import CSV from "@/UI/CSV";
import Pagination from "@/UI/Pagination";
import Segmented from "@/UI/Segmented";
import Table from "@/UI/Table";
import { Button, Popover } from "antd";
import { useEffect, useState } from "react";
import { BsDatabaseExclamation, BsFiletypeCsv } from "react-icons/bs";
import { CiCreditCard2, CiViewTable } from "react-icons/ci";
import { FiMoreVertical, FiPrinter } from "react-icons/fi";
import ResponsiveMobileCard from "./ResponsiveMobileCard";

export default function TableComponent({
  list,
  total,
  loading,
  children,
  filters,
  columns,
  extraFilter,
  title,
  setPageConfig,
  isSearch,
  loadingUiSize = 10,
  nestedRowKey,
  card,
  defaultView = "list",
  tabs = [],
  primaryActions = [],
  secondaryActions = [],
  componentTitle,
  extra,
}) {
  const fetchData = (page, count) => {
    setPageConfig((prev) => {
      return { ...prev, page, count };
    });
  };

  const [view, setView] = useState(defaultView);
  const [columnsToShow, setColumnsToShow] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || "all");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setColumnsToShow(columns);
  }, [columns?.length]);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const handleChange = (value) => {
    setView(value);
  };

  const options = [
    {
      value: "card",
      icon: <CiCreditCard2 size={20} />,
      title: "Card",
    },
    {
      value: "list",
      icon: <CiViewTable size={20} />,
      title: "List",
    },
  ];

  // Mobile popover content
  const mobilePopoverContent = (
    <div className="flex flex-col gap-1 py-1 min-w-[160px]">
      <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
        <FiPrinter className="text-gray-500 text-sm" />
        <PrintPDF list={list} columns={columns} title={title} />
      </div>

      <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
        <BsFiletypeCsv className="text-gray-500 text-sm" />
        <CSV notButton={true} list={list} columns={columns} title={title} />
      </div>

      {!card && !isMobile && (
        <>
          <div className="h-px bg-gray-200 my-1" />
          <div className="px-2 py-2 hover:bg-gray-50 rounded-md transition-colors">
            <ColVisibilityDropdown
              options={columns}
              columns={columns}
              columnsToShowHandler={columnsToShowHandler}
            />
          </div>
        </>
      )}
    </div>
  );

  // Render loading skeleton for cards
  const renderCardSkeleton = () => {
    return Array(loadingUiSize)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
          <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-100">
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ));
  };

  // Determine if we should show mobile card view
  const shouldShowMobileCards = isMobile || (card && view === "card");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between px-4 py-2 gap-2">
          <div className="flex items-center gap-4">
            <h1 className="text-lg">{componentTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="cartExtra flex gap-2 items-center">{extra}</div>
          </div>
        </div>
      </div>

      {/* Filters & View Controls Bar */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-3">
          {isSearch && (
            <div className="flex-1 max-w-full">
              <CommonSearch
                setPageConfig={setPageConfig}
                placeholder="Search"
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <div className="hideScrollBar overflow-x-auto overflow-y-hidden flex items-center gap-2 flex-1">
              <Filter
                setPageConfig={setPageConfig}
                filters={filters}
                extraFilter={extraFilter}
              />
            </div>

            <div className="flex items-center gap-2">
              {card && (
                <Segmented
                  options={options}
                  value={view}
                  onChange={handleChange}
                />
              )}

              <Popover
                content={mobilePopoverContent}
                trigger="click"
                placement="bottomLeft"
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
                overlayClassName="mobile-popover">
                <Button
                  type="text"
                  size="small"
                  className="h-8 w-8 p-0 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  icon={<FiMoreVertical className="text-gray-600" />}
                />
              </Popover>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            {isSearch && (
              <div className="w-64 max-w-full">
                <CommonSearch
                  setPageConfig={setPageConfig}
                  placeholder="Search"
                />
              </div>
            )}

            <div className="hideScrollBar overflow-x-auto overflow-y-hidden flex-1 flex items-center gap-2">
              <Filter
                setPageConfig={setPageConfig}
                filters={filters}
                extraFilter={extraFilter}
              />

              {!card && (
                <div>
                  <ColVisibilityDropdown
                    options={columns}
                    columns={columns}
                    columnsToShowHandler={columnsToShowHandler}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {card && (
              <Segmented
                options={options}
                value={view}
                onChange={handleChange}
              />
            )}

            <div className="flex items-center gap-2">
              <Button color="white" className="text-xs flex items-center gap-1">
                <FiPrinter />
                <PrintPDF list={list} columns={columns} title={title} />
              </Button>

              <Button color="white" className="text-xs flex items-center gap-1">
                <BsFiletypeCsv />
                <CSV
                  notButton={true}
                  list={list}
                  columns={columns}
                  title={title}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="">
        {/* Desktop Table View or when list view is selected */}
        {!shouldShowMobileCards && (
          <Table
            loading={loading}
            columns={columnsToShow}
            nestedRowKey={nestedRowKey}
            data={
              !!list?.length && list.map((item) => ({ ...item, key: item?.id }))
            }
            scroll={{ y: window.innerHeight - 250 }}
            loadingUiSize={loadingUiSize}
            showSearch={isSearch}
            showViewToggle={!!card}
            componentTitle={componentTitle}
          />
        )}

        {/* Mobile Card View or when card view is selected */}
        {shouldShowMobileCards && (
          <div className="p-4">
            {loading && !list?.length ? (
              <div className="grid grid-cols-1 gap-4">
                {renderCardSkeleton()}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {list?.map((item) => (
                    <ResponsiveMobileCard
                      key={item.id}
                      item={item}
                      columns={columns}
                    />
                  ))}
                </div>
                {!list?.length && !loading && (
                  <div className="flex flex-col justify-center items-center py-16">
                    <BsDatabaseExclamation
                      className="text-gray-300 mb-3"
                      size={60}
                    />
                    <span className="text-gray-500">Empty</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Custom Card View (if card prop is provided) */}
        {card && view === "card" && !isMobile && (
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {list?.map((item) => card(item))}
            </div>
            {!list?.length && !loading && (
              <div className="flex flex-col justify-center items-center py-16">
                <BsDatabaseExclamation
                  className="text-gray-300 mb-3"
                  size={60}
                />
                <span className="text-gray-500">Empty</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {total >= 11 && (
        <div className="flex justify-center px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <Pagination onChange={fetchData} total={total} />
        </div>
      )}

      {children && children}
    </div>
  );
}
