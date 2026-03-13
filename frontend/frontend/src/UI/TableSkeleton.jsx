import { Button } from "antd";
import { CiCreditCard2, CiViewTable } from "react-icons/ci";

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
                <CiCreditCard2 size={16} className="text-gray-300" />
                <span className="text-xs text-gray-300">Card</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-white rounded">
                <CiViewTable size={16} className="text-gray-400" />
                <span className="text-xs text-gray-400">List</span>
              </div>
            </div>
          )}

          {/* Export Buttons Skeleton */}
          <Button disabled className="gap-1 text-xs opacity-50">
            Print
          </Button>
          <Button disabled className="gap-1 text-xs opacity-50">
            Export
          </Button>
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

export default TableSkeleton;
