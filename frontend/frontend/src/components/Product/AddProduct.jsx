/* eslint-disable no-unreachable */
/* eslint-disable react-refresh/only-export-components */
import { Button, Form, Input, InputNumber, Select } from "antd";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  loadProduct,
} from "../../redux/rtk/features/product/productSlice";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { loadAllProductCategory } from "@/redux/rtk/features/productCategory/productCategorySlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddProductCategory from "../ProductCategory/AddProductCategory";

// Quill formats to specify allowed styles
export const textEditorModule = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

export const textEditorFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "background",
];

const AddProduct = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loader, setLoader] = useState(false);
  const [prodDescription, setProdDescription] = useState("");

  const { list: productCategory, loading: productCategoryLoading } =
    useSelector((state) => state.productCategories);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const onFinish = async (values) => {
    setLoader(true);

    try {
      const resp = await dispatch(addProduct(values));

      if (resp.payload.message === "success") {
        form.resetFields();
        setProdDescription("");
        dispatch(loadProduct({ status: "true", page: 1, count: 10 }));
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    dispatch(loadAllProductCategory(pageConfig));
  }, [dispatch, pageConfig]);
  return (
    <>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        className="sm:mx-4"
        onFinish={onFinish}
        autoComplete="off">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            style={{ marginBottom: "15px" }}
            label="Product Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Product name!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item style={{ marginBottom: "15px" }} label="Rate" name="rate">
            <InputNumber size="small" />
          </Form.Item>

          <Form.Item style={{ marginBottom: "15px" }} label="Unit" name="unit">
            <InputNumber size="small" />
          </Form.Item>

          <Form.Item
            label={
              <>
                Category
                <BigDrawer title={"Category"}>
                  <AddProductCategory drawer={true} />
                </BigDrawer>
              </>
            }
            name={"productCategoryId"}>
            <Select
              style={{ width: "100%" }}
              loading={productCategoryLoading}
              allowClear
              showSearch
              placeholder="Select Product Category">
              {productCategory?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          style={{ marginBottom: "15px" }}
          label="Description"
          name="description">
          <TextArea />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "15px" }}
          className="flex justify-center mt-[24px]">
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            loading={loader}>
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;
