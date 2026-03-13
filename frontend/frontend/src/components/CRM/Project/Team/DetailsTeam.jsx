import { useGetProjectTeamQuery } from "@/redux/rtk/features/hrm/projectManagement/project/projectTeam/projectTeamApi";
import Card from "@/UI/Card";
import { Avatar, Col, Row, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const DetailsTeam = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProjectTeamQuery(id);

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}>
          <Spin size="large" />
        </div>
      ) : (
        <div>
          {/* Project Header */}
          <Card style={{ marginBottom: "24px" }}>
            <div style={{ padding: "8px 0" }}>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#8c8c8c",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontWeight: 500,
                }}>
                Project
              </Text>
              <Title
                level={2}
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "28px",
                  fontWeight: 600,
                }}>
                {data?.project?.name || "Project Name Not Available"}
              </Title>
            </div>
          </Card>

          {/* Team Members Section */}
          <Card className="mt-6">
            <Title
              level={4}
              style={{
                marginBottom: "24px",
                fontSize: "18px",
                fontWeight: 600,
              }}>
              Team Members
            </Title>

            {data?.projectTeamMember?.length ? (
              <Row gutter={[16, 16]}>
                {data.projectTeamMember.map((member) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={member.id}>
                    <div
                      style={{
                        padding: "20px",
                        background: "#fafafa",
                        borderRadius: "8px",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        border: "1px solid #f0f0f0",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f5f5f5";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0,0,0,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fafafa";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}>
                      <Avatar
                        size={64}
                        style={{
                          backgroundColor: "#33a78d",
                          fontSize: "24px",
                          fontWeight: 600,
                          marginBottom: "12px",
                        }}>
                        {member?.user?.firstName?.[0]}
                        {member?.user?.lastName?.[0]}
                      </Avatar>
                      <div>
                        <Text
                          style={{
                            display: "block",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#262626",
                          }}>
                          {member?.user?.firstName} {member?.user?.lastName}
                        </Text>
                        {member?.role && (
                          <Text
                            style={{
                              display: "block",
                              fontSize: "13px",
                              color: "#8c8c8c",
                              marginTop: "4px",
                            }}>
                            {member.role}
                          </Text>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#8c8c8c",
                }}>
                <Text style={{ fontSize: "15px" }}>No team members found.</Text>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default DetailsTeam;
