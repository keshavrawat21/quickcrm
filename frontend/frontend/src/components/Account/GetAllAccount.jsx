import Modal from "@/UI/Modal";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAccountList,
  deleteAccount,
  loadAllAccountPaginated,
} from "../../redux/rtk/features/account/accountSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddAccount from "./AddAccount";
import UpdateAccount from "./UpdateAccount";

const GetAllAccount = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState();
  const { list, total, loading } = useSelector((state) => state.accounts) || {};
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/account/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },

    {
      id: 2,
      title: "Account",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => <Link to={`/admin/account/${id}`}>{name}</Link>,
      renderCsv: (name) => name,
    },

    {
      id: 3,
      title: "Account Type ",
      dataIndex: "account",
      key: "account",
      render: (account) => account?.name,
      renderCsv: (account) => account?.name,
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/account/${item?.id}`} />,
          key: "view",
        },
        {
          label: (
            <span className="cursor-pointer" onClick={() => setEdit(item)}>
              <button className="flex justify-center items-center gap-2 rounded">
                <CiEdit /> Edit
              </button>
            </span>
          ),
          key: "edit",
        },
        item?.id > 16 && {
          label: (
            <CommonDelete
              id={item?.id}
              title={"Delete"}
              permission={"delete-account"}
              deleteThunk={deleteAccount}
              loadThunk={loadAllAccountPaginated}
              query={pageConfig}
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllAccountPaginated(pageConfig));

    return () => {
      dispatch(clearAccountList());
    };
  }, [dispatch, pageConfig]);

  return (
    <UserPrivateComponent permission={"readAll-account"}>
      <TableComponent
        list={list}
        columns={columns}
        title={"Account List"}
        total={total}
        loading={loading}
        setPageConfig={setPageConfig}
        isSearch
        componentTitle={"Accounts"}
        extra={
          <CreateDrawer
            permission={"create-account"}
            title={"Create Account"}
            width={35}>
            <AddAccount />
          </CreateDrawer>
        }
      />
      <Modal open={edit} onClose={() => setEdit(false)} title={"Edit Account"}>
        <UpdateAccount account={edit} id={edit?.id} />
      </Modal>
    </UserPrivateComponent>
  );
};

export default GetAllAccount;
