import { Col, Form, Input, Row } from "antd";
import { useEffect } from "react";

const ContactAddress = ({ form, contact }) => {
  useEffect(() => {
    if (contact) {
      form.setFieldsValue({
        ...contact,
      });
    }
  }, [contact, form]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item label="Present address" name="presentAddress">
          <Input placeholder="Enter present address" />
        </Form.Item>

        <Form.Item label="Present city" name="presentCity">
          <Input placeholder="Dhaka" />
        </Form.Item>

        <Form.Item label="Present zip code" name="presentZipCode">
          <Input placeholder="1361" />
        </Form.Item>

        <Form.Item label="Present state" name="presentState">
          <Input placeholder="Dhaka" />
        </Form.Item>

        <Form.Item label="Present country" name="presentCountry">
          <Input placeholder="Bangladesh" />
        </Form.Item>

        <Form.Item label="Permanent address" name="permanentAddress">
          <Input placeholder="Enter permanent address" />
        </Form.Item>

        <Form.Item label="Permanent city" name="permanentCity">
          <Input placeholder="Dhaka" />
        </Form.Item>

        <Form.Item label="Permanent zip code" name="permanentZipCode">
          <Input placeholder="1361" />
        </Form.Item>

        <Form.Item label="Permanent state" name="permanentState">
          <Input placeholder="Dhaka" />
        </Form.Item>

        <Form.Item label="Permanent country" name="permanentCountry">
          <Input placeholder="Bangladesh" />
        </Form.Item>

        <Form.Item label="Twitter" name="twitter">
          <Input placeholder="#" />
        </Form.Item>

        <Form.Item label="Linkedin" name="linkedin">
          <Input placeholder="#" />
        </Form.Item>
      </div>
    </>
  );
};

export default ContactAddress;
