import Card from "@/UI/Card";
import List from "@/UI/List";
import Menu from "@/UI/Menu";
import Table from "@/UI/Table";
import { stringShorter } from "@/utils/functions";
import { EditOutlined } from "@ant-design/icons";
import { Image, Popover, Tooltip } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { BsQuestionCircle, BsThreeDotsVertical } from "react-icons/bs";
import { CiBarcode } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearProduct,
  deleteProduct,
  loadSingleProduct,
} from "../../redux/rtk/features/product/productSlice";
import useCurrency from "../../utils/useCurrency";
import ViewBtn from "../Buttons/ViewBtn";
import CommonDelete from "../CommonUi/CommonDelete";
import BigDrawer from "../Drawer/BigDrawer";
import Loader from "../Loader/Loader";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddGalleryImage from "./AddGalleryImage";
import AddVariantToExistingGroup from "./AddVariantToExisitngGroup";
import GenerateBarcode from "./BarcodeGenerator";
import GalleryImageSlider from "./GalleryImageSlider";

const DetailsProduct = () => {
  const { id } = useParams();
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "50px",
      render: (id) => <Link to={`/admin/product/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "productThumbnailImage",
      render: (productThumbnailImage) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={
              `${
                import.meta.env.VITE_APP_API
              }/media/view/${productThumbnailImage}` || "/images/default.jpg"
            }
          />
        </div>
      ),
      key: "image",
      width: "70px",
      csvOff: true,
    },
    {
      id: 4,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link title={name} to={`/admin/product/${id}`}>
          {stringShorter(name, 45)}
        </Link>
      ),
      width: "150px",
      renderCsv: (name) => name,
      tdClass: "whitespace-normal",
    },
    {
      id: 3,
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },

    {
      id: 7,
      title: "Purchase price",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo[0]?.productPurchasePrice,
      renderCsv: (stockInfo) => stockInfo[0]?.productPurchasePrice,
      key: "productPurchasePrice",
      responsive: ["md"],
    },
    {
      id: 8,
      title: "Sale price",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo[0]?.productSalePrice,
      renderCsv: (stockInfo) => stockInfo[0]?.productSalePrice,
      key: "productSalePrice",
      responsive: ["md"],
    },
    {
      id: 9,
      title: "Attributes",
      dataIndex: "productProductAttributeValue",
      key: "productProductAttributeValue",
      render: (productProductAttributeValue) =>
        productProductAttributeValue?.map((item, index) => (
          <span key={index}>
            {item.productAttributeValue.productAttribute.name}:{" "}
            {item.productAttributeValue.name}
            {index !== productProductAttributeValue.length - 1 ? ", " : ""}
          </span>
        )),
    },
    {
      id: 6,
      title: "Quantity",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo[0]?.productQuantity,
      renderCsv: (stockInfo) => stockInfo[0]?.productQuantity,
      key: "productQuantity",
    },
    {
      id: 12,
      title: "Reorder QTY",
      dataIndex: "stockInfo",
      render: (stockInfo) => stockInfo[0]?.reorderQuantity,
      renderCsv: (stockInfo) => stockInfo[0]?.reorderQuantity,
      key: "reorderQuantity",
    },
    {
      id: 13,
      title: "",
      key: "action",
      render: ({ id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/product/${id}`} />,
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  const columnsOtherStock = [
    {
      id: 1,
      title: "Purchase price",
      dataIndex: "productPurchasePrice",
      key: "productPurchasePrice",
    },
    {
      id: 1,
      title: "Sale price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
    },
    {
      id: 1,
      title: "Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      id: 1,
      title: "Reorder quantity",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",
    },
    {
      id: 1,
      title: "Negative Sell Allowed",
      dataIndex: "isNegativeSale",
      key: "isNegativeSale",
      render: (isNegativeSale) => (isNegativeSale === "true" ? "Yes" : "No"),
    },
  ];
  const dispatch = useDispatch();
  const { product, error } = useSelector((state) => state.products);
  const currency = useCurrency();

  useEffect(() => {
    dispatch(loadSingleProduct(id));
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);
  const handleOnError = (e) => {
    e.target.src = "/images/default.jpg";
  };

  return (
    <>
      {product ? (
        <Card
          className="bg-white"
          title={
            <>
              <div>{product?.name}</div>
              {product?.status === "true" ? (
                <span className="px-2 py-[2px] font-normal text-sm bg-green-500 text-white rounded-full">
                  Active
                </span>
              ) : (
                <span className="px-2 py-[2px] font-normal text-sm bg-gray-500 text-white rounded-full">
                  Inactive
                </span>
              )}
            </>
          }
          extra={
            <Popover
              className="mr-1"
              content={
                <Menu
                  items={[
                    {
                      label: (
                        <UserPrivateComponent permission={"update-product"}>
                          <Link
                            to={`/admin/product/${product?.id}/update`}
                            className="flex items-center gap-2 cursor-pointer">
                            <EditOutlined className=" rounded-md" />
                            Edit
                          </Link>
                        </UserPrivateComponent>
                      ),
                      key: "edit",
                    },
                    {
                      label: (
                        <CommonDelete
                          values={{
                            id,
                            status: product?.status,
                          }}
                          title={product.status === "true" ? "Hide" : "Show"}
                          permission={"delete-product"}
                          deleteThunk={deleteProduct}
                          loadThunk={loadSingleProduct}
                          query={id}
                          className="bg-white text-black"
                        />
                      ),
                      key: "delete",
                    },
                    {
                      label: (
                        <Link
                          to={`/admin/print-barcode/${id}`}
                          className="flex items-center gap-2 rounded">
                          <CiBarcode className="text-[1rem]" />
                          Barcode print
                        </Link>
                      ),
                      key: "barcode",
                    },
                  ]}
                />
              }
              placement="bottomRight"
              arrow={false}
              trigger="click">
              <BsThreeDotsVertical className="cursor-pointer text-base" />
            </Popover>
          }>
          <div className="my-4 xl:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <div>
                  <h1 className="border-b pb-1 text-base font-medium text-gray-600">
                    Specifications
                  </h1>
                  <List
                    labelClassName="w-[35%] md:w-[30%] 2xl:w-[25%]"
                    list={
                      [
                        // {
                        //   label: "Manufacturer",
                        //   value: (
                        //     <Link
                        //       to={`/admin/manufacturer/${product?.productGroup.manufacturer?.id}`}>
                        //       {product?.productGroup.manufacturer?.name}
                        //     </Link>
                        //   ),
                        // },
                        // {
                        //   label: "Brand",
                        //   value: (
                        //     <Link
                        //       to={`/admin/product-brand/${product?.productGroup.productBrand?.id}`}>
                        //       {product?.productGroup.productBrand?.name}
                        //     </Link>
                        //   ),
                        // },
                        // {
                        //   label: "Category",
                        //   value: (
                        //     <Link
                        //       to={`/admin/product-category/${product?.productGroup.subCategory?.productCategory?.id}`}>
                        //       {
                        //         product.productGroup.subCategory?.productCategory
                        //           ?.name
                        //       }
                        //     </Link>
                        //   ),
                        // },
                        // {
                        //   label: "Sub-category",
                        //   value: (
                        //     <Link
                        //       to={`/admin/product-subcategory/${product?.productGroup.subCategory?.id}`}>
                        //       {product?.productGroup.subCategory?.name}
                        //     </Link>
                        //   ),
                        // },
                        // {
                        //   label: "UoM",
                        //   value: (
                        //     <>
                        //       {product?.productGroup.uom &&
                        //         `${product?.productGroup.uomValue}${
                        //           product?.productGroup.uom?.name
                        //             ? `/${product.productGroup.uom.name}`
                        //             : ""
                        //         }`}
                        //     </>
                        //   ),
                        // },
                        // {
                        //   label: "Attributes",
                        //   value: (
                        //     <List
                        //       labelClassName="w-auto"
                        //       list={product?.productProductAttributeValue?.map(
                        //         (item) => ({
                        //           label:
                        //             item.productAttributeValue.productAttribute
                        //               .name + ":",
                        //           value: item.productAttributeValue.name,
                        //         })
                        //       )}
                        //     />
                        //   ),
                        // },
                        // product.length && {
                        //   label: "Length",
                        //   value: product.length,
                        // },
                        // product.width && {
                        //   label: "Width",
                        //   value: product.width,
                        // },
                        // product.height && {
                        //   label: "Height",
                        //   value: product.height,
                        // },
                        // product.weight && {
                        //   label: "Weight",
                        //   value: product.weight,
                        // },
                      ]
                    }
                  />
                </div>

                <div className="w-full">
                  <h1 className="border-b pb-1 text-base font-medium text-gray-600">
                    Product Pricing
                  </h1>
                  <List
                    labelClassName={"w-[35%] md:w-[30%] 2xl:w-[25%]"}
                    list={[
                      {
                        label: "Sale Price",
                        value: (
                          <span className="">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: currency?.currencySymbol,
                              }}
                            />
                            {product?.stockInfo[0]?.productSalePrice}
                          </span>
                        ),
                      },
                      {
                        label: "Purchase Price",
                        value: (
                          <span className="">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: currency?.currencySymbol,
                              }}
                            />
                            {product?.stockInfo[0]?.productPurchasePrice}
                          </span>
                        ),
                      },
                      {
                        label: "Purchase TAX",
                        value: `${
                          product?.productGroup.productPurchaseTax?.percentage
                            ? product?.productGroup.productPurchaseTax
                                ?.percentage
                            : 0
                        }%`,
                      },
                      {
                        label: "Sale TAX",
                        value: `${
                          product?.productGroup.productSalesTax?.percentage
                            ? product?.productGroup.productSalesTax?.percentage
                            : 0
                        }%`,
                      },
                      {
                        label: "Discount",
                        value: product?.discount?.value
                          ? `${product?.discount.value}${
                              product?.discount.type == "percentage"
                                ? "%"
                                : " flat"
                            }`
                          : "0%",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex flex-col items-center">
                  <GenerateBarcode sku={product?.sku} />
                  <Image
                    className="fluid  max-w-[300px] aspect-square"
                    src={
                      import.meta.env.VITE_APP_API +
                        "/media/view/" +
                        product.productThumbnailImage || "/images/default.jpg"
                    }
                    onError={handleOnError}
                  />
                  <span className="mt-4"></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 py-4">
              <div className="w-full md:w-1/2">
                <h1 className="border-b pb-1 text-base font-medium text-gray-600">
                  Item Details
                </h1>
                <List
                  labelClassName={"w-[35%] md:w-[30%] 2xl:w-[25%]"}
                  list={[
                    {
                      label: (
                        <span className="flex items-center gap-1">
                          SKU
                          <Tooltip
                            placement="topLeft"
                            title="The stock keeping unit of the item">
                            <BsQuestionCircle />
                          </Tooltip>
                        </span>
                      ),
                      value: product?.sku,
                    },
                    product?.eanNo && {
                      label: (
                        <span className="flex items-center gap-1">
                          EAN
                          <Tooltip
                            placement="topLeft"
                            title="Thirteen digit unique number (International Article Number)">
                            <BsQuestionCircle />
                          </Tooltip>
                        </span>
                      ),
                      value: product.eanNo,
                    },
                    product?.upcNo && {
                      label: (
                        <span className="flex items-center gap-1">
                          UPC
                          <Tooltip
                            placement="topLeft"
                            title="Twelve digit unique code (Universal Product Code)">
                            <BsQuestionCircle />
                          </Tooltip>
                        </span>
                      ),
                      value: product.upcNo,
                    },
                    product?.isbnNo && {
                      label: (
                        <span className="flex items-center gap-1">
                          ISBN
                          <Tooltip
                            placement="topLeft"
                            title="Thirteen digit unique commercial book identifier (International Standard Book Number) ">
                            <BsQuestionCircle />
                          </Tooltip>
                        </span>
                      ),
                      value: product.isbnNo,
                    },
                    product?.partNo && {
                      label: "Part No",
                      value: product.partNo,
                    },
                    {
                      label: "Create Date",
                      value: moment(product?.createdAt).format("ll"),
                    },
                  ]}
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="w-full">
                  <h1 className="border-b pb-1 text-base font-medium text-gray-600">
                    Stock Details
                  </h1>
                  <List
                    labelClassName={"w-[35%] md:w-[30%] 2xl:w-[25%]"}
                    list={[
                      {
                        label: "Quantity",
                        value: product?.stockInfo[0]?.productQuantity,
                      },
                      {
                        label: "Reorder Quantity",
                        value: product?.stockInfo[0]?.reorderQuantity,
                      },
                      {
                        label: "Negative Sell Allowed",
                        value:
                          product.stockInfo[0]?.isNegativeSale === "true"
                            ? "Yes"
                            : "No",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="w-full text-base font-medium my-3">
              <h1 className="flex gap-1 items-center font-medium border-b text-slate-600 py-2 mb-2">
                Gallery Images{" "}
                <AddGalleryImage
                  product={{
                    id: product.id,
                    data: product.productGroup?.galleryImage,
                  }}
                />
              </h1>
              <GalleryImageSlider data={product.productGroup.galleryImage} />
            </div>
            <div>
              {/* other variants */}
              <h1 className="flex gap-1 items-center font-medium border-b text-slate-600 py-2">
                Others Variant
                <BigDrawer title="Variant" width={85}>
                  <AddVariantToExistingGroup product={product} />
                </BigDrawer>
              </h1>
              <div className="mt-2">
                <Table
                  columns={columns}
                  data={product.productGroup.products?.filter(
                    (item) => item.id !== product.id
                  )}
                />
              </div>
            </div>
            <div className="">
              <h1 className="font-medium border-b text-slate-600 py-2">
                Product description
              </h1>
              <p
                className="py-2"
                dangerouslySetInnerHTML={{
                  __html: product?.productGroup.description,
                }}></p>
            </div>
          </div>
        </Card>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DetailsProduct;
