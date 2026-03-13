import { Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useSelector } from "react-redux";
import Card from "../../UI/Card";
import BigDrawer from "../Drawer/BigDrawer";
import AddDiscount from "../eComErp/Discount/AddDiscount";
import AttributeValueDropdown from "./AttributeValueDropdown";
import AttributesDropdown from "./AttributesDropDown";
import SkuField from "./SkuField";

export default function FormProductList({
  discount,
  setAttributeId,
  form,
  productGroupName,
}) {
  const attribute = useSelector((state) => state.productAttribute?.list);
  const attributeValueCalculated = getAttributeValue(attribute);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValue, setAttributeValue] = useState({});

  const makeAttributeIdArray = (val) => {
    const arrays = Object.values(val);
    const combinedArray = arrays.reduce((acc, curr) => [...acc, ...curr], []);
    setAttributeId(combinedArray);
  };

  const attributesHandler = (selectedAttributesFromDropDown) => {
    const selectedAttributeDetails = selectedAttributesFromDropDown.map(
      (selectedAttributeSingle) => {
        const foundAttributeDetails = attribute.find(
          (item) => item.name === selectedAttributeSingle
        );

        return foundAttributeDetails;
      }
    );
    setSelectedAttributes(selectedAttributeDetails);
  };
  const attributeValueHandler = (name, val) => {
    const attributeObjKey = Object.keys(attributeValue);
    const foundAttributeObjKey = attributeObjKey.find((item) => item === name);
    if (foundAttributeObjKey) {
      const newAttributeObj = {
        ...attributeValue,
        [foundAttributeObjKey]: val,
      };
      const modifiedAttributeObj = filterAttributeValues(
        attributeValueCalculated,
        newAttributeObj
      );

      const variants = generateVariants(modifiedAttributeObj);
      const variantNames = generateVariantName(
        variants,
        form,
        productGroupName
      );

      form.setFieldsValue({ productGroup: variantNames });
      setAttributeValue(newAttributeObj);
      makeAttributeIdArray(newAttributeObj);
    } else {
      const newAttributeObj = { ...attributeValue, [name]: val };
      const modifiedAttributeObj = filterAttributeValues(
        attributeValueCalculated,
        newAttributeObj
      );
      const variants = generateVariants(modifiedAttributeObj);
      const variantNames = generateVariantName(
        variants,
        form,
        productGroupName
      );
      form.setFieldsValue({ productGroup: variantNames });
      setAttributeValue(newAttributeObj);
      makeAttributeIdArray(newAttributeObj);
    }
  };

  return (
    <>
      {attribute?.length && (
        <Form.Item style={{ marginBottom: "15px" }} label='Attributes'>
          <AttributesDropdown
            data={attribute}
            attributes={selectedAttributes}
            attributesHandler={attributesHandler}
          />
        </Form.Item>
      )}
      <div className='border-l border-blue-300'>
        {selectedAttributes?.map((item) => (
          <Form.Item
            key={item.id}
            style={{ marginBottom: "15px", marginLeft: "20px" }}
            label={item.name}
            name={item.name.toLowerCase()}
          >
            <AttributeValueDropdown
              name={item.name}
              data={item.productAttributeValue}
              attributeValueHandler={attributeValueHandler}
              attributeValue={attributeValue}
            />
          </Form.Item>
        ))}
      </div>
      <Card className='' headClass='' bodyClass='p-0'>
        <Form.List
          name='productGroup'
          initialValue={[{}]}
          rules={[
            {
              required: true,
              message: "Product is required",
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              <div className='overflow-auto'>
                <table className='w-full'>
                  <thead
                    className={
                      "font-Popins text-black bg-tableHeaderBg border-gray-200 sticky top-0 z-10"
                    }
                  >
                    <tr>
                      <th className='py-2 pl-2 text-left'>Item name</th>
                      <th className='py-2 pl-2 text-left'>
                        SKU <br />
                        <span
                          onClick={() => skuGenerator(form)}
                          className='text-xs text-blue-500 cursor-pointer'
                        >
                          Generate Sku
                        </span>
                      </th>
                      <th className='py-2 pl-2 text-left'>
                        Selling price <br />
                        <span
                          onClick={() => copyToAllCol("productSalePrice", form)}
                          className='text-xs text-blue-500 cursor-pointer'
                        >
                          Copy to All
                        </span>
                      </th>
                      <th className='py-2 pl-2 text-left'>UPC</th>
                      <th className='py-2 pl-2 text-left'>EAN</th>
                      <th className='py-2 pl-2 text-left'>ISBN</th>
                      <th className='py-2 pl-2 text-left'>
                        <span className='flex'>
                          Discount{" "}
                          <BigDrawer title={"Discount"}>
                            <AddDiscount />
                          </BigDrawer>
                        </span>
                        <span
                          onClick={() => copyToAllCol("productDiscount", form)}
                          className='text-xs text-blue-500 cursor-pointer'
                        >
                          Copy to All
                        </span>
                      </th>
                      <th className='py-2 pl-2 text-left'>
                        Qty <br />
                        <span
                          onClick={() => copyToAllCol("productQuantity", form)}
                          className='text-xs text-blue-500 cursor-pointer'
                        >
                          Copy to All
                        </span>
                      </th>
                      <th className='py-2 pl-2 text-left'>
                        Reorder Qty <br />
                        <span
                          onClick={() => copyToAllCol("reorderQuantity", form)}
                          className='text-xs text-blue-500 cursor-pointer'
                        >
                          Copy to All
                        </span>
                      </th>
                      <th className='py-2 pl-2 text-left'></th>
                    </tr>
                  </thead>
                  <tbody className='bg-tableBg'>
                    {fields.map(({ key, name, ...restField }, index) => {
                      return (
                        <tr
                          key={key}
                          className={`hover:bg-slate-900/10 py-1 ${
                            index === fields.length - 1 ? "" : "border-b"
                          }`}
                        >
                          <td className='py-2 pl-2 align-top'>
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              className='mb-0 max-w-[200px]'
                              rules={[
                                {
                                  required: true,
                                  message: "Product name is required",
                                },
                              ]}
                            >
                              <Input size='small' />
                            </Form.Item>
                          </td>
                          <td className='py-2 pl-2 align-top'>
                            <SkuField
                              restField={restField}
                              name={name}
                              key={index}
                              form={form}
                              index={index}
                            />
                          </td>
                          <td className='py-2 pl-2 align-top'>
                            <Form.Item
                              {...restField}
                              name={[name, "productSalePrice"]}
                              className='mb-0 max-w-[150px]'
                            >
                              <InputNumber
                                type='number'
                                size='small'
                                style={{ width: "100%" }}
                                placeholder='50000'
                              />
                            </Form.Item>
                          </td>
                          <td className='py-2 pl-2 align-top'>
                            <Form.Item
                              {...restField}
                              name={[name, "upcNo"]}
                              className='mb-0 max-w-[150px]'
                            >
                              <Input size='small' style={{ width: "100%" }} />
                            </Form.Item>
                          </td>
                          <td className='py-2 pl-2 align-top'>
                            <Form.Item
                              {...restField}
                              name={[name, "eanNo"]}
                              className='mb-0 max-w-[150px]'
                            >
                              <Input size='small' style={{ width: "100%" }} />
                            </Form.Item>
                          </td>
                          <td className='py-2 pl-2 align-top'>
                            <Form.Item
                              {...restField}
                              name={[name, "isbnNo"]}
                              className='mb-0 max-w-[150px]'
                            >
                              <Input size='small' style={{ width: "100%" }} />
                            </Form.Item>
                          </td>

                          <td className='py-2 pl-2 align-top'>
                            <Form.Item
                              {...restField}
                              name={[name, "discountId"]}
                              className='mb-0 max-w-[150px]'
                              style={{ marginBottom: "15px" }}
                            >
                              <Select
                                showSearch
                                placeholder='Select discount'
                                optionFilterProp='children'
                                allowClear
                              >
                                {discount &&
                                  discount.map((discountSingle) => (
                                    <Select.Option
                                      key={discountSingle.id}
                                      value={discountSingle.id}
                                    >
                                      {`${
                                        discountSingle.type == "percentage"
                                          ? `${discountSingle.value}%`
                                          : `Flat ${discountSingle.value}`
                                      }`}
                                    </Select.Option>
                                  ))}
                              </Select>
                            </Form.Item>
                          </td>
                          <td className='py-2 pl-2 align-top min-w-[80px]'>
                            <Form.Item
                              {...restField}
                              name={[name, "productQuantity"]}
                              className='mb-0 max-w-[100px]'
                            >
                              <Input
                                type='number'
                                size='small'
                                style={{ width: "100%" }}
                                placeholder='50000'
                              />
                            </Form.Item>
                          </td>
                          <td className='py-2 pl-2 align-top min-w-[80px]'>
                            <Form.Item
                              {...restField}
                              name={[name, "reorderQuantity"]}
                              className='mb-0 max-w-[100px]'
                            >
                              <Input
                                type='number'
                                size='small'
                                style={{ width: "100%" }}
                                placeholder='50000'
                              />
                            </Form.Item>
                          </td>
                          <td className='py-2 pl-2 align-top'>
                            <Form.Item>
                              <button
                                shape='circle'
                                className='flex justify-center items-center hover:bg-black/40 rounded-md'
                                onClick={() => {
                                  remove(name);
                                }}
                              >
                                <CiCircleRemove size={25} />
                              </button>
                            </Form.Item>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {fields.length === 0 && (
                <div className='text-center py-10'>No product selected yet</div>
              )}
            </>
          )}
        </Form.List>
      </Card>
    </>
  );
}

function getAttributeValue(attribute) {
  const attributeValue =
    attribute?.reduce((acc, curr) => {
      return [...acc, ...curr.productAttributeValue];
    }, []) || [];
  return attributeValue;
}

function filterAttributeValues(attributeValues, attributeValueSelected) {
  const result = {};

  for (const attributeName in attributeValueSelected) {
    const selectedIds = attributeValueSelected[attributeName];
    result[attributeName] = [];

    selectedIds.forEach((selectedId) => {
      const foundValue = attributeValues.find(
        (value) => value.id === selectedId
      );
      if (foundValue) {
        result[attributeName].push(foundValue);
      }
    });
  }

  return result;
}

function generateVariants(attributeValue) {
  const keys = Object.keys(attributeValue);
  const values = keys.map((key) => attributeValue[key]);

  const combinations = cartesianProduct(...values);

  return combinations.map((combination) => {
    const variant = {};
    keys.forEach((key, index) => {
      variant[key] = combination[index];
    });
    return variant;
  });
}

function cartesianProduct(...arrays) {
  return arrays.reduce(
    (acc, curr) => {
      return acc?.flatMap((a) => curr?.map((b) => a.concat(b)));
    },
    [[]]
  );
}

function generateVariantName(input, form, productGroupName) {
  return input.map((variant) => {
    const name =
      ((form.getFieldValue("productGroupName") &&
        form.getFieldValue("productGroupName") + "-") ||
        (productGroupName && productGroupName + "-") ||
        "") +
      Object.keys(variant)
        .map((key) => variant[key].name)
        .join("/");
    const productAttributeValueId = Object.keys(variant).map(
      (key) => variant[key].id
    );
    return { name, productAttributeValueId };
  });
}

function copyToAllCol(fieldName, form) {
  const productGroup = form.getFieldValue("productGroup");
  const firstFiledValue = productGroup[0][fieldName] || "";
  if (!firstFiledValue) return;
  const updatedProductGroup = productGroup.map((item) => {
    return { ...item, [fieldName]: firstFiledValue };
  });

  form.setFieldsValue({ productGroup: updatedProductGroup });
}

function randomString() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)]
  );
}

function skuGenerator(form) {
  const productGroup = form.getFieldValue("productGroup");
  const firstSku = productGroup[0]?.sku || "";
  if (!firstSku) return;
  const updatedProductGroup = productGroup.map((item, index) => {
    if (index === 0) return item;
    return { ...item, sku: firstSku + randomString() };
  });
  form.setFieldsValue({ productGroup: updatedProductGroup });
}
