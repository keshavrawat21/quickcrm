import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deleteProductCategory,
  loadAllProductCategory,
} from "@/redux/rtk/features/productCategory/productCategorySlice";
import Modal from "@/UI/Modal";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProductCategory from "./AddProductCategory";
import UpdateProductCategory from "./UpdateProductCategory";

export default function GetAllProductCategory() {
  const [edit, setEdit] = useState();
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector(
    (state) => state.productCategories
  );
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const columns = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      id: 3,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <div
              onClick={() => setEdit(item)}
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
              values={{
                id: item.id,
                status: item.status,
              }}
              title={item.status === "true" ? "Hide" : "UnHide"}
              permission={"delete-productCategory"}
              deleteThunk={deleteProductCategory}
              loadThunk={loadAllProductCategory}
              query={{
                page: 1,
                count: 10,
                status: "true",
              }}
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
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllProductCategory(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <UserPrivateComponent permission={"readAll-productCategory"}>
      <TableComponent
        list={list}
        total={total}
        columns={columns}
        loading={loading}
        title={"Product Category"}
        isSearch={true}
        filters={filters}
        setPageConfig={setPageConfig}
        componentTitle={"Product Category"}
        extra={
          <CreateDrawer
            permission={"create-productCategory"}
            title={"Create Product Category"}
            width={35}>
            <AddProductCategory />
          </CreateDrawer>
        }
      />

      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        title={"Edit Product Category"}>
        <UpdateProductCategory edit={edit} onClose={() => setEdit(false)} />
      </Modal>
    </UserPrivateComponent>
  );
}
