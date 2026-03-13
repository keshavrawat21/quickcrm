import usePermissions from "@/utils/usePermissions";
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

export default function CreateButton({ title, path, permission }) {
  const { permissions } = usePermissions();
  const hasPermission = permissions?.includes(permission);

  if (!hasPermission) {
    return (
      <div>
        <Tooltip title="Permission denied">
          <button
            disabled
            className="xs:px-3 px-2 flex items-center gap-1 md:gap-2 md:text-base py-[6px] lg:px-5 border bg-gray-400 text-white rounded cursor-not-allowed opacity-70"
          >
            <span className="flex items-center justify-center gap-1 md:gap-2 ">
              {<PlusOutlined />}
              <span className="">{title || "Add Item"}</span>
            </span>
          </button>
        </Tooltip>
      </div>
    );
  }

  return (
    <Link to={path}>
      <button
        className={`xs:px-3 px-2 md:text-base py-[6px] lg:px-5  border bg-primary
         hover:bg-primary/60 text-white rounded cursor-pointer`}
      >
        <span className="flex items-center justify-center gap-1 md:gap-2 ">
          {<PlusOutlined />}
          <span className="">{title || "Add Item"}</span>
        </span>
      </button>
    </Link>
  );
}
