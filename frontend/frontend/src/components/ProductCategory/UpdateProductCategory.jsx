import Button from "@/UI/Button";
import {
  addContactSource,
  loadAllContactSource,
  updateContactSource,
} from "@/redux/rtk/features/CRM/contactSource/contactSourceSlice";
import {
  addProductCategory,
  loadAllProductCategory,
  loadSingleProductCategory,
  updateProductCategory,
} from "@/redux/rtk/features/productCategory/productCategorySlice";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function UpdateProductCategory({ edit, onClose }) {
  // const { id } = edit;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.productCategories);

  const onFinish = async (values) => {
    const resp = await dispatch(
      edit?.id
        ? updateProductCategory({ id: edit?.id, values })
        : addProductCategory(values)
    );
    if (resp.payload.message === "success") {
      dispatch(
        loadAllProductCategory({
          page: 1,
          count: 10,
          status: "true",
        })
      );
      onClose();
      if (!edit?.id) {
        form.resetFields();
      }
    }
  };

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        ...category,
      });
    }
  }, [category, edit, form]);

  useEffect(() => {
    dispatch(loadSingleProductCategory(edit?.id));
  }, [dispatch, edit?.id]);

  return (
    <UserPrivateComponent permission={"update-productCategory"} type="update">
    <div className="flex justify-center mt-5">
      <Form
        className="w-4/5"
        onFinish={onFinish}
        colon={false}
        layout="vertical"
        form={form}>
        <Form.Item
          label="Product Category Name"
          name="name"
          rules={[
            { required: true, message: "Product Category Name is Required." },
          ]}>
          <Input placeholder="Product category name" />
        </Form.Item>

        <Form.Item label="">
          <div className="flex items-center justify-center gap-2">
            <Button
              type="submit"
              className="w-auto min-w-[200px]"
              color="primary">
              {edit?.id ? "Update" : "Create"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
    </UserPrivateComponent>
  );
}
