import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import {
  clearSupplierList,
  deleteSupplier,
  loadSuppliers,
} from "../../redux/rtk/features/supplier/supplierSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddSupplier from "./AddSupplier";

const GetAllSup = () => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.suppliers);
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/supplier/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/supplier/${id}`}>{name}</Link>
      ),
      renderCsv: (name) => name,
    },
    {
      id: 3,
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      id: 4,
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["md"],
    },
    {
      id: 5,
      title: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/supplier/${id}`} />,
          key: "view",
        },
        {
          label: (
            <CommonDelete
              values={{
                id,
                status,
              }}
              title={status === "true" ? "Hide" : "Show"}
              permission={"delete-supplier"}
              deleteThunk={deleteSupplier}
              loadThunk={loadSuppliers}
              query={pageConfig}
              className="bg-white text-black"
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];
  const filters = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  useEffect(() => {
    dispatch(loadSuppliers(pageConfig));
    return () => {
      dispatch(clearSupplierList());
    };
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Supplier List"}
      extra={
        <CreateDrawer
          permission={"create-supplier"}
          title={"Create Supplier"}
          width={35}
        >
          <AddSupplier />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-supplier"}>
        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          setPageConfig={setPageConfig}
          title={"Supplier List"}
          filters={filters}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllSup;
