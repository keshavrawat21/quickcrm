import { cn } from "@/utils/functions";
import { useState } from "react";

export default function Tabs({ children, className }) {
  children = Array.isArray(children) ? children : [children];
  const [activeTab, setActiveTab] = useState(
    children[0]?.props?.myKey || children[0]?.props?.label
  );

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className={cn("", { [className]: className })}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-xl bg-gray-50 py-2 gap-2">
        <ul className="minimal-scrollbar flex items-center gap-2 sm:gap-6 px-2 sm:px-6 overflow-x-auto flex-grow">
          {children.map((tab) => (
            <li
              key={tab.props.label}
              className={cn(
                "py-2 sm:py-3 px-3 sm:px-4 relative text-[13px] sm:text-[14px] font-medium cursor-pointer transition-all duration-200 rounded-lg flex-shrink-0",
                {
                  "text-gray-600 hover:text-blue-600 hover:shadow-sm dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800":
                    activeTab !== (tab.props.myKey || tab.props.label),
                  "text-blue-600 shadow-sm dark:text-blue-400 dark:bg-gray-800":
                    activeTab === (tab.props.myKey || tab.props.label),
                }
              )}
              onClick={(e) =>
                handleClick(e, tab.props.myKey || tab.props.label)
              }>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {tab.props.icon && (
                  <div className="text-sm sm:text-md flex-shrink-0">
                    {tab.props.icon}
                  </div>
                )}
                <span className="whitespace-nowrap font-medium">
                  {tab.props.label}
                </span>
              </div>
              {activeTab === (tab.props.myKey || tab.props.label) && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-t-full"></div>
              )}
            </li>
          ))}
        </ul>
        {children.map((one, index) => {
          if (
            (one.props.myKey || one.props.label) === activeTab &&
            one.props.action
          )
            return (
              <div
                key={one.props.label + index}
                className="px-2 sm:px-0 sm:pr-4">
                {one.props.action}
              </div>
            );
          else return null;
        })}
      </div>
      <div className="mt-2 sm:mt-0">
        {children.map((one, index) => {
          if ((one.props.myKey || one.props.label) === activeTab)
            return (
              <div key={one.props.label + index}>{one.props.children}</div>
            );
          else return null;
        })}
      </div>
    </div>
  );
}

export const Tab = ({ children, label, icon }) => {
  if (!label) {
    throw new Error("Tab component must have a label prop");
  }
  return <>{children}</>;
};
