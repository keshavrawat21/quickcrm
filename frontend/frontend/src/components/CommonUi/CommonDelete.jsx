import { cn } from "@/utils/functions";
import { DeleteOutlined } from "@ant-design/icons";
import { BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePermissions from "@/utils/usePermissions";
import toast from "react-hot-toast";

export default function CommonDelete({
  title,
  deleteThunk,
  id,
  values,
  navigatePath,
  permission,
  className,
  loadThunk,
  query,
  icon,
  onSuccess,
  button,
  confirmMessage,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { permissions } = usePermissions();


  const onDelete = async () => {
      const hasPermission = permissions?.includes(permission);
      // Check if the user has permission to perform the action
      if (!hasPermission) {
        toast.error("You don't have permission to perform this action.");
        return;
      }

    var result = window.confirm(
      confirmMessage
        ? confirmMessage
        : `Are you sure you want to ${
            values?.status
              ? values?.status === "true"
                ? "hide"
                : "UnHide"
              : "delete"
          }?`
    );
    if (result) {
      const res = await dispatch(
        deleteThunk(
          id
            ? id
            : {
                ...values,
                status: values?.status === "true" ? "false" : "true",
              }
        )
      );
      if (res.payload?.message === "success") {
        loadThunk && dispatch(loadThunk(query && query));
        onSuccess && onSuccess();
      } else if (res.data && !res.error) {
        navigatePath && navigate(navigatePath);
        onSuccess && onSuccess();
      }
    }
  };
  return (
    <>
      {!button && (
        <>
          {icon ? (
            <div onClick={() => onDelete()} className="flex items-center gap-2">
              <span className="cursor-pointer">{icon}</span>
              {title || null}
            </div>
          ) : (
            <div
              onClick={() => onDelete()}
              className={`flex items-center  gap-2 group ${
                values?.status === "true"
                  ? "hover:text-red-500"
                  : "hover:text-primary"
              }`}>
              {values?.status === "false" ? (
                <BiShow />
              ) : (
                <DeleteOutlined
                  className={cn(
                    ` inline-block rounded-md group-hover:text-red-500`,
                    {
                      [className]: className,
                    }
                  )}
                />
              )}
              {title || null}
            </div>
          )}
        </>
      )}

      {button && (
        <div className="cursor-pointer" onClick={() => onDelete()}>
          {button}
        </div>
      )}
    </>
  );
}
