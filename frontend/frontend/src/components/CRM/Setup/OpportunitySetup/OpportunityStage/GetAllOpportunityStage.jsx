import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearOpportunityStageEdit,
  deleteOpportunityStage,
  editOpportunityStage,
  loadAllOpportunityStage,
} from "@/redux/rtk/features/CRM/opportunityStage/opportunityStageSlice";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOpportunityStage from "./AddOpportunityStage";
import UpdateOpportunityStage from "./UpdateOpportunityStage";

export default function GetAllOpportunityStage() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector(
    (state) => state.opportunityStage
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "opportunityStageName",
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
      render: ({ id, opportunityStageName }) => [
        {
          label: (
            <div
              onClick={() =>
                dispatch(
                  editOpportunityStage({ id, values: { opportunityStageName } })
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
              permission={"delete-opportunityStage"}
              deleteThunk={deleteOpportunityStage}
              loadThunk={loadAllOpportunityStage}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllOpportunityStage());
  }, [dispatch]);

  return (
    <UserPrivateComponent permission={"readAll-opportunityStage"}>
      <TableComponent
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        title={"Opportunity Stage List"}
        isSearch={false}
        componentTitle={"Opportunity Stages"}
        extra={
          <CreateDrawer
            permission={"create-opportunityStage"}
            title={"Create Opportunity Stage"}
            width={35}>
            <AddOpportunityStage />
          </CreateDrawer>
        }
      />
      <UpdateDrawer
        permission={"update-opportunityStage"}
        title={"Update Opportunity Stage"}
        width={40}
        open={edit}
        setClose={clearOpportunityStageEdit}>
        <UpdateOpportunityStage edit={edit} />
      </UpdateDrawer>
    </UserPrivateComponent>
  );
}
