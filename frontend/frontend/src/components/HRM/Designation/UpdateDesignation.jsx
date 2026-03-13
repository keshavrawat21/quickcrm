import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  loadAllDesignation,
  loadSingleDesignation,
  updateDesignation,
} from "@/redux/rtk/features/hrm/designation/designationSlice";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

function UpdateDesignation({ data, onClose, pageConfig, singleEditData, id }) {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const [initValues, setInitValues] = useState({
    // handling edit data from two different components one is modal from getAllDesignation and another is from DetailDesignation
    name: data?.name ? data?.name : singleEditData?.name,
  });

  const onFinish = async (values) => {
    const resp = await dispatch(
      updateDesignation({
        // handling edit data from two different components one is modal from getAllDesignation and another is from DetailDesignation
        id: data?.id ? data?.id : singleEditData?.id,
        values,
      })
    );

    if (resp?.payload?.message === "success") {
      dispatch(loadAllDesignation(pageConfig));
      singleEditData ? dispatch(loadSingleDesignation(id)) : "";
      setLoader(false);
      setInitValues({});

      onClose();
    }
  };

  return (
    <>
        <UserPrivateComponent permission={"update-designation"} type="update">

      <Form
        initialValues={{
          ...initValues,
        }}
        form={form}
        className="m-4"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item
          style={{ marginBottom: "10px" }}
          fields={[{ name: "Name" }]}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Designation name!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button
            onClick={() => setLoader(true)}
            block
            type="primary"
            htmlType="submit"
            shape="round"
            loading={loader}>
            Update Now
          </Button>
        </Form.Item>
      </Form>
      </UserPrivateComponent>
    </>
  );
}

export default UpdateDesignation;
