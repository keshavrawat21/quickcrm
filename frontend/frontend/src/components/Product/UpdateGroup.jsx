import { loadALLManufacturer } from "@/redux/rtk/features/manufacturer/manufacturerSlice";
import { loadAllProductBrand } from "@/redux/rtk/features/productBrand/productBrandSlice";
import { loadAllProductSubCategory } from "@/redux/rtk/features/productSubCategory/productSubCategorySlice";
import { loadAllUom } from "@/redux/rtk/features/uom/uomSlice";
import { loadAllVatTax } from "@/redux/rtk/features/vatTax/vatTaxSlice";
import { Form, Input, Select } from "antd";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import BigDrawer from "../Drawer/BigDrawer";
import AddManufacturer from "../Manufacturer/AddManufacturer";
import AddProductBrand from "../ProductBrand/AddProductBrand";
import AddProductCategory from "../ProductCategory/AddProductCategory";
import AddUoM from "../UoM/AddUoM";
import AddVatTax from "../VatTax/AddVatTax";
import { textEditorFormats, textEditorModule } from "./AddProduct";

export default function UpdateGroup({ description, descriptionHandler }) {
  const dispatch = useDispatch();
  const { list: subCategory, loading: subCategoryLoading } = useSelector(
    (state) => state.productSubCategories
  );
  const { list: brand, loading: brandLoading } = useSelector(
    (state) => state.productBrands
  );
  const { list: uomList, loading: uomLoading } = useSelector(
    (state) => state.uom
  );
  const { list: vatTaxList, loading: vatTaxLoading } = useSelector(
    (state) => state.vatTax
  );

  const { list: manufacturerList, loading: manufacturerLoading } = useSelector(
    (state) => state.manufacturer
  );

  useEffect(() => {
    dispatch(loadAllProductSubCategory({ page: 1, count: 100, status: true }));
    dispatch(loadAllProductBrand({ page: 1, count: 100, status: true }));
    dispatch(loadAllVatTax());
    dispatch(loadAllUom());
    dispatch(loadALLManufacturer());
  }, [dispatch]);

  return (
    <>
      <Form.Item
        style={{ marginBottom: "15px" }}
        label='Group Name'
        name='productGroupName'
        className='w-full'
      >
        <Input placeholder='Enter group name' />
      </Form.Item>
      <div className='flex flex-col sm:flex-row gap-3'>
        <Form.Item
          style={{ marginBottom: "15px" }}
          name='subCategoryId'
          label={
            <>
              Subcategory
              <BigDrawer title='new Sub-Category'>
                <AddProductCategory drawer={true} />
              </BigDrawer>
            </>
          }
          className='w-full sm:w-1/2'
        >
          <Select
            loading={subCategoryLoading}
            showSearch
            placeholder='Select Subcategory'
            optionFilterProp='children'
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {subCategory?.map((subcat) => (
              <Select.Option key={subcat?.id} value={subcat?.id}>
                {subcat?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "15px" }}
          className='flex-grow'
          name='productBrandId'
          label={
            <>
              Brand
              <BigDrawer title='new Brand'>
                <AddProductBrand drawer={true} />
              </BigDrawer>
            </>
          }
        >
          <Select
            name='productBrandId'
            loading={brandLoading}
            showSearch
            placeholder='Select Brand'
            optionFilterProp='children'
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {brand?.map((brandSingle) => (
              <Select.Option key={brandSingle.id} value={brandSingle.id}>
                {brandSingle.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className='flex flex-col sm:flex-row gap-3'>
        <Form.Item
          style={{ marginBottom: "15px" }}
          name='uomId'
          label={
            <>
              UoM
              <BigDrawer title={"UoM"}>
                <AddUoM />
              </BigDrawer>
            </>
          }
          className='w-full sm:w-1/2'
        >
          <Select
            name='uomId'
            loading={uomLoading}
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {uomList &&
              uomList.map((uom) => (
                <Select.Option key={uom.id} value={uom?.id}>
                  {uom?.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "15px" }}
          label='UoM Value'
          name='uomValue'
          className='w-full sm:w-1/2'
        >
          <Input type='number' />
        </Form.Item>
      </div>
      <div className='flex flex-col sm:flex-row gap-3'>
        <Form.Item
          style={{ marginBottom: "15px" }}
          label={
            <>
              Purchase VAT{" "}
              <BigDrawer title={"Vat/Tax"}>
                <AddVatTax />
              </BigDrawer>
            </>
          }
          name='productPurchaseTaxId'
          className='w-full sm:w-1/2'
        >
          <Select placeholder='Select Vat/Tax type' loading={vatTaxLoading}>
            {vatTaxList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.title}
                <span className='italic'>@{item.percentage}%</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "15px" }}
          label={
            <>
              Sales VAT{" "}
              <BigDrawer title={"VAT/TAX"}>
                <AddVatTax />
              </BigDrawer>
            </>
          }
          name='productSalesTaxId'
          className='w-full sm:w-1/2'
        >
          <Select placeholder='Select Vat/Tax type' loading={vatTaxLoading}>
            {vatTaxList?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.title}
                <span className='italic'>@{item.percentage}%</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form.Item
        style={{ marginBottom: "15px" }}
        label={
          <>
            Manufacture
            <BigDrawer title={"Manufacture"}>
              <AddManufacturer />
            </BigDrawer>
          </>
        }
        className='w-full sm:w-1/2'
        name='manufacturerId'
      >
        <Select
          allowClear
          placeholder='Select Manufacture'
          loading={manufacturerLoading}
        >
          {manufacturerList?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        style={{ marginBottom: "25px" }}
        label='Product Description '
        name='description'
      >
        <ReactQuill
          value={description}
          onChange={descriptionHandler}
          modules={textEditorModule}
          formats={textEditorFormats}
        />
      </Form.Item>
    </>
  );
}
