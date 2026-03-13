import React from "react";
import usePermissions from "../../utils/usePermissions";

const UserPrivateComponent = ({ permission, children, comment, type }) => {
  const { permissions } = usePermissions();
 
  if (permissions?.includes(permission)) {
    return <>{children}</>;
  } else {
    if (type === "update") {
      return (
        <div className="p-4 flex justify-center items-center min-h-[300px] w-[550px] mx-auto">
          <h1 className="text-lg text-gray-500 font-semibold">
            {comment || "You don't have permission to update this action" }
          </h1>
        </div>
      );
    } else {
      return "";
    }
  }
};

export default UserPrivateComponent;
