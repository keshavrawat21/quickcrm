import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  loadAllContactPaginated,
  updateContact,
} from "@/redux/rtk/features/CRM/contact/contactSlice";
import { Button, Form, Steps } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContactAddress from "./ContactAddress";
import ContactInformation from "./ContactInformation";

export default function UpdateContact({ data }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const { contact, loading: contactLoading } = useSelector(
    (state) => state.contact
  );

  const next = async () => {
    try {
      await form.validateFields();
      setCurrent((c) => c + 1);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const prev = () => setCurrent((c) => c - 1);

  const normalizeInt = (v) =>
    v === undefined || v === null || v === "" ? null : Number(v);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      // AntD v5 DatePicker returns a dayjs instance
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("YYYY-MM-DD")
        : null,

      contactOwnerId: normalizeInt(values?.contactOwnerId),
      companyId: normalizeInt(values?.companyId),
      industryId: normalizeInt(values?.industryId),
      contactSourceId: normalizeInt(values?.contactSourceId),
      contactStageId: normalizeInt(values?.contactStageId),
    };

    const resp = await dispatch(
      updateContact({ id: data.id, values: formData })
    );
    if (resp?.payload?.message === "success") {
      dispatch(loadAllContactPaginated({ page: 1, count: 10 }));
      form.resetFields();
      // navigate back if you want:
      // navigate(-1);
    }
  };

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue({
      ...data,
      contactOwnerId: normalizeInt(data.contactOwnerId),
      companyId: normalizeInt(data.companyId),
      industryId: normalizeInt(data.industryId),
      contactSourceId: normalizeInt(data.contactSourceId),
      contactStageId: normalizeInt(data.contactStageId),

      // Provide a dayjs instance to DatePicker
      // incoming example: "2025-10-22 00:00:00"
      dateOfBirth: data.dateOfBirth
        ? dayjs(data.dateOfBirth, "YYYY-MM-DD HH:mm:ss")
        : null,
    });
  }, [data, form]);

  const steps = [
    {
      title: "Contact Information",
      content: <ContactInformation data={data} form={form} contact={contact} />,
    },
    {
      title: "Contact Address",
      content: <ContactAddress form={form} contact={contact} />,
    },
  ];

  return (
    <UserPrivateComponent
      permission="update-contact"
      type="update"
      comment="You don't have permission to update this action. To update this action you need Update Contact permission.">
      <div className="px-20 py-5">
        <Steps size="small" current={current}>
          {steps.map((item, index) => (
            <Steps.Step key={index} title={item.title} />
          ))}
        </Steps>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          marginTop: 50,
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        <div>
          {steps.map((item, index) => (
            <div
              key={index}
              style={{ display: index === current ? "block" : "none" }}>
              {item.content}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, textAlign: "right" }}>
          {current > 0 && (
            <Button className="mb-5" style={{ marginRight: 8 }} onClick={prev}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button className="mb-5" type="primary" onClick={next}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button className="mb-5" type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </UserPrivateComponent>
  );
}
