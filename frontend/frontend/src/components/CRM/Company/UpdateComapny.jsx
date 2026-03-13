import {
  addCompany,
  clearCompany,
  loadAllCompany,
  loadAllCompanyPaginated,
  loadSingleCompany,
  updateCompany,
} from "@/redux/rtk/features/CRM/company/companySlice";
import { Button, Form, Steps } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CompanyInformation from "./CompanyInformation";
import BillingInformation from "./BillingInformation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";

export default function UpdateCompany({ data, drawer }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const roleId = localStorage.getItem("roleId");
  const { company, loading: companyLoading } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    if (data?.id) {
      dispatch(loadSingleCompany(data.id)).then(() => {
        form.setFieldsValue({
          ...data,
        });
      });
    } else {
      form.resetFields();
    }

    return () => dispatch(clearCompany());
  }, [data, dispatch, form]);

  useEffect(() => {
    dispatch(loadSingleCompany(data?.id));
    return () => {
      clearCompany();
    };
  }, [data?.id, dispatch]);
  const onFinish = async (values) => {
    setLoader(true);
    const formData = {
      ...values,
      companySize: Number(values.companySize),
      annualRevenue: Number(values.annualRevenue),
    };
    let resp;

    // checking if i have id i will hit update or i will hit add
    if (data?.id) {
      resp = await dispatch(updateCompany({ id: data.id, values: formData }));
      if (resp.payload.message === "success") {
        dispatch(loadAllCompany());
      }
    } else {
      resp = await dispatch(addCompany(formData));
    }
    console.log(resp);
    if (resp.payload.message === "success") {
      form.resetFields();
      dispatch(loadAllCompany());
      !drawer ? navigate(`/admin/company/${resp?.payload?.data?.id}`) : "";
    }
    setLoader(false);
  };

  const [current, setCurrent] = useState(0);

  const next = async () => {
    try {
      // Validate fields for the current step before proceeding
      await form.validateFields();
      setCurrent(current + 1);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Company Information",
      content: <CompanyInformation form={form} company={company} />,
    },
    {
      title: "Billing Information",
      content: <BillingInformation form={form} company={company} />,
    },
  ];

  useEffect(() => {
    if (roleId) {
      form.setFieldsValue({
        companyOwnerId: parseInt(roleId),
      });
    }
  }, [form, roleId]);
  return (
    <>
      <UserPrivateComponent
        permission="update-company"
        comment={
          "You don't have permission to update this action. To update this action you need ReadSingle Company and Update Company permissions."
        }
        type="update"
      >
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
          }}
        >
          {/* <div>{steps[current].content}</div> */}
          <div>
            {steps.map((item, index) => (
              <div
                key={index}
                style={{ display: index === current ? "block" : "none" }}
              >
                {item.content}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, textAlign: "right" }}>
            {current > 0 && (
              <Button
                className="mb-5"
                style={{ marginRight: 8 }}
                onClick={prev}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" className="mb-5" onClick={next}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className="mb-5"
                type="primary"
                htmlType="submit"
                loading={loader}
              >
                Submit
              </Button>
            )}
          </div>
        </Form>
      </UserPrivateComponent>
    </>
  );
}
