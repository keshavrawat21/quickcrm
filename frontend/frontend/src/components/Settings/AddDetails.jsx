import ImageUploader from "@/UI/ImageUploader";
import usePermissions from "@/utils/usePermissions";
import { Button, Card, Col, Form, Input, Row, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import {
  getSetting,
  updateSetting,
} from "../../redux/rtk/features/setting/settingSlice";
import Loader from "../Loader/Loader";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { textEditorFormats, textEditorModule } from "../Product/AddProduct";

const AddDetails = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [footer, setFooter] = useState("");
  const { data, loading: loader } =
    useSelector((state) => state?.setting) || null;
  const { list, loading } = useSelector((state) => state?.currency) || null;

  const { permissions } = usePermissions();
  const hasPermission = permissions?.includes("update-setting");

  const onFinish = async (values) => {
    try {
      const data = {
        ...values,
        footer: footer || "",
        logo: fileList[0]?.id || null,
      };

      const resp = await dispatch(updateSetting(data));
      if (resp.payload.message === "success") {
        toast.success("Company Updated Successfully");
        dispatch(getSetting());
      }
    } catch (error) {}
  };

  const handelImageChange = (fileList) => {
    setFileList(fileList);
  };

  const footerHandler = (val) => {
    setFooter(val);
  };

  useEffect(() => {
    if (data) {
      setFooter(data.footer ? data.footer : "");
      if (data.logo) {
        setFileList([
          {
            id: getLastPathSegment(data.logo),
            fileName: "Company Logo",
            fileType: "image/png",
          },
        ]);
      }
    }
  }, [data]);

  return (
    <>
      <UserPrivateComponent permission={"readAll-setting"}>
        <div className="min-h-screen ">
          <Row justify="center">
            <Col xs={24} sm={24} md={22} lg={18} xl={16}>
              {/* Header Section */}
              <div className="mb-6 text-left">
                <Title
                  level={2}
                  className="!mb-2 !font-semibold !text-gray-800"
                  style={{ fontSize: "28px" }}>
                  Company Settings
                </Title>
                <p className="text-gray-500 text-sm">
                  Manage your company information and branding
                </p>
              </div>

              <Card
                bordered={false}
                className=" !rounded-2xl overflow-hidden"
                style={{
                  background: "white",
                  backdropFilter: "blur(10px)",
                }}>
                {data ? (
                  <Form
                    initialValues={{ ...data }}
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="modern-form">
                    {/* Company Information Section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-700 mb-6 pb-3 border-b border-gray-200">
                        Company Information
                      </h3>

                      <Row gutter={[24, 0]}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium">
                                Company Name
                              </span>
                            }
                            name="companyName"
                            rules={[
                              {
                                required: true,
                                message: "Please input Company name!",
                              },
                            ]}>
                            <Input
                              size="large"
                              className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500"
                              placeholder="Enter company name"
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium">
                                Tagline
                              </span>
                            }
                            name="tagLine"
                            rules={[
                              {
                                required: true,
                                message: "Please input Tagline!",
                              },
                            ]}>
                            <Input
                              size="large"
                              className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500"
                              placeholder="Enter tagline"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        label={
                          <span className="text-gray-700 font-medium">
                            Address
                          </span>
                        }
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: "Please input Address!",
                          },
                        ]}>
                        <Input
                          size="large"
                          className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500"
                          placeholder="Enter company address"
                        />
                      </Form.Item>
                    </div>

                    {/* Contact Information Section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-700 mb-6 pb-3 border-b border-gray-200">
                        Contact Information
                      </h3>

                      <Row gutter={[24, 0]}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium">
                                Phone Number
                              </span>
                            }
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Please input Phone Number!",
                              },
                            ]}>
                            <Input
                              size="large"
                              className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500"
                              placeholder="Enter phone number"
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium">
                                Email Address
                              </span>
                            }
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please input Email Address!",
                              },
                            ]}>
                            <Input
                              size="large"
                              className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500"
                              placeholder="Enter email address"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        label={
                          <span className="text-gray-700 font-medium">
                            Website
                          </span>
                        }
                        name="website"
                        rules={[
                          {
                            required: true,
                            message: "Please input Website!",
                          },
                        ]}>
                        <Input
                          size="large"
                          className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500"
                          placeholder="Enter website URL"
                        />
                      </Form.Item>
                    </div>

                    {/* Legal Information Section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-700 mb-6 pb-3 border-b border-gray-200">
                        Legal Information
                      </h3>

                      <Row gutter={[24, 0]}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium">
                                BIN
                                <Tooltip title="Business Identification Number">
                                  <span className="ml-1 text-gray-400 cursor-help">
                                    ⓘ
                                  </span>
                                </Tooltip>
                              </span>
                            }
                            name="bin">
                            <Input
                              size="large"
                              className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500"
                              placeholder="Enter BIN"
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium">
                                Mushak
                              </span>
                            }
                            name="mushak">
                            <Input
                              size="large"
                              className="!rounded-lg hover:!border-blue-400 focus:!border-blue-500"
                              placeholder="Enter mushak"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>

                    {/* Branding Section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-700 mb-6 pb-3 border-b border-gray-200">
                        Branding
                      </h3>

                      <Form.Item
                        label={
                          <span className="text-gray-700 font-medium">
                            Company Logo
                            <Tooltip title="Required image size 180x70 px & transparent png format">
                              <span className="ml-1 text-gray-400 cursor-help">
                                ⓘ
                              </span>
                            </Tooltip>
                          </span>
                        }
                        valuePropName="fileList">
                        <div className="bg-gray-50 p-6 rounded-xl border-2  transition-colors">
                          <ImageUploader
                            images={fileList}
                            setImages={handelImageChange}
                            filter={{ image: "image" }}
                          />
                        </div>
                      </Form.Item>

                      <Form.Item
                        label={
                          <span className="text-gray-700 font-medium">
                            Footer Content
                          </span>
                        }
                        name="footer"
                        className="z-30"
                        rules={[
                          {
                            required: true,
                            message: "Please input Footer!",
                          },
                        ]}>
                        <div className="rounded-xl overflow-hidden border border-gray-200">
                          <ReactQuill
                            value={footer}
                            onChange={footerHandler}
                            modules={textEditorModule}
                            formats={textEditorFormats}
                            className="bg-white"
                          />
                        </div>
                      </Form.Item>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6 border-t border-gray-200">
                      {hasPermission ? (
                        <Form.Item className="!mb-0 flex justify-center">
                          <Button
                            type="primary"
                            disabled={loading}
                            htmlType="submit"
                            size="large"
                            loading={loader}
                            className="!h-12 !px-12 !rounded-xl !font-semibold !text-base shadow-md hover:shadow-lg transition-all">
                            Save Changes
                          </Button>
                        </Form.Item>
                      ) : (
                        <div className="flex justify-center">
                          <Tooltip title="Permission denied">
                            <button
                              disabled
                              className="h-12 px-12 rounded-xl font-semibold text-base bg-gray-300 text-gray-500 cursor-not-allowed">
                              Save Changes
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </Form>
                ) : (
                  <div className="py-16">
                    <Loader />
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </UserPrivateComponent>
    </>
  );
};

export default AddDetails;

function getLastPathSegment(url) {
  if (!url) return null;
  const split = url.split("/");
  return split[split.length - 1];
}
