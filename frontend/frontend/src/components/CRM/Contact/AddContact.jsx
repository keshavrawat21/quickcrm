import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  addContact,
  clearContact,
  loadAllContactPaginated,
  loadSingleContact,
  updateContact,
} from "@/redux/rtk/features/CRM/contact/contactSlice";
import { Button, Form, Steps } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContactAddress from "./ContactAddress";
import ContactInformation from "./ContactInformation";

export default function AddContact({ onClose, createAs, data, drawer }) {
  // selector
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const { contact, loading: contactLoading } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    if (data?.id) {
      dispatch(loadSingleContact(data.id)).then(() => {
        form.setFieldsValue({
          ...data,
          dateOfBirth: data.dateOfBirth
            ? dayjs(data.dateOfBirth).format("YYYY-MM-DD")
            : null,
        });
      });
    } else {
      form.resetFields();
    }

    return () => dispatch(clearContact());
  }, [data, dispatch, form]);

  const next = async () => {
    try {
      await form.validateFields();
      setCurrent(current + 1);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formData = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
        : null,
      contactOwnerId: parseInt(values.contactOwnerId),
      companyId: parseInt(values.companyId),
      industryId: parseInt(values.industryId),
      contactSourceId: parseInt(values.contactSourceId),
      contactStageId: parseInt(values.contactStageId),
    };

    let resp;

    // checking if i have id i will hit update or i will hit add
    if (data?.id) {
      resp = await dispatch(updateContact({ id: data.id, values: formData }));
      if (resp.payload.message === "success") {
        dispatch(
          loadAllContactPaginated({
            page: 1,
            count: 10,
          })
        );
      }
    } else {
      resp = await dispatch(addContact(formData));
    }
    if (resp.payload.message === "success") {
      form.resetFields();
      if (createAs) {
        dispatch(createAs.singleLoadThunk(createAs.value));
      } else {
        dispatch(
          loadAllContactPaginated({
            page: 1,
            count: 10,
          })
        );
        !drawer ? navigate(`/admin/contact/${resp?.payload?.data?.id}`) : "";
      }
    }
  };
  const onCancel = () => {
    form.resetFields();
    onClose();
  };
  const roleId = localStorage.getItem("roleId");

  useEffect(() => {
    if (roleId) {
      form.setFieldsValue({
        contactOwnerId: parseInt(roleId),
      });
    }
  }, [form, roleId]);

  const steps = [
    {
      title: "Contact Information",
      content: (
        <ContactInformation
          data={data}
          form={form}
          contact={contact}
          createAs={createAs}
        />
      ),
    },
    {
      title: "Contact Address",
      content: <ContactAddress form={form} contact={contact} />,
    },
  ];

  return (
    <>
      <UserPrivateComponent permission="create-contact">
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
              <Button
                className="mb-5"
                style={{ marginRight: 8 }}
                onClick={prev}>
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
    </>
  );
}
