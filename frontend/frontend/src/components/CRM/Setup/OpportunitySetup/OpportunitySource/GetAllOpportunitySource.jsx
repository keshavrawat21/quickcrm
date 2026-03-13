import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearOpportunitySourceEdit,
  deleteOpportunitySource,
  editOpportunitySource,
  loadAllOpportunitySource,
} from "@/redux/rtk/features/CRM/opportunitySource/opportunitySourceSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOpportunitySource from "./AddOpportunitySource";
import UpdateOpportunitySource from "./UpdateOpportunitySource";

export default function GetAllOpportunitySource() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.opportunitySource
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "opportunitySourceName",
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
      render: ({ id, opportunitySourceName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(
                  editOpportunitySource({
                    id,
                    values: { opportunitySourceName },
                  })
                )
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
              permission={"delete-opportunitySource"}
              deleteThunk={deleteOpportunitySource}
              loadThunk={loadAllOpportunitySource}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllOpportunitySource());
  }, [dispatch]);

  return (
    <UserPrivateComponent permission={"readAll-opportunitySource"}>
      <TableComponent
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        title={"Opportunity Source List"}
        isSearch={false}
        componentTitle={"Opportunity Sources"}
        extra={
          <CreateDrawer
            permission={"create-opportunitySource"}
            title={"Create Opportunity Source"}
            width={35}>
            <AddOpportunitySource />
          </CreateDrawer>
        }
      />
      <UpdateDrawer
        permission={"update-opportunitySource"}
        title={"Update Opportunity Source"}
        width={40}
        open={edit}
        setClose={clearOpportunitySourceEdit}>
        <UpdateOpportunitySource edit={edit} />
      </UpdateDrawer>
    </UserPrivateComponent>
  );
}
