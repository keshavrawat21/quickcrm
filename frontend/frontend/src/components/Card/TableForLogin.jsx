import Menu from "@/UI/Menu";
import { cn } from "@/utils/functions";
import { Popover } from "antd";
import { BsDatabaseExclamation, BsThreeDots } from "react-icons/bs";

const TableForLogin = ({
  columns,
  data,
  loading = false,
  loadingUiSize = 5,
  scroll = {},
  headClass,
  nestedRowKey,
  setDefaultValue,
}) => {
  let nestedRow = null;
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

  const handleSetValue = (item) => {
    setDefaultValue([item]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div
        style={{
          maxHeight: scroll.y ? `${scroll.y}px` : "auto",
        }}>
        <table className="w-full">
          <thead
            className={cn("bg-gray-50 border-b border-gray-200", {
              [headClass]: headClass,
            })}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.title || null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
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
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleSetValue(nestedItem)}>
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
                                  className={cn(
                                    "px-4 py-3 text-sm text-gray-900",
                                    {
                                      [column.tdClass]: column.tdClass,
                                    }
                                  )}>
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
                    <tr
                      key={index}
                      className="hover:bg-blue-50 cursor-pointer transition-colors duration-200 border-l-4 border-transparent hover:border-blue-500"
                      onClick={() => handleSetValue(item)}>
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
                              "px-4 py-3 text-sm text-gray-900 font-medium",
                              {
                                [column.tdClass]: column.tdClass,
                              }
                            )}>
                            {renderItem(item, column)}
                          </td>
                        );
                      })}
                      {nestContent}
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
        {!data?.length && !loading && (
          <div className="flex flex-col justify-center items-center py-8">
            <BsDatabaseExclamation className="text-gray-300 mb-2" size={48} />
            <span className="text-sm text-gray-500">
              No login options available
            </span>
          </div>
        )}
        {loading && <TableLoader length={loadingUiSize} />}
      </div>
    </div>
  );
};

export default TableForLogin;

const TableLoader = ({ length = 3 }) => {
  const loaderArray = Array(length).fill("1");
  return (
    <div className="divide-y divide-gray-200">
      {loaderArray.map((_, index) => (
        <div key={index} className="px-4 py-3 flex gap-4">
          <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
};
