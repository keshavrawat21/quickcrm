import {
  deleteProduct,
  loadProduct,
} from "@/redux/rtk/features/product/productSlice";
import Modal from "@/UI/Modal";
import { cn, stringShorter } from "@/utils/functions";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddProduct from "./AddProduct";
import ProductCard from "./ProductCard";
import UpdateProduct from "./UpdateProduct";

const GetAllProduct = () => {
  const dispatch = useDispatch();
  const [all, setAll] = useState(false);
  const [edit, setEdit] = useState();
  const { list, loading, total, card } = useSelector((state) => state.products);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "50px",
    },

    {
      id: 4,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) =>
        // <Link title={name} to={`/admin/product/${id}`}>
        //   {stringShorter(name, 45)}
        // </Link>
        stringShorter(name, 45),
      width: "150px",
      renderCsv: (name) => name,
      tdClass: "whitespace-normal",
    },
    {
      title: "Rate",
      key: "rate",
      dataIndex: "rate",
    },
    {
      title: "Unit",
      key: "unit",
      dataIndex: "unit",
    },

    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      render: (category) => (category?.name ? category?.name : ""),
      renderCsv: (category) => (category?.name ? category?.name : ""),
    },

    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      id: 12,
      title: "",
      key: "action",
      render: (item) => [
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
        {
          label: (
            <CommonDelete
              values={{
                id: item?.id,
                status: item?.status,
              }}
              title={item?.status === "true" ? "Hide" : "Show"}
              deleteThunk={deleteProduct}
              loadThunk={loadProduct}
              query={pageConfig}
              permission={"delete-product"}
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  if (all) {
    columns.splice(7, 5);
  }

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const handleAll = () => {
    if (!all) {
      setPageConfig({
        page: 1,
        count: 10,
        status: "true",
        product: "all",
      });
    } else {
      setPageConfig({
        page: 1,
        count: 10,
        status: "true",
      });
    }
    setAll(!all);
  };
  const extraFilter = (
    <div
      onClick={handleAll}
      className={cn(
        "h-8 bg-[#D7D7D7] px-2 text-center rounded-[5px] flex items-center cursor-pointer",
        { "bg-[#1890ff] text-white": all }
      )}>
      All
    </div>
  );

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

  useEffect(() => {
    dispatch(loadProduct(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <UserPrivateComponent permission={"readAll-product"}>
        {card && <ProductCard card={card} />}

        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          extraFilter={extraFilter}
          setPageConfig={setPageConfig}
          title="Product List"
          isSearch
          nestedRowKey="stockInfo"
          filters={filters}
          componentTitle={"Products"}
          extra={
            <CreateDrawer
              permission={"create-product"}
              title={"Create Product"}
              width={35}>
              <AddProduct />
            </CreateDrawer>
          }
        />

        <Modal
          open={edit}
          onClose={() => setEdit(false)}
          className="md:w-[70%] px-5 "
          title={"Edit Product"}>
          <UpdateProduct data={edit} onClose={() => setEdit(false)} />
        </Modal>
      </UserPrivateComponent>
    </>
  );
};

export default GetAllProduct;
