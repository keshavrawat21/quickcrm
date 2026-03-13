import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearIndustryEdit,
  deleteIndustry,
  editIndustry,
  loadAllIndustry,
} from "@/redux/rtk/features/CRM/industry/industrySlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIndustry from "./AddIndustry";
import UpdateIndustry from "./UpdateIndustry";

export default function GetAllIndustry() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector((state) => state.industry);

  const columns = [
    {
      title: "NAME",
      dataIndex: "industryName",
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
      render: ({ id, industryName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(editIndustry({ id, values: { industryName } }))
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
              permission={"delete-industry"}
              deleteThunk={deleteIndustry}
              loadThunk={loadAllIndustry}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllIndustry());
  }, [dispatch]);

  return (
    <UserPrivateComponent permission={"readAll-industry"}>
      <TableComponent
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        title={"Industry List"}
        isSearch={false}
        componentTitle={"Industry"}
        extra={
          <CreateDrawer
            permission={"create-industry"}
            title={"Create Industry"}
            width={35}>
            <AddIndustry />
          </CreateDrawer>
        }
      />
      <UpdateDrawer
        permission={"update-industry"}
        title={"Update Industry"}
        width={35}
        open={edit}
        setClose={clearIndustryEdit}>
        <UpdateIndustry edit={edit} />
      </UpdateDrawer>
    </UserPrivateComponent>
  );
}
