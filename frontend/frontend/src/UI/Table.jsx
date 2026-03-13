import { Popover } from "antd";
import { BsDatabaseExclamation, BsThreeDots } from "react-icons/bs";
import { cn } from "../utils/functions";
import Menu from "./Menu";

const Table = ({
  columns,
  data,
  loading = false,
  loadingUiSize = 5,
  scroll = {},
  headClass,
  nestedRowKey,
  showFilters = false,
  showSearch = false,
  showViewToggle = false,
  componentTitle = "",
}) => {
  let nestedRow = null;

  // Show skeleton when loading and no data
  if (loading && (!data || data.length === 0)) {
    return (
      <TableSkeleton
        loadingUiSize={loadingUiSize}
        columnsCount={columns?.length || 5}
        showFilters={showFilters}
        showSearch={showSearch}
        showViewToggle={showViewToggle}
        componentTitle={componentTitle}
        fullPage={false}
      />
    );
  }

  const renderItem = (item, column) => {
    if (column?.key === "action" && column?.render) {
      return (
        <Popover
          content={<Menu items={column.render(item)} />}
          placement="bottomRight"
          arrow={false}
          trigger="click">
          <BsThreeDots className="cursor-pointer text-base mr-2" />
        </Popover>
      );
    } else if (
      column?.dataIndex &&
      Object.prototype.hasOwnProperty.call(item, column?.dataIndex)
    ) {
      if (column.render)
        return column.render(item[column?.dataIndex], item) || "-";
      else if (typeof item[column?.dataIndex] === "number") {
        return item[column?.dataIndex];
      } else {
        return item[column?.dataIndex] ? item[column?.dataIndex] : "-";
      }
    } else if (column.render && !column?.dataIndex) {
      return column.render(item) || "-";
    }
    return "-";
  };

  const renderNestedRow = (nestedItem, column) => {
    if (column.renderNested)
      return column.renderNested(nestedItem[column.nestDataIndex]) || "-";
  };

  return (
    <div className="tableContainer tableScrollBar overflow-y-auto w-full">
      <div
        style={{
          maxHeight: scroll.y ? `${scroll.y}px` : "auto",
        }}>
        <table
          className=""
          style={{
            width: "100%",
          }}>
          <thead
            className={cn(
              "font-Popins text-black/70 bg-white border-b border-gray-200 sticky top-0 z-10 tracking-wider",
              { [headClass]: headClass }
            )}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`py-[14px] pl-3 text-left whitespace-nowrap tracking-wide ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${index === columns.length - 1 ? "rounded-tr-lg" : ""}`}>
                  {column.title || null}
                </th>
              ))}
            </tr>
          </thead>
          {data?.length > 0 && !loading && (
            <>
              {data.map((item, index) => {
                const isNest = Boolean(
                  nestedRowKey &&
                    item[nestedRowKey] &&
                    item[nestedRowKey].length > 1
                );

                if (isNest) {
                  nestedRow = item[nestedRowKey];
                }
                let nestContent = null;
                if (nestedRow) {
                  nestContent = nestedRow.map((nestedItem, nestedIndex) => {
                    if (nestedIndex === 0) {
                      return null;
                    }
                    return (
                      <tr
                        key={nestedIndex}
                        className={`${
                          nestedIndex === nestedRow.length - 1
                            ? "border-b"
                            : "border-b border-b-slate-900/20"
                        }`}>
                        {columns.map((column) => {
                          if (
                            column?.nestDataIndex &&
                            Object.prototype.hasOwnProperty.call(
                              nestedItem,
                              column?.nestDataIndex
                            )
                          ) {
                            return (
                              <td
                                key={column.key}
                                className={cn("py-2 pl-3 whitespace-nowrap", {
                                  [column.tdClass]: column.tdClass,
                                })}>
                                {renderNestedRow(nestedItem, column)}
                              </td>
                            );
                          } else return null;
                        })}
                      </tr>
                    );
                  });
                }
                nestedRow = null;
                return (
                  <tbody
                    className="bg-tableBg hover:bg-slate-900/5"
                    key={index}>
                    <tr
                      className={cn("", {
                        "border-b": index !== data.length - 1,
                        "border-b border-b-slate-900/10":
                          isNest && index !== data.length - 1,
                      })}>
                      {columns.map((column, colIndex) => {
                        const isNest = Boolean(
                          nestedRowKey &&
                            item[nestedRowKey] &&
                            item[nestedRowKey].length > 1
                        );
                        const isSetRowSpan = Boolean(
                          isNest && !column.renderNested
                        );
                        return (
                          <td
                            rowSpan={
                              isSetRowSpan ? item[nestedRowKey].length : 1
                            }
                            key={column.key}
                            className={cn(
                              "py-3 px-3 pl-3 whitespace-nowrap",
                              {
                                "rounded-bl-lg":
                                  index === data.length - 1 && colIndex === 0,
                              },
                              {
                                "rounded-br-lg":
                                  index === data.length - 1 &&
                                  colIndex === columns.length - 1,
                              },
                              {
                                [column.tdClass]: column.tdClass,
                              }
                            )}>
                            {renderItem(item, column)}
                          </td>
                        );
                      })}
                    </tr>
                    {nestContent || null}
                  </tbody>
                );
              })}
            </>
          )}
        </table>
        {!data?.length && !loading && (
          <div
            colSpan={columns.length}
            className="flex flex-col justify-center items-center h-full py-10">
            <BsDatabaseExclamation className="text-slate-200" size={70} />
            <span className="py-2 text-lg text-slate-500">Empty</span>
          </div>
        )}
        {loading && data?.length > 0 && <TableLoader length={loadingUiSize} />}
      </div>
    </div>
  );
};

