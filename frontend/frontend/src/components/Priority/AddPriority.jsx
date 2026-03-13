import { Button, ColorPicker, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPriority,
  loadAllPriority,
  updatePriority,
} from "@/redux/rtk/features/priority/prioritySlice";

export default function AddPriority({ edit }) {
  const [form] = Form.useForm();
  const { loading } = useSelector((state) => state.priority);
  const dispatch = useDispatch();
  const [colorCode, setColorCode] = useState("#1677FF");

  const onFinish = async (values) => {
    const { name } = values; // Extracting the
    const resp = await dispatch(
      edit?.id
        ? updatePriority({
            id: edit?.id,
            values: { name, colourValue: colorCode },
          })
        : addPriority({ name, colourValue: colorCode })
    );
    if (resp.payload.message === "success") {
      dispatch(loadAllPriority());
      if (!edit?.id) {
        form.resetFields();
      }
    }
  };

  useEffect(() => {
    if (edit?.id) {
      form.setFieldsValue(edit?.values);
    }
  }, [edit, form]);

  return (
    <div className="flex justify-center mt-5">
      <Form
        className="w-4/5"
        onFinish={onFinish}
        colon={false}
        layout="vertical"
        form={form}>
        <div className="md:flex items-center gap-3">
          <Form.Item
            label="Priority Name"
            name="name"
            tooltip="This is a required field"
            rules={[{ required: true, message: "This is a required field." }]}>
            <Input placeholder="Priority name" />
          </Form.Item>

          <Form.Item label="Color Code" required>
            <ColorPicker
              showText
              format="hex"
              onChange={(code) => {
                setColorCode(code.toHexString());
              }}
              presets={[
                {
                  // label: "Recommended",
                  colors: [
                    "#000000",
                    "#000000E0",
                    "#000000A6",
                    "#00000073",
                    "#00000040",
                    "#00000026",
                    "#0000001A",
                    "#00000012",
                    "#0000000A",
                    "#00000005",
                    "#F5222D",
                    "#FA8C16",
                    "#FADB14",
                    "#8BBB11",
                    "#52C41A",
                    "#13A8A8",
                    "#1677FF",
                    "#2F54EB",
                    "#722ED1",
                    "#EB2F96",
                    "#F5222D4D",
                    "#FA8C164D",
                    "#FADB144D",
                    "#8BBB114D",
                    "#52C41A4D",
                    "#13A8A84D",
                    "#1677FF4D",
                    "#2F54EB4D",
                    "#722ED14D",
                    "#EB2F964D",
                  ],
                },
                {
                  label: "Recent",
                  colors: [],
                },
              ]}
            />
          </Form.Item>
        </div>

        <Form.Item label="">
          <div className="flex items-center gap-2">
            <Button
              size={"large"}
              htmlType="submit"
              type="primary"
              loading={loading}>
              {edit?.id ? "Update" : "Create"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
