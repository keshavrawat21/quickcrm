import { cn } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { Form, Input } from "antd";
import axios from "axios";
import { useRef, useState } from "react";
import { skuGenerator } from "./FormProductListCard";

export default function SkuField({
  name,
  restField,
  form,
  index,
  isMultiple = false,
  className,
  isUpdate,
  initialSku,
}) {
  const debounceTimeoutRef = useRef(null);
  const [SKUValid, setSKUValid] = useState("");
  const onChange = async (e) => {
    setSKUValid("loading");
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    if (e.target.value !== "") {
      debounceTimeoutRef.current = setTimeout(async () => {
        const query = queryGenerator({
          query: "sku",
          key: e.target.value,
        });
        try {
          const { data } = await axios.get(`product?${query}`);
          if (data) {
            setSKUValid(data.status);
          }
        } catch (err) {}
      }, 500);
    } else {
      setSKUValid("");
    }
  };

  let props = {};
  if (SKUValid === "true") {
    props = {
      validateStatus: "error",
      help: "Sku already exists",
    };
  } else if (SKUValid === "false") {
    if (!isMultiple) {
      props = {
        validateStatus: "success",
        help: "Sku is available",
      };
    } else {
      const productGroup = form.getFieldValue("productGroup");
      const value = form.getFieldValue(["productGroup", index, "sku"]);
      const filteredProductGroup = productGroup.filter(
        (item, i) => i !== index
      );
      const isExist = filteredProductGroup.some((item) => item.sku === value);
      if (isExist) {
        props = {
          validateStatus: "error",
          help: "Same SKU Detected!",
        };
      } else {
        props = {
          validateStatus: "success",
          help: "SKU available",
        };
      }
    }
  } else if (SKUValid === "loading") {
    props = {
      validateStatus: "validating",
      help: "Validating SKU...",
    };
  }
  const validatorArray = [
    {
      validator: () => {
        return new Promise((resolve, reject) => {
          if (SKUValid === "true") {
            reject("This SKU already in use!");
          } else if (SKUValid === "false") {
            resolve();
          } else {
            reject("Please enter the SKU!");
          }
        });
      },
    },
  ];

  const updateArray = [
    {
      validator: (_, value) => {
        return new Promise((resolve, reject) => {
          if (SKUValid === "true") {
            reject("This Sku already in use!");
          } else if (SKUValid === "false") {
            resolve();
          } else {
            if (initialSku === value) {
              resolve();
            } else {
              reject("Please enter the Sku!");
            }
          }
        });
      },
    },
  ];

  return (
    <>
      {restField ? (
        <Form.Item
          {...restField}
          label={
            isMultiple ? (
              <>
                SKU
                {index === 0 && (
                  <span
                    onClick={() => skuGenerator(form)}
                    className='cursor-pointer font-semibold text-xs text-blue-500 ml-1'
                  >
                    Generate SKU
                  </span>
                )}
              </>
            ) : (
              "SKU"
            )
          }
          name={[name, "sku"]}
          className={cn("", {
            [className]: className,
            "mb-1 w-1/2": !className,
          })}
          hasFeedback
          required
          {...props}
          rules={
            !isMultiple
              ? validatorArray
              : [
                  {
                    validator: (_, value) => {
                      return new Promise((resolve, reject) => {
                        const productGroup = form.getFieldValue("productGroup");
                        const filteredProductGroup = productGroup.filter(
                          (item, i) => i !== index
                        );
                        const isExist = filteredProductGroup.some(
                          (item) => item.sku === value
                        );
                        if (SKUValid === "true") {
                          reject("This SKU already in use!");
                        } else if (SKUValid === "false") {
                          if (!isExist) {
                            resolve();
                          } else {
                            reject("This SKU already in use!");
                          }
                        } else {
                          if (!value) {
                            reject("Please enter Sku!");
                          } else if (isExist) {
                            reject("This SKU already in use!");
                          } else {
                            resolve();
                          }
                        }
                      });
                    },
                  },
                ]
          }
        >
          <Input onChange={onChange} placeholder={"Sku"} />
        </Form.Item>
      ) : (
        <Form.Item
          style={{ marginBottom: "15px" }}
          label='SKU'
          name={name}
          className={cn("", {
            [className]: className,
            "mb-1 w-1/2": !className,
          })}
          hasFeedback
          required
          {...props}
          rules={isUpdate ? updateArray : validatorArray}
        >
          <Input onChange={onChange} placeholder={"Sku"} />
        </Form.Item>
      )}
    </>
  );
}