export default Table;

const TableLoader = ({ length = 3, columnsCount = 5 }) => {
  const loaderArray = Array(length).fill(null);
  const skeletonColumns = Array(columnsCount).fill(null);

  return (
    <tbody>
      {loaderArray.map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="bg-white hover:bg-gray-50 border-b border-gray-100">
          {skeletonColumns.map((_, colIndex) => (
            <td key={colIndex} className="py-3 px-3 whitespace-nowrap">
              <div
                className={`h-4 bg-gray-200 rounded animate-pulse ${
                  colIndex === 0
                    ? "w-32"
                    : colIndex === skeletonColumns.length - 1
                    ? "w-20"
                    : "w-24"
                }`}
                style={{
                  animationDelay: `${rowIndex * 0.1 + colIndex * 0.05}s`,
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const TableSkeleton = ({
  loadingUiSize = 10,
  columnsCount = 5,
  showFilters = true,
  showSearch = true,
  showViewToggle = true,
  componentTitle = "Loading...",
}) => {
  const skeletonRows = Array(loadingUiSize).fill(null);
  const skeletonColumns = Array(columnsCount).fill(null);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Top Navigation Bar Skeleton */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between px-4 py-2 gap-2">
          {/* Left Side - Title Skeleton */}
          <div className="flex items-center gap-4">
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Right Side - Actions Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Filters & View Controls Bar Skeleton */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 gap-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        {/* Left - Filters Skeleton */}
        <div className="flex items-center gap-2 flex-1">
          {/* Search Skeleton */}
          {showSearch && (
            <div className="w-64">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          )}

          {/* Filters Skeleton */}
          {showFilters && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          )}
        </div>

        {/* Right - View & Export Controls Skeleton */}
        <div className="flex items-center gap-2">
          {/* View Toggle Skeleton */}
          {showViewToggle && (
            <div className="flex bg-gray-100 rounded p-1">
              <div className="flex items-center gap-1 px-3 py-1">
                <div className="w-4 h-4 bg-gray-300 rounded" />
                <span className="text-xs text-gray-300">Card</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-white rounded">
                <div className="w-4 h-4 bg-gray-400 rounded" />
                <span className="text-xs text-gray-400">List</span>
              </div>
            </div>
          )}

          {/* Export Buttons Skeleton */}
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse opacity-50" />
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse opacity-50" />
        </div>
      </div>

      {/* Table Content Skeleton */}
      <div className="overflow-hidden">
        <table className="w-full">
          {/* Table Header Skeleton */}
          <thead className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <tr>
              {skeletonColumns.map((_, index) => (
                <th
                  key={index}
                  className={`py-[14px] pl-3 text-left ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${
                    index === skeletonColumns.length - 1 ? "rounded-tr-lg" : ""
                  }`}>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body Skeleton */}
          <tbody>
            {skeletonRows.map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white hover:bg-gray-50 border-b border-gray-100">
                {skeletonColumns.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-3 px-3 whitespace-nowrap ${
                      rowIndex === skeletonRows.length - 1 && colIndex === 0
                        ? "rounded-bl-lg"
                        : ""
                    } ${
                      rowIndex === skeletonRows.length - 1 &&
                      colIndex === skeletonColumns.length - 1
                        ? "rounded-br-lg"
                        : ""
                    }`}>
                    <div
                      className={`h-4 bg-gray-200 rounded animate-pulse ${
                        colIndex === 0
                          ? "w-32"
                          : colIndex === skeletonColumns.length - 1
                          ? "w-20"
                          : "w-24"
                      }`}
                      style={{
                        animationDelay: `${rowIndex * 0.1 + colIndex * 0.05}s`,
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
