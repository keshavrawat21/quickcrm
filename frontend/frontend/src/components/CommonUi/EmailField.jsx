import { cn } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { Form, Input } from "antd";
import axios from "axios";
import { useRef, useState } from "react";

export default function EmailField({
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
  const [emailValid, setEmailValid] = useState("");
  const onChange = async (e) => {
    setEmailValid("loading");
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    if (e.target.value !== "") {
      debounceTimeoutRef.current = setTimeout(async () => {
        const query = queryGenerator({
          query: "isEmail",
          email: e.target.value,
        });
        try {
          // const { data } = await axios.get(`contact?${query}`);
          const { data } = await axios.get(`customer/email?${query}`);
          if (data) {
            setEmailValid(data.status);
          }
        } catch (err) {}
      }, 500);
    } else {
      setEmailValid("");
    }
  };

  let props = {};
  if (emailValid === "true") {
    props = {
      validateStatus: "error",
      help: "Email Already Exists",
    };
  } else if (emailValid === "false") {
    if (!isMultiple) {
      props = {
        validateStatus: "success",
        help: "Email Is Available",
      };
    } else {
      const productGroup = form.getFieldValue("productGroup");
      const value = form.getFieldValue(["productGroup", index, "email"]);
      const filteredProductGroup = productGroup.filter(
        (item, i) => i !== index
      );
      const isExist = filteredProductGroup.some((item) => item.email === value);
      if (isExist) {
        props = {
          validateStatus: "error",
          help: "Same Email Detected!",
        };
      } else {
        props = {
          validateStatus: "success",
          help: "Email Available",
        };
      }
    }
  } else if (emailValid === "loading") {
    props = {
      validateStatus: "validating",
      help: "Validating Email...",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  const validatorArray = [
    {
      validator: (_, value) => {
        return new Promise((resolve, reject) => {
          if (!value) {
            reject("Please Enter The Email!");
          } else if (!emailRegex.test(value)) {
            reject("Please Enter A Valid Email!");
          }
          if (emailValid === "true") {
            reject("This Email Already In Use!");
          } else if (emailValid === "false") {
            resolve();
          } else {
            reject("Please Enter The Email!");
          }
        });
      },
    },
  ];

  const updateArray = [
    {
      validator: (_, value) => {
        return new Promise((resolve, reject) => {
          if (emailValid === "true") {
            reject("This Email already in use!");
          } else if (emailValid === "false") {
            resolve();
          } else {
            if (initialSku === value) {
              resolve();
            } else {
              reject("Please Enter The Email!");
            }
          }
        });
      },
    },
  ];

  return (
    <>
      <Form.Item
        style={{ marginBottom: "15px" }}
        label="Email"
        name={name}
        className={cn("", {
          [className]: className,
          "mb-1 w-1/2": !className,
        })}
        hasFeedback
        required
        {...props}
        rules={isUpdate ? updateArray : validatorArray}>
        <Input onChange={onChange} placeholder={"Email"} />
      </Form.Item>
    </>
  );
}

// EmailField
