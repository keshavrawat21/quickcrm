import { Form, Input, Select } from "antd";
import BigDrawer from "../Drawer/BigDrawer";
import AddDiscount from "../eComErp/Discount/AddDiscount";
import SkuField from "./SkuField";
import UploadVariantImage from "./UploadVariantImage";

export default function FormSingleProductList({
  discount,
  discountLoading,
  form,
}) {
  return (
    <>
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
            {fields.map(({ key, name, ...restField }, index) => {
              return (
                <>
                  <div className='flex flex-col sm:flex-row gap-3'>
                    <SkuField
                      restField={restField}
                      name={name}
                      key={index}
                      className='w-full sm:w-1/2'
                    />
                    <Form.Item
                      {...restField}
                      label={
                        <>
                          Discount
                          <BigDrawer title='Discount'>
                            <AddDiscount drawer={true} />
                          </BigDrawer>
                        </>
                      }
                      name={[name, "discountId"]}
                      className='w-full sm:w-1/2'
                    >
                      <Select
                        showSearch
                        placeholder='Select discount'
                        optionFilterProp='children'
                        allowClear
                        loading={discountLoading}
                      >
                        {discount?.map((discountSingle) => (
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
                  </div>

                  <div className='flex flex-col sm:flex-row gap-3'>
                    <Form.Item
                      {...restField}
                      label='UPC No'
                      name={[name, "upcNo"]}
                      className='w-full sm:w-1/2'
                    >
                      <Input
                        size='small'
                        placeholder='Universal product code'
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label='EAN No'
                      name={[name, "eanNo"]}
                      className='w-full sm:w-1/2'
                    >
                      <Input
                        size='small'
                        placeholder='International article number'
                      />
                    </Form.Item>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-3'>
                    <Form.Item
                      {...restField}
                      label='ISBN No'
                      name={[name, "isbnNo"]}
                      className='w-full sm:w-1/2'
                    >
                      <Input
                        size='small'
                        placeholder='International standard book number'
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label='Part No'
                      name={[name, "partNo"]}
                      className='w-full sm:w-1/2'
                    >
                      <Input size='small' placeholder='Part number' />
                    </Form.Item>
                  </div>

                  <Form.Item label='Thumbnail Image' className='w-full'>
                    <UploadVariantImage form={form} index={index} />
                  </Form.Item>
                </>
              );
            })}
          </>
        )}
      </Form.List>
    </>
  );
}
