import ViewBtn from "@/components/Buttons/ViewBtn";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deleteOpportunity,
  loadAllOpportunity,
  loadAllOpportunityPaginated,
} from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import Modal from "@/UI/Modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddOpportunity from "./AddOpportunity";
import UpdateOpportunity from "./UpdateOpportunity";
import useOpportunityFilter from "./useOpportunityFilter";

export default function GetAllOpportunity() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState();
  const { list, loading, total, edit } = useSelector(
    (state) => state.opportunity
  );
  const filters = useOpportunityFilter();
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "Name",
      key: "Opportunity Name",
      render: ({ opportunityName, id }) => (
        <Link to={`/admin/opportunity/${id}`}>{opportunityName}</Link>
      ),
      renderCsv: ({ opportunityName }) => opportunityName,
    },
    {
      title: "Owner",
      dataIndex: "opportunityOwner",
      key: "owner",
      render: (opportunityOwner, item) => (
        <Link to={`/admin/staff/${item?.opportunityOwnerId}`}>
          {opportunityOwner.firstName} {opportunityOwner.lastName}
        </Link>
      ),
      renderCsv: (opportunityOwner) =>
        `${opportunityOwner.firstName} ${opportunityOwner.lastName}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      amount: "amount",
    },

    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (company, item) => (
        <Link to={`/admin/company/${item?.companyId}`}>
          {company?.companyName}
        </Link>
      ),
      renderCsv: (company) => company?.companyName,
    },

    {
      title: "Stage",
      key: "Stage",
      dataIndex: "opportunityStage",
      render: (field) => field?.opportunityStageName,
      renderCsv: (field) => field?.opportunityStageName,
    },

    {
      title: "Type",
      dataIndex: "opportunityType",
      key: "opportunityType",
      render: (opportunityType) => opportunityType?.opportunityTypeName,
      renderCsv: (opportunityType) => opportunityType?.opportunityTypeName,
    },
    {
      title: "Source",
      dataIndex: "opportunitySource",
      key: "opportunitySource",
      render: (opportunitySource) => opportunitySource?.opportunitySourceName,
      renderCsv: (opportunitySource) =>
        opportunitySource?.opportunitySourceName,
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
    {
      id: 12,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/opportunity/${item?.id}`} />
          ),
          key: "view",
        },
        {
          label: (
            <span className="cursor-pointer" onClick={() => setModal(item)}>
              <button className="flex justify-center items-center gap-2 rounded">
                <CiEdit /> Edit
              </button>
            </span>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              values={{ id: item?.id, status: item?.status }}
              title={item?.status === "true" ? "Hide" : "Show"}
              deleteThunk={deleteOpportunity}
              loadThunk={loadAllOpportunity}
              query={pageConfig}
              permission={"delete-opportunity"}
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllOpportunityPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <UserPrivateComponent permission={"readAll-opportunity"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"Opportunity List"}
          isSearch
          filters={filters}
          componentTitle={"Opportunity"}
          extra={
            <CreateDrawer
              permission={"create-opportunity"}
              title={"Create Opportunity"}
              width={70}>
              <AddOpportunity />
            </CreateDrawer>
          }
        />
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          className="md:w-[70%] px-5 "
          title={"Edit Opportunity"}>
          <UpdateOpportunity data={modal} />
        </Modal>
      </UserPrivateComponent>
    </>
  );
}
