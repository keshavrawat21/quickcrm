import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearCompanyTypeEdit,
  deleteCompanyType,
  editCompanyType,
  loadAllCompanyType,
} from "@/redux/rtk/features/CRM/companyType/companyTypeSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCompanyType from "./AddCompanyType";
import UpdateCompanyType from "./UpdateCompanyType";

export default function GetAllCompanyType() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.companyType
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "companyTypeName",
    },
    {
      title: "CREATE DATE",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
    },
    {
      title: "UPDATE DATE",
      dataIndex: "updatedAt",
      render: (date) => moment(date).format("ll"),
    },
    {
      id: 3,
      title: "",
      key: "action",
      render: ({ id, companyTypeName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(editCompanyType({ id, values: { companyTypeName } }))
              }
              className="flex items-center gap-2 cursor-pointer">
              <EditOutlined className=" rounded-md" />
              Edit
            </div>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              id={id}
              title={"delete"}
              permission={"delete-companyType"}
              deleteThunk={deleteCompanyType}
              loadThunk={loadAllCompanyType}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllCompanyType());
  }, [dispatch]);

  return (
    <UserPrivateComponent permission={"readAll-companyType"}>
      <TableComponent
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        title={"Company Type List"}
        isSearch={false}
        componentTitle={"Company Types"}
        extra={
          <CreateDrawer
            permission={"create-companyType"}
            title={"Create Company Type"}
            width={40}>
            <AddCompanyType />
          </CreateDrawer>
        }
      />
      <UpdateDrawer
        permission={"update-companyType"}
        title={"Update Company Type"}
        width={35}
        open={edit}
        setClose={clearCompanyTypeEdit}>
        <UpdateCompanyType edit={edit} />
      </UpdateDrawer>
    </UserPrivateComponent>
  );
}
