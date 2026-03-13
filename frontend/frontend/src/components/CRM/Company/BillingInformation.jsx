import { Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";

const BillingInformation = ({ company, form }) => {
  useEffect(() => {
    if (company) {
      form.setFieldsValue({
        ...company,
      });
    }
  }, [company, form]);

  const handleCopyData = () => {
    const billingValues = form.getFieldsValue([
      "billingStreet",
      "billingCity",
      "billingZipCode",
      "billingState",
      "billingCountry",
    ]);

    form.setFieldsValue({
      shippingStreet: billingValues.billingStreet,
      shippingCity: billingValues.billingCity,
      shippingZipCode: billingValues.billingZipCode,
      shippingState: billingValues.billingState,
      shippingCountry: billingValues.billingCountry,
    });
  };
  return (
    <>
      {/* <Form layout="vertical"> */}
      {/* Billing Details */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Billing street" name="billingStreet">
            <Input placeholder="Xyz road" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Billing city" name="billingCity">
            <Input placeholder="LA" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Billing zip code" name="billingZipCode">
            <Input placeholder="45004" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Billing state" name="billingState">
            <Input placeholder="CA" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Billing country" name="billingCountry">
            <Input placeholder="USA" />
          </Form.Item>
        </Col>
      </Row>

      <div>
        <h1
          className="font-bold cursor-pointer mb-4 flex gap-2 items-center"
          onClick={handleCopyData}>
          Copy Billing Information <FaRegCopy />
        </h1>
      </div>
      {/* Shipping Details */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Shipping street" name="shippingStreet">
            <Input placeholder="Zyx road" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Shipping city" name="shippingCity">
            <Input placeholder="Manchester City" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Shipping zip code" name="shippingZipCode">
            <Input placeholder="45871" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Shipping state" name="shippingState">
            <Input placeholder="ManCity" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Shipping country" name="shippingCountry">
            <Input placeholder="UK" />
          </Form.Item>
        </Col>
      </Row>
      {/* </Form> */}
    </>
  );
};

export default BillingInformation;
