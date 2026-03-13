import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadProduct,
  loadSingleProduct,
  updateProduct,
} from "../../redux/rtk/features/product/productSlice";

import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import { loadAllProductCategory } from "@/redux/rtk/features/productCategory/productCategorySlice";
import TextArea from "antd/es/input/TextArea";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

const UpdateProduct = ({ data, onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = data;

  const { product } = useSelector((state) => state.products);
  const { list: productCategory, loading: productCategoryLoading } =
    useSelector((state) => state.productCategories);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    setLoader(true);
    try {
      const resp = await dispatch(updateProduct({ values: values, id }));
      if (resp.payload.message === "success") {
        setLoader(false);
        dispatch(loadProduct(pageConfig));
        onClose();
      }
    } catch (error) {
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  //useEffect for loading category list from redux
  useEffect(() => {
    dispatch(loadSingleProduct(id));
    dispatch(loadAllProductCategory(pageConfig));
  }, [dispatch, id, pageConfig]);

  return (
    <>
      <UserPrivateComponent permission={"update-product"} type={"update"}>
        {product ? (
          <Form
            form={form}
            name="basic"
            className="mx-4"
            initialValues={{
              ...product,
            }}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="grid grid-cols-2 gap-3">
              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Name"
                name="name"
                required
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Rate"
                name="rate"
              >
                <InputNumber size="small" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Unit"
                name="unit"
              >
                <InputNumber size="small" />
              </Form.Item>

              <Form.Item label="Category" name={"productCategoryId"}>
                <Select
                  style={{ width: "100%" }}
                  loading={productCategoryLoading}
                  allowClear
                  showSearch
                  placeholder="Select Product Category"
                >
                  {productCategory?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Description"
                name="description"
              >
                <TextArea />
              </Form.Item>
            </div>

            <Form.Item
              style={{ marginBottom: "15px" }}
              className="flex justify-center mt-[24px]"
            >
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                loading={loader}
              >
                Update Product
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Loader />
        )}
      </UserPrivateComponent>
    </>
  );
};

export default UpdateProduct;
