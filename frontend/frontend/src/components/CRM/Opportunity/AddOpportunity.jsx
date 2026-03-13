import {
  addOpportunity,
  clearOpportunity,
  loadAllOpportunity,
  loadSingleOpportunity,
  updateOpportunity,
} from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";

import { Button, Form, Steps } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpportunityInformation from "./OpportunityInformation";
import AdditionalOpportunityInformation from "./AdditionalOpportunityInformation";

export default function AddOpportunity({
  onClose,
  createAs,
  edit,
  singleLoad,
  data,
  drawer,
}) {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { opportunity, loading: opportunityLoading } = useSelector(
    (state) => state.opportunity
  );
  const roleId = localStorage.getItem("roleId");
  useEffect(() => {
    if (data?.id) {
      dispatch(loadSingleOpportunity(data?.id)).then(() => {
        form.setFieldsValue({
          ...data,
          opportunityCreateDate: data.opportunityCreateDate
            ? dayjs(data.opportunityCreateDate).format("YYYY-MM-DD")
            : null,
          opportunityCloseDate: data.opportunityCloseDate
            ? dayjs(data.opportunityCloseDate).format("YYYY-MM-DD")
            : null,
        });
      });
    } else {
      form.resetFields();
    }

    return () => dispatch(clearOpportunity());
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
      opportunityCreateDate: values?.opportunityCreateDate
        ? dayjs(values?.opportunityCreateDate).format("YYYY-MM-DD")
        : null,
      opportunityCloseDate: values?.opportunityCloseDate
        ? dayjs(values?.opportunityCloseDate).format("YYYY-MM-DD")
        : null,
      opportunityOwnerId: parseInt(values?.opportunityOwnerId),
      companyId: parseInt(values?.companyId),
      contactId: parseInt(values?.contactId),
      opportunityTypeId: parseInt(values?.opportunityTypeId),
      opportunityStageId: parseInt(values?.opportunityStageId),
      opportunitySourceId: parseInt(values?.opportunitySourceId),
    };

    if (data?.id) {
      const resp = await dispatch(
        updateOpportunity({ id: edit?.id, values: formData })
      );
      if (resp.payload.message === "success") {
        if (singleLoad?.thunk) {
          dispatch(singleLoad.thunk(singleLoad?.id));
        }

        onClose();
      }
    } else {
      const resp = await dispatch(addOpportunity(formData));
      if (resp.payload.message === "success") {
        form.resetFields();
        if (createAs?.name) {
          dispatch(createAs.singleLoadThunk(createAs.value));
        } else {
          dispatch(loadAllOpportunity());
          !drawer
            ? navigate(`/admin/opportunity/${resp?.payload?.data?.id}`)
            : "";
        }
        onClose();
      }
    }
  };

  const steps = [
    {
      title: "Opportunity Information",
      content: <OpportunityInformation form={form} opportunity={opportunity} />,
    },
    {
      title: "Addition Information",
      content: (
        <AdditionalOpportunityInformation
          form={form}
          opportunity={opportunity}
          createAs={createAs}
          drawer={drawer}
        />
      ),
    },
  ];

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (roleId) {
      form.setFieldsValue({
        opportunityOwnerId: parseInt(roleId),
      });
    }
  }, [form, roleId]);
  return (
    <>
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
        initialValues={
          createAs
            ? {
                [createAs.name]: createAs.value,
              }
            : {}
        }
        style={{
          marginTop: 50,
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        {/* <div>{steps[current].content}</div> */}
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
    </>
  );
}
