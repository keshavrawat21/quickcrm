import Button from "@/UI/Button";
import List from "@/UI/List";
import { loadAllProductAttribute } from "@/redux/rtk/features/eCommerce/productAttribute/productAttribute";
import {
  addProduct,
  loadSingleProduct,
} from "@/redux/rtk/features/product/productSlice";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import FormProductListCard from "./FormProductListCard";

export default function AddVariantToExistingGroup({ product }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const discount = useSelector((state) => state.discount?.list);
  const [attributeId, setAttributeId] = useState([]);
  const onFinish = async (values) => {
    setLoader(true);

    try {
      const data = {
        ...values,
        productGroupId: product?.productGroup.id,
      };
      const resp = await dispatch(addProduct(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        dispatch(loadSingleProduct(id));
      }
    } catch (error) {
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    dispatch(loadAllProductAttribute());
  }, [dispatch]);

  return (
    <>
      <Form
        form={form}
        name='basic'
        layout='vertical'
        className='sm:mx-4'
        initialValues={{
          productGroupName: product?.productGroup?.productGroupName,
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <div>
          <div className='my-4'>
            <h1 className='border-b pb-1 text-base font-medium text-gray-600'>
              Product Group Information
            </h1>
            <List
              labelClassName='w-[35%] md:w-[30%] 2xl:w-[25%]'
              list={[
                {
                  label: "Manufacturer",
                  value: (
                    <Link
                      to={`/admin/manufacturer/${product?.productGroup.manufacturer?.id}`}
                    >
                      {product?.productGroup.manufacturer?.name}
                    </Link>
                  ),
                },
                {
                  label: "Brand",
                  value: (
                    <Link
                      to={`/admin/product-brand/${product?.productGroup.productBrand?.id}`}
                    >
                      {product?.productGroup.productBrand?.name}
                    </Link>
                  ),
                },
                {
                  label: "Category",
                  value: (
                    <Link
                      to={`/admin/product-category/${product?.productGroup.subCategory?.productCategory?.id}`}
                    >
                      {product.productGroup.subCategory?.productCategory?.name}
                    </Link>
                  ),
                },
                {
                  label: "Sub-category",
                  value: (
                    <Link
                      to={`/admin/product-subcategory/${product?.productGroup.subCategory?.id}`}
                    >
                      {product?.productGroup.subCategory?.name}
                    </Link>
                  ),
                },
                {
                  label: "UoM",
                  value: (
                    <>
                      {product?.productGroup.uom &&
                        `${product?.productGroup.uomValue}${
                          product?.productGroup.uom?.name
                            ? `/${product.productGroup.uom.name}`
                            : ""
                        }`}
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <FormProductListCard
          setAttributeId={setAttributeId}
          form={form}
          discount={discount}
          productGroupName={product?.productGroup?.variantName}
        />
        <Form.Item
          style={{ marginBottom: "15px" }}
          className='flex justify-center mt-[24px]'
        >
          <Button color='primary' type='submit' loading={loader}>
            Add Variant
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
